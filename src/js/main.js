document.addEventListener('DOMContentLoaded', () => {
  // References to elements
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');
  const modal = document.getElementById('achievements-modal');
  const modalBtn = document.getElementById('achievements-modal-btn');
  const closeBtn = document.querySelector('.close');
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-arrow.prev');
  const nextBtn = document.querySelector('.carousel-arrow.next');
  
  // Navbar functionality - shrink on scroll
  function toggleNavbarSize() {
    if (window.scrollY === 0) {
      navbar.classList.add('expanded');
    } else {
      navbar.classList.remove('expanded');
    }
  }
  
  // Initialize navbar size
  toggleNavbarSize();
  
  // Position indicator - highlight active section in navbar
  function highlightActiveSection() {
    let scrollPosition = window.scrollY;
    
    // Get navbar height for offset calculation
    const navHeight = navbar.offsetHeight;
    
    // Check each section to determine which one is currently visible
    sections.forEach(section => {
      // Adjust the threshold to be more accurate
      const sectionTop = section.offsetTop - navHeight - 50; // Increased offset buffer
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Find the corresponding nav link and set it active
        const id = section.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // Special case for highlighting home when at the very top
    if (scrollPosition < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#home') {
          link.classList.add('active');
        }
      });
    }
    
    // Special case for highlighting last item when at the bottom of page
    const bottomOfPage = document.body.offsetHeight - window.innerHeight - 10;
    if (scrollPosition >= bottomOfPage) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#contact') {
          link.classList.add('active');
        }
      });
    }
  }
  
  // Initialize highlighted section
  highlightActiveSection();
  
  // Smooth scrolling functionality
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const navbarHeight = navbar.offsetHeight;
      
      // Add a small offset to ensure the section is fully visible
      const offsetPosition = targetElement.offsetTop - navbarHeight + 2; 
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Instead of immediately updating active class, wait for scrolling to complete
      setTimeout(() => {
        highlightActiveSection();
      }, 500); // Half-second delay to let scroll settle
    });
  });
  
  // Modal functionality
  modalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
  });
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  });
  
  // Carousel functionality
  let currentSlide = 0;
  
  function showSlide(index) {
    if (index < 0) {
      currentSlide = carouselSlides.length - 1;
    } else if (index >= carouselSlides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    
    const carousel = document.querySelector('.carousel');
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  // Initialize carousel
  showSlide(currentSlide);
  
  // Next and previous buttons
  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });
  
  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });
  
  // Event listeners for scroll events
  window.addEventListener('scroll', () => {
    toggleNavbarSize();
    highlightActiveSection();
  });
  
  // Form submission handling
  const fanForm = document.getElementById('fan-form');
  if (fanForm) {
    fanForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      
      if (name && email) {
        alert(`Thank you, ${name}! You've successfully subscribed to the Tom Brady Fan Club updates.`);
        fanForm.reset();
      } else {
        alert('Please fill out all fields.');
      }
    });
  }
});
