// 1. Función Global switchTab requerida por los onclick="" del HTML
window.switchTab = function (event, tabId) {
  if (event) event.preventDefault();

  // A. Ocultar todos los paneles de la página
  const panels = document.querySelectorAll('.tab-panel');
  panels.forEach(panel => {
    panel.classList.remove('active-panel');
  });

  // B. Desactivar todos los botones de las pestañas
  const buttons = document.querySelectorAll('.care-btn, .tab-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active-tab');
  });

  // C. Activar el panel seleccionado
  const activePanel = document.getElementById(tabId);
  if (activePanel) {
    activePanel.classList.add('active-panel');

    // Activar el botón presionado
    if (event && event.currentTarget) {
      event.currentTarget.classList.add('active-tab');
    }

    // D. FORZAR EL SCROLL AL INICIO DEL PANEL
    // Usamos setTimeout(..., 10) para asegurar que el navegador ya dibujó el panel visible
    setTimeout(() => {
      const headerOffset = 100; // Ajuste para no tapar con el menú superior
      const elementPosition = activePanel.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }, 10);
  }
};

// 2. Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     Menú Hamburguesa para Móviles
     ========================================================================== */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('nav-active');
      navToggle.classList.toggle('toggle-active');
    });
  }

  /* ==========================================================================
     Lightbox / Carrusel de Imágenes
     ========================================================================== */
  const modal = document.getElementById('image-modal');

  if (modal) {
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('modal-caption');

    let galleryImages = [];
    let currentIndex = 0;

    const updateModal = (index) => {
      if (!galleryImages.length) return;
      currentIndex = (index + galleryImages.length) % galleryImages.length;
      modalImg.src = galleryImages[currentIndex].src;
      captionText.textContent = galleryImages[currentIndex].alt || 'Philoreptiles';
    };

    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.lightbox-trigger');
      const close = e.target.closest('.modal-close');
      const prev = e.target.closest('.modal-prev');
      const next = e.target.closest('.modal-next');

      if (trigger) {
        galleryImages = Array.from(document.querySelectorAll('.lightbox-trigger'));
        currentIndex = galleryImages.indexOf(trigger);
        updateModal(currentIndex);
        modal.style.display = 'block';
      } else if (close || e.target === modal) {
        modal.style.display = 'none';
      } else if (prev) {
        updateModal(currentIndex - 1);
      } else if (next) {
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
  }

});