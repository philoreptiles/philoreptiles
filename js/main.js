(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Hamburguesa para Móviles
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('nav-active');
        navToggle.classList.toggle('toggle-active');
      });
    }

    // 2. Lightbox / Carrusel con Event Delegation
    const modal = document.getElementById('image-modal');
    if (!modal) return;

    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');

    let galleryImages = [];
    let currentIndex = 0;

    const updateModal = (index) => {
      if (!galleryImages.length) return;
      currentIndex = (index + galleryImages.length) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
      captionText.textContent = galleryImages[currentIndex].alt || 'Philoreptiles';
    };

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('lightbox-trigger')) {
        galleryImages = Array.from(document.querySelectorAll('.lightbox-trigger'));
        currentIndex = galleryImages.indexOf(e.target);
        updateModal(currentIndex);
        modal.style.display = 'block';
      } else if (e.target === closeBtn || e.target === modal) {
        modal.style.display = 'none';
      } else if (e.target === prevBtn) {
        updateModal(currentIndex - 1);
      } else if (e.target === nextBtn) {
        updateModal(currentIndex + 1);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') updateModal(currentIndex - 1);
        if (e.key === 'ArrowRight') updateModal(currentIndex + 1);
        if (e.key === 'Escape') modal.style.display = 'none';
      }
    });
  });
})();