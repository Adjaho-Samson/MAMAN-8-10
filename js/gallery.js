document.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImage");
  const cap = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");

  let currentIndex = -1;
  const photos = Array.from(document.querySelectorAll(".photo-card"));

  // ===== OPEN LIGHTBOX =====
  photos.forEach((card, index) => {
    card.onclick = () => {
      currentIndex = index;
      loadPhoto(card);
    };
  });

  function loadPhoto(card) {
    const test = new Image();

    test.onload = () => {
      img.src = card.dataset.image;
      cap.textContent = card.dataset.caption || "";
      box.classList.add("open");
      document.body.style.overflow = "hidden";
      img.style.animation = "zoomIn 0.4s ease";
    };

    test.onerror = () => {
      img.removeAttribute("src");
      cap.textContent = "Ajoute la photo dans le dossier indiqué.";
      box.classList.add("open");
      document.body.style.overflow = "hidden";
    };

    test.src = card.dataset.image;
  }

  // ===== CLOSE LIGHTBOX =====
  closeBtn.onclick = () => {
    box.classList.remove("open");
    document.body.style.overflow = "";
    currentIndex = -1;
  };

  box.onclick = (e) => {
    if (e.target === box) {
      box.classList.remove("open");
      document.body.style.overflow = "";
      currentIndex = -1;
    }
  };

  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("open")) return;

    if (e.key === "Escape") {
      box.classList.remove("open");
      document.body.style.overflow = "";
      currentIndex = -1;
      document.getElementById("surpriseModal").classList.remove("open");
    }

    if (e.key === "ArrowRight" && currentIndex < photos.length - 1) {
      currentIndex++;
      loadPhoto(photos[currentIndex]);
    }

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      currentIndex--;
      loadPhoto(photos[currentIndex]);
    }
  });

  // ===== TOUCH SWIPE SUPPORT =====
  let touchStartX = 0;
  let touchEndX = 0;

  box.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  box.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (
      touchStartX - touchEndX > swipeThreshold &&
      currentIndex < photos.length - 1
    ) {
      currentIndex++;
      loadPhoto(photos[currentIndex]);
    } else if (touchEndX - touchStartX > swipeThreshold && currentIndex > 0) {
      currentIndex--;
      loadPhoto(photos[currentIndex]);
    }
  }

  // ===== PHOTO COUNTER =====
  if (!document.querySelector(".photo-counter")) {
    const counter = document.createElement("div");
    counter.className = "photo-counter";
    counter.style.cssText = `
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 0.9rem;
      background: rgba(36, 31, 27, 0.5);
      padding: 8px 16px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
      z-index: 601;
      opacity: 0;
      transition: opacity 0.3s;
    `;
    box.appendChild(counter);

    const updateCounter = () => {
      if (currentIndex >= 0 && currentIndex < photos.length) {
        counter.textContent = `${currentIndex + 1} / ${photos.length}`;
        counter.style.opacity = "1";
      }
    };

    const originalLoadPhoto = loadPhoto;
    loadPhoto = function (card) {
      originalLoadPhoto(card);
      updateCounter();
    };
  }
});
