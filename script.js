// Initialize Lucide icons
lucide.createIcons();

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  
  if (mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.remove('opacity-100');
    mobileMenu.classList.add('opacity-0');
  } else {
    setTimeout(() => {
      mobileMenu.classList.remove('opacity-0');
      mobileMenu.classList.add('opacity-100');
      
      // Animate mobile nav links
      mobileNavLinks.forEach((link, index) => {
        setTimeout(() => {
          link.classList.add('show');
        }, index * 100);
      });
    }, 10);
  }
});

// Close mobile menu when clicking on nav links
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenu.classList.remove('opacity-100');
    mobileMenu.classList.add('opacity-0');
    
    mobileNavLinks.forEach(navLink => {
      navLink.classList.remove('show');
    });
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      
      // Animate progress bars
      if (entry.target.classList.contains('skill-item')) {
        const progressBar = entry.target.querySelector('.progress-bar');
        if (progressBar) {
          const width = progressBar.getAttribute('data-width');
          setTimeout(() => {
            progressBar.style.width = width + '%';
          }, 500);
        }
      }
      
      // Animate info cards with stagger
      if (entry.target.classList.contains('info-card')) {
        entry.target.style.animationDelay = '0s';
        entry.target.classList.add('fade-in-up');
      }
      
      // Animate quality items with stagger
      if (entry.target.classList.contains('quality-item')) {
        entry.target.style.animationDelay = '0s';
        entry.target.classList.add('fade-in-up');
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .skill-item, .info-card, .quality-item').forEach(el => {
  observer.observe(el);
});

// Header background change on scroll - TRANSPARENT VERSION
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('backdrop-blur-md');
    header.classList.remove('backdrop-blur-sm');
    header.style.borderBottomColor = 'rgba(16, 185, 129, 0.3)';
  } else {
    header.classList.add('backdrop-blur-sm');
    header.classList.remove('backdrop-blur-md');
    header.style.borderBottomColor = 'rgba(16, 185, 129, 0.2)';
  }
});

// Removed parallax effect for hero section - image now stays fixed

// Add loading animation
window.addEventListener('load', () => {
  // Remove any loading states and start animations
  document.body.classList.add('loaded');
  
  // Initialize progress bars
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    bar.style.width = '0%';
  });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Enhanced hover effects for cards
document.querySelectorAll('.experience-card, .contact-card, .info-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
    this.style.boxShadow = '0 25px 50px -12px rgba(16, 185, 129, 0.25)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '';
  });
});

// Skill bars animation trigger
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.progress-bar');
  
  skillBars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    bar.style.width = width + '%';
  });
}

// Trigger skill bars animation when skills section is visible
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  observer.observe(skillsSection);
}

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .cta-button-outline').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.6);
  transform: scale(0);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;
}

@keyframes ripple-animation {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Console welcome message
console.log(`
🌱 Portfólio de Jesulino Neto Gomes de Oliveira
📚 Licenciando em Ciências Biológicas
🎓 Participante do PIBID
✨ Feito com dedicação para a educação e ciência
`);
