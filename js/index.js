'use strict'

// ===============================
// ANIMACIÓN A TODO EL CONTENIDO - SCROLL EN INDEX.HTML
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los hijos dentro del main
  const elements = document.querySelectorAll("main *");

  elements.forEach(el => {
    el.classList.add("reveal");
    el.setAttribute("data-animate", "");
  });

  // === OBSERVADOR ===
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.15, // cuanto más pequeño, antes aparece
    }
  );

  // Aplicar observador a todos los elementos
  document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
});

// ================================
// EFECTO HOVER POR LETRA EN TÍTULO - INDEX.HTML
// ================================
document.addEventListener('DOMContentLoaded', function () {
  const h2 = document.querySelector('.Title-h2');
  if (!h2) return;

  const text = h2.textContent.trim();
  h2.innerHTML = '';

  // Necesario: salto de línea después de "3d"
  text.split('').forEach((char, i) => {
    if (i === 7) { // 0:m,1:i,2:s,3:s,4:' ',5:3,6:d
      h2.appendChild(document.createElement('br')); // salto de línea
    }

    const span = document.createElement('span');
    span.classList.add('Title-letter');
    span.textContent = char;
    h2.appendChild(span);
  });
});


// ===============================
// EFECTO PARA IMÁGENES HIGHLIGHT - 
// ===============================
document.addEventListener('DOMContentLoaded', function () {
  const scroller = document.querySelector('.Parent')
  if (!scroller) return

  const imgs = scroller.querySelectorAll('img')

  function actualizarVisibilidad() {
    const vw = window.innerWidth

    imgs.forEach(function (img) {
      const rect = img.getBoundingClientRect()
      if (rect.left < vw * 0.9 && rect.right > 0) {
        img.classList.add('isVisible')
      } else {
        img.classList.remove('isVisible')
      }
    })
  }

  scroller.addEventListener('scroll', actualizarVisibilidad, { passive: true })
  window.addEventListener('scroll', actualizarVisibilidad, { passive: true })
  window.addEventListener('resize', actualizarVisibilidad)
  actualizarVisibilidad()
})


// ===== Botón "Add to Cart" cambia a "Added" durante 1sec =====
const addToCartBtn = document.getElementById('addToCart');

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', (e) => {
    e.preventDefault(); 

    addToCartBtn.textContent = 'added'; // cambia texto
    addToCartBtn.classList.add('added'); // añade clase visual

    // vuelve al texto original después de 1.5 segundos
    setTimeout(() => {
      addToCartBtn.textContent = 'add to cart';
      addToCartBtn.classList.remove('added');
    }, 1500);
  });
}

// ===== GALERÍA ULTRASIMPLE: prev/next con display =====
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.Gallery');
  if (!gallery) return;

  const slides = [...gallery.querySelectorAll('.Gallery-img')];
  const prev   = gallery.querySelector('.Gallery-arrow--prev');
  const next   = gallery.querySelector('.Gallery-arrow--next');
  if (!slides.length || !prev || !next) return;

  let i = slides.findIndex(s => s.classList.contains('isVisible'));
  if (i < 0) i = 0;

  function draw() {
    slides.forEach((s, idx) => {
      s.style.display = idx === i ? 'block' : 'none';
    });
  }

  draw();

  next.addEventListener('click', () => { i = (i + 1) % slides.length; draw(); });
  prev.addEventListener('click', () => { i = (i - 1 + slides.length) % slides.length; draw(); });
});

// === ZOOM DINÁMICO SIMPLE ===
document.addEventListener('DOMContentLoaded', () => {
  const media = document.querySelector('.Product-media');
  if (!media) return;

  media.addEventListener('mousemove', e => {
    const img = media.querySelector('.Gallery-img[style*="block"]');
    if (!img) return;

    const rect = media.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
  });

  media.addEventListener('mouseleave', () => {
    const img = media.querySelector('.Gallery-img[style*="block"]');
    if (img) img.style.transformOrigin = 'center center';
  });
});
