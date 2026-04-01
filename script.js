// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('#navbar');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ====================== GALERIA + LIGHTBOX ======================

const images = [
  { src: "gallery/salon1.jpg", caption: "Salon z aneksem kuchennym" },
  { src: "gallery/salon2.jpg", caption: "Przestronny salon" },
  { src: "gallery/aneks1.jpg", caption: "Aneks kuchenny" },
  { src: "gallery/aneks2.jpg", caption: "W pełni wyposażona kuchnia" },
  { src: "gallery/jadalnia1.jpg", caption: "Strefa jadalniana" },
  { src: "gallery/jadalnia2.jpg", caption: "Jadalnia" },
  { src: "gallery/sypialnia1.jpg", caption: "Sypialnia" },
  { src: "gallery/sypialnia2.jpg", caption: "Komfortowa sypialnia" },
  { src: "gallery/lazienka.jpg",   caption: "Łazienka z prysznicem" },
  { src: "gallery/basen.jpg",      caption: "Zewnętrzny basen w Lazurowym Dworze" },
  { src: "gallery/plac-zabaw.jpg", caption: "Plac zabaw dla dzieci" },
  { src: "gallery/taras.jpg",      caption: "Taras / balkon" }
];

const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;

// Tworzenie miniaturek
images.forEach((image, index) => {
  const item = document.createElement('div');
  item.classList.add('gallery-item');
  
  item.innerHTML = `<img src="${image.src}" alt="${image.caption}" loading="lazy">`;
  
  item.addEventListener('click', () => {
    currentIndex = index;
    showLightbox();
  });
  
  galleryGrid.appendChild(item);
});

function showLightbox() {
  lightboxImage.src = images[currentIndex].src;
  lightboxCaption.textContent = images[currentIndex].caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'visible';
}

// Nawigacja w lightboxie
lightboxPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showLightbox();
});

lightboxNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showLightbox();
});

lightboxClose.addEventListener('click', hideLightbox);

// Zamknięcie lightboxa klawiszem ESC
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === "Escape") hideLightbox();
  if (e.key === "ArrowLeft") lightboxPrev.click();
  if (e.key === "ArrowRight") lightboxNext.click();
});

// Zamknięcie po kliknięciu w tło
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) hideLightbox();
});
