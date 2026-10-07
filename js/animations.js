document.addEventListener("DOMContentLoaded", () => {
  // ===== ADVANCED SCROLL REVEAL =====
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const siblings = Array.from(
            entry.target.parentElement.children,
          ).filter((element) => element.classList.contains("reveal"));
          const index = siblings.indexOf(entry.target);
          entry.target.style.setProperty(
            "--reveal-delay",
            `${Math.min(index, 5) * 90}ms`,
          );
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -80px 0px",
    },
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // ===== PARALLAX SCROLL EFFECT =====
  const createParallax = () => {
    const parallaxElements = document.querySelectorAll(
      ".hero-photo, .final-photo",
    );

    parallaxElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elementTop = window.scrollY + rect.top;
      const elementHeight = rect.height;

      window.addEventListener(
        "scroll",
        () => {
          const scrollTop = window.scrollY;
          const elementBottom = elementTop + elementHeight;

          if (
            scrollTop < elementBottom &&
            scrollTop + window.innerHeight > elementTop
          ) {
            const scrollPercent =
              (scrollTop - elementTop) / (window.innerHeight + elementHeight);
            const yOffset = scrollPercent * 50 - 25;
            el.style.backgroundPosition = `center calc(50% + ${yOffset}px)`;
          }
        },
        { passive: true },
      );
    });
  };

  createParallax();

  // ===== TILT EFFECT ON CARDS =====
  const addTiltEffect = () => {
    const cards = document.querySelectorAll(
      ".message-card, .timeline-item div",
    );

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;

        const rotateX = yPercent * 5;
        const rotateY = xPercent * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        card.style.boxShadow = `0 20px 60px rgba(36, 31, 27, ${0.1 + Math.abs(xPercent) * 0.1})`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
        card.style.boxShadow = "0 10px 30px rgba(36, 31, 27, 0.1)";
      });
    });
  };

  addTiltEffect();

  // ===== TEXT ANIMATION ON SCROLL =====
  const animateTextOnScroll = () => {
    const textElements = document.querySelectorAll("h1, h2, h3, p");

    textElements.forEach((el) => {
      if (el.closest(".reveal")) return; // Skip if already handled

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.style.animation = "fadeIn 0.8s ease forwards";
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(el);
    });
  };

  animateTextOnScroll();

  // ===== SMOOTH GRADIENT ANIMATION =====
  const animateGradients = () => {
    const elements = document.querySelectorAll('[style*="gradient"]');

    elements.forEach((el) => {
      if (el.closest(".intro")) {
        el.style.animation = "gradientShift 6s ease infinite";
      }
    });
  };

  // Add gradient animation keyframe
  if (!document.querySelector("style[data-gradient]")) {
    const style = document.createElement("style");
    style.setAttribute("data-gradient", "true");
    style.textContent = `
      @keyframes gradientShift {
        0%, 100% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  animateGradients();

  // ===== COUNTER ANIMATION =====
  const animateCounters = () => {
    const counters = document.querySelectorAll(
      ".timeline-item .year, .message-card .initial",
    );

    counters.forEach((counter) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              counter.style.animation = "pulse 0.8s ease";
              observer.unobserve(counter);
            }
          });
        },
        { threshold: 0.5 },
      );

      observer.observe(counter);
    });
  };

  animateCounters();

  // ===== PHOTO GRID ANIMATION =====
  const animatePhotoGrid = () => {
    const photos = document.querySelectorAll(".photo-card");

    photos.forEach((photo, index) => {
      photo.style.opacity = "0";
      photo.style.transform = "scale(0.8) translateY(20px)";

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                photo.style.transition =
                  "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
                photo.style.opacity = "1";
                photo.style.transform = "scale(1) translateY(0)";
              }, index * 100);
              observer.unobserve(photo);
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(photo);
    });
  };

  animatePhotoGrid();

  // ===== SCROLL PROGRESS BAR =====
  const createProgressBar = () => {
    const progressBar = document.createElement("div");
    progressBar.id = "scrollProgress";
    progressBar.style.cssText = `
      position: fixed;
      top: 76px;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #8e2f4f 0%, #c66c89 100%);
      z-index: 99;
      width: 0%;
      transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener(
      "scroll",
      () => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrolled + "%";
      },
      { passive: true },
    );
  };

  createProgressBar();

  // ===== LAZY LOAD WITH FADE =====
  const lazyLoadImages = () => {
    const images = document.querySelectorAll("[data-image]");

    images.forEach((img) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const src = img.dataset.image;
              const tempImg = new Image();

              tempImg.onload = () => {
                img.style.backgroundImage = `url("${src}")`;
                img.style.transition = "all 0.6s ease";
                img.style.opacity = "1";
                img.classList.remove("photo-placeholder");
                const text = img.querySelector("span");
                if (text) text.style.opacity = "0";
              };

              tempImg.src = src;
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: "50px" },
      );

      img.style.opacity = "0.7";
      observer.observe(img);
    });
  };

  lazyLoadImages();

  // ===== AMBIENT BACKGROUND ANIMATION =====
  const createAmbientAnimation = () => {
    if (!document.querySelector("style[data-ambient]")) {
      const style = document.createElement("style");
      style.setAttribute("data-ambient", "true");
      style.textContent = `
        @keyframes float-ambient {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .section::before {
          animation: float-ambient 8s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  };

  createAmbientAnimation();

  // ===== INTERSECTION OBSERVER FOR PERFORMANCE =====
  const performanceObserver = () => {
    document.querySelectorAll("[data-image]").forEach((el) => {
      el.style.willChange = "background-image";
    });
  };

  performanceObserver();
});
