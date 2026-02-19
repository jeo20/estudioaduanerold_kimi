/**
 * ESTUDIO ADUANERO LD - JavaScript Principal
 * ===========================================
 */

// Detectar si estamos en la carpeta pages o en raíz
const isInPagesFolder = window.location.pathname.includes('/pages/');
const basePath = isInPagesFolder ? '../' : '';
const componentsPath = isInPagesFolder ? '../components/' : 'components/';

document.addEventListener('DOMContentLoaded', function() {
  // Cargar componentes primero
  loadComponents().then(() => {
    // Inicializar todas las funcionalidades después de cargar componentes
    initNavbar();
    initScrollReveal();
    initSmoothScroll();
    initMobileMenu();
    initActiveLinks();
    fixComponentLinks();
  });
});

/**
 * Cargar componentes (navbar y footer) dinámicamente
 */
async function loadComponents() {
  try {
    // Cargar navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      const navbarResponse = await fetch(componentsPath + 'navbar.html');
      if (navbarResponse.ok) {
        let navbarHtml = await navbarResponse.text();
        navbarContainer.innerHTML = navbarHtml;
      }
    }
    
    // Cargar footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      const footerResponse = await fetch(componentsPath + 'footer.html');
      if (footerResponse.ok) {
        let footerHtml = await footerResponse.text();
        footerContainer.innerHTML = footerHtml;
      }
    }
  } catch (error) {
    console.error('Error cargando componentes:', error);
  }
}

/**
 * Corregir enlaces de componentes según la ubicación actual
 */
function fixComponentLinks() {
  // Si estamos en la carpeta pages, ajustar enlaces del navbar
  if (isInPagesFolder) {
    // Ajustar enlaces del navbar
    const navLinks = document.querySelectorAll('.navbar-menu .nav-link, .navbar .nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#')) {
        // Si el enlace no empieza con ../ y no es index.html, agregar ../
        if (!href.startsWith('../') && href !== 'index.html') {
          link.setAttribute('href', '../' + href);
        } else if (href === 'index.html') {
          link.setAttribute('href', '../index.html');
        }
      }
    });
    
    // Ajustar logo link
    const logoLinks = document.querySelectorAll('.navbar-brand');
    logoLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === 'index.html') {
        link.setAttribute('href', '../index.html');
      }
    });
    
    // Ajustar enlaces del footer
    const footerLinks = document.querySelectorAll('.footer-links a, .footer-brand a');
    footerLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        if (!href.startsWith('../') && href !== 'index.html') {
          link.setAttribute('href', '../' + href);
        } else if (href === 'index.html') {
          link.setAttribute('href', '../index.html');
        }
      }
    });
  }
}

/**
 * Navegación - Efecto scroll
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) return;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('transparent');
    }
  });
}

/**
 * Scroll Reveal - Animaciones al hacer scroll
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length === 0) return;
  
  const revealOnScroll = function() {
    revealElements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  };
  
  // Ejecutar al cargar y al hacer scroll
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
}

/**
 * Smooth Scroll para enlaces internos
 */
function initSmoothScroll() {
  const smoothLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Cerrar menú móvil si está abierto
        const navbarMenu = document.querySelector('.navbar-menu');
        if (navbarMenu && navbarMenu.classList.contains('active')) {
          navbarMenu.classList.remove('active');
        }
      }
    });
  });
}

/**
 * Menú móvil
 */
function initMobileMenu() {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  if (!navbarToggle || !navbarMenu) return;
  
  navbarToggle.addEventListener('click', function() {
    navbarMenu.classList.toggle('active');
    
    // Cambiar ícono
    const icon = this.querySelector('i');
    if (icon) {
      if (navbarMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
  
  // Cerrar menú al hacer click fuera
  document.addEventListener('click', function(e) {
    if (!navbarToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
      navbarMenu.classList.remove('active');
      const icon = navbarToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
}

/**
 * Enlaces activos según la página actual
 */
function initActiveLinks() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(function(link) {
    const linkPage = link.getAttribute('href').split('/').pop();
    
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Contador animado para estadísticas
 */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(function() {
    start += increment;
    
    if (start >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

/**
 * Lazy loading para imágenes
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback para navegadores antiguos
    lazyImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Validación de formularios
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(function(input) {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });
  
  // Validar email
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput && emailInput.value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      isValid = false;
      emailInput.classList.add('error');
    }
  }
  
  return isValid;
}

/**
 * Mostrar notificación toast
 */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Estilos inline para el toast
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 0.5rem;
    font-weight: 500;
    z-index: 9999;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(function() {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(function() {
      toast.remove();
    }, 300);
  }, 3000);
}

// Animaciones CSS para toast
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(toastStyles);

/**
 * Parallax effect para hero
 */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  
  if (!heroBg) return;
  
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
}

// Inicializar parallax si no es móvil
if (window.innerWidth > 768) {
  initParallax();
}

/**
 * Preloader
 */
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  
  if (!preloader) return;
  
  window.addEventListener('load', function() {
    preloader.classList.add('hidden');
    setTimeout(function() {
      preloader.remove();
    }, 500);
  });
}

// Inicializar preloader
initPreloader();

/**
 * Tabs functionality
 */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs-container');
  
  tabContainers.forEach(function(container) {
    const tabButtons = container.querySelectorAll('.tab-button');
    const tabPanels = container.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const targetTab = this.dataset.tab;
        
        // Desactivar todos los tabs
        tabButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
        tabPanels.forEach(function(panel) {
          panel.classList.remove('active');
        });
        
        // Activar el tab seleccionado
        this.classList.add('active');
        container.querySelector(`[data-panel="${targetTab}"]`).classList.add('active');
      });
    });
  });
}

// Inicializar tabs
initTabs();

/**
 * Accordion functionality
 */
function initAccordion() {
  const accordions = document.querySelectorAll('.accordion');
  
  accordions.forEach(function(accordion) {
    const headers = accordion.querySelectorAll('.accordion-header');
    
    headers.forEach(function(header) {
      header.addEventListener('click', function() {
        const item = this.parentElement;
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los items
        accordion.querySelectorAll('.accordion-item').forEach(function(i) {
          i.classList.remove('active');
        });
        
        // Abrir el item clickeado si no estaba activo
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  });
}

// Inicializar accordion
initAccordion();

// Exportar funciones para uso global
window.EstudioAduanero = {
  animateCounter: animateCounter,
  showToast: showToast,
  validateForm: validateForm
};
