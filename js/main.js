document.addEventListener("DOMContentLoaded", () => {
  // ===== INTRO SCREEN =====
  const intro = document.getElementById("intro");
  const openGift = document.getElementById("openGift");

  openGift.onclick = () => {
    intro.classList.add("hidden");
    document.body.classList.remove("locked");
    setTimeout(() => intro.remove(), 900);
  };

  // ===== MOBILE MENU =====
  const mobileMenu = document.getElementById("mobileMenu");
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");

  menuToggle.onclick = () => {
    mobileMenu.classList.add("open");
  };

  menuClose.onclick = () => {
    mobileMenu.classList.remove("open");
  };

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.onclick = () => {
      mobileMenu.classList.remove("open");
    };
  });

  // ===== MUSIC TOGGLE =====
  const audio = document.getElementById("birthdayAudio");
  const musicToggle = document.getElementById("musicToggle");
  let playing = false;

  musicToggle.onclick = async () => {
    if (!playing) {
      try {
        await audio.play();
        playing = true;
        musicToggle.innerHTML = "♫ <span>ON</span>";
        musicToggle.style.animation = "pulse 0.6s ease";
      } catch (e) {
        musicToggle.innerHTML = "♫ <span>Ajoute birthday.mp3</span>";
      }
    } else {
      audio.pause();
      playing = false;
      musicToggle.innerHTML = "♫ <span>OFF</span>";
    }
  };

  // ===== SURPRISE MODAL =====
  const modal = document.getElementById("surpriseModal");
  const countdown = document.getElementById("countdown");
  const surpriseText = document.getElementById("surpriseText");
  const surpriseBtn = document.getElementById("surpriseBtn");
  const surpriseClose = document.getElementById("surpriseClose");

  surpriseBtn.onclick = () => {
    modal.classList.add("open");
    let count = 3;
    countdown.textContent = count;
    surpriseText.textContent = "Prépare-toi...";
    countdown.style.animation = "none";

    setTimeout(() => {
      countdown.style.animation = "pulse 0.8s ease";
    }, 10);

    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        countdown.textContent = count;
        countdown.style.animation = "none";
        setTimeout(() => {
          countdown.style.animation = "pulse 0.8s ease";
        }, 10);
      } else {
        clearInterval(timer);
        countdown.textContent = "♥";
        countdown.style.color = "#c66c89";
        surpriseText.textContent = "Joyeux anniversaire Maman. Nous t'aimons très fort.";
        createConfetti();
      }
    }, 900);
  };

  surpriseClose.onclick = () => {
    modal.classList.remove("open");
  };

  // ===== CONFETTI =====
  window.createConfetti = () => {
    const container = document.getElementById("confetti");
    container.innerHTML = "";

    const colors = ["#8e2f4f", "#ecc4cf", "#c66c89", "#30232a", "#fbf4f6"];

    for (let i = 0; i < 120; i++) {
      const piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "%";
      piece.style.animationDelay = Math.random() * 1.2 + "s";
      piece.style.background = colors[i % colors.length];
      piece.style.width = Math.random() * 8 + 4 + "px";
      piece.style.height = piece.style.width;
      piece.style.borderRadius = "50%";
      piece.style.position = "absolute";
      piece.style.top = "-10px";
      piece.style.animation =
        "confettiFall " + (2 + Math.random() * 2) + "s linear forwards";
      container.appendChild(piece);
    }

    setTimeout(() => {
      container.innerHTML = "";
    }, 5000);
  };

  // ===== SCROLL REVEAL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });

  // ===== PHOTO LOADING =====
  document.querySelectorAll("[data-image]").forEach((el) => {
    const img = new Image();

    img.onload = () => {
      el.style.backgroundImage = `url("${el.dataset.image}")`;
      el.classList.remove("photo-placeholder");
      const placeholder = el.querySelector("span");
      if (placeholder) placeholder.style.display = "none";
    };

    img.onerror = () => {
      console.warn(`Image not found: ${el.dataset.image}`);
    };

    img.src = el.dataset.image;
  });

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".photo-card").forEach((card) => {
    card.onclick = () => {
      const imageSrc = card.dataset.image;
      const caption = card.dataset.caption || "";

      if (imageSrc) {
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    };
  });

  lightboxClose.onclick = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  lightbox.onclick = (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
  };

  // ===== SCROLL PERFORMANCE =====
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollEffects();
        ticking = false;
      });
      ticking = true;
    }
  });

  function updateScrollEffects() {
    const header = document.querySelector(".site-header");
    if (window.scrollY > 50) {
      header.style.background =
        "linear-gradient(180deg, rgba(248, 244, 237, 0.98) 0%, rgba(248, 244, 237, 0.85) 100%)";
      header.style.boxShadow = "0 2px 10px rgba(36, 31, 27, 0.1)";
    } else {
      header.style.background =
        "linear-gradient(180deg, rgba(248, 244, 237, 0.95) 0%, rgba(248, 244, 237, 0.7) 100%)";
      header.style.boxShadow = "none";
    }
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href !== "#" && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===== PARALLAX EFFECT =====
  const heroPhoto = document.querySelector(".hero-photo");
  const finalPhoto = document.querySelector(".final-photo");

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;

    if (heroPhoto && scrolled < 1000) {
      heroPhoto.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }

    if (finalPhoto) {
      const elementPosition = finalPhoto.getBoundingClientRect().top;
      if (elementPosition < window.innerHeight) {
        finalPhoto.style.backgroundPosition = `center ${(window.scrollY - finalPhoto.offsetTop + window.innerHeight) * 0.3}px`;
      }
    }
  });

  // ===== BUTTON RIPPLE EFFECT =====
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.width = "10px";
      ripple.style.height = "10px";
      ripple.style.background = "rgba(255, 255, 255, 0.6)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple-animation 0.6s ease-out";
      ripple.style.pointerEvents = "none";

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation
  if (!document.querySelector("style[data-ripple]")) {
    const style = document.createElement("style");
    style.setAttribute("data-ripple", "true");
    style.textContent = `
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox.classList.contains("open")) {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
      }
      if (modal.classList.contains("open")) {
        modal.classList.remove("open");
      }
      if (mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
      }
    }
  });

  // ===== LAZY LOAD IMAGES =====
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.image && !img.style.backgroundImage) {
            img.style.backgroundImage = `url("${img.dataset.image}")`;
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("[data-image]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // ===== PREFERS REDUCED MOTION =====
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelectorAll('[style*="animation"]').forEach((el) => {
      el.style.animation = "none";
    });
  }
});
