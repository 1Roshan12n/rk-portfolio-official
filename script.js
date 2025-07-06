// Animated code background
const codeBg = document.getElementById('codeBg');
const codeSnippets = [
    'function createPortfolio() {\n  return new Promise((resolve) => {\n    const skills = ["JavaScript", "Python", "React"];\n    resolve(skills);\n  });\n}',
    'class Developer {\n  constructor(name) {\n    this.name = name;\n    this.skills = [];\n  }\n  addSkill(skill) {\n    this.skills.push(skill);\n  }\n}',
    'const portfolio = {\n  name: "Roshan Kumar S",\n  role: "Full Stack Developer",\n  experience: "2+ years",\n  languages: ["JS", "Python", "Java"]\n};',
    'async function fetchData() {\n  try {\n    const response = await api.get("/data");\n    return response.data;\n  } catch (error) {\n    console.error(error);\n  }\n}',
    'import React from "react";\nimport { useState, useEffect } from "react";\n\nconst App = () => {\n  const [data, setData] = useState([]);\n  return <div>Hello World</div>;\n};'
];

function createCodeLine() {
    const codeLine = document.createElement('div');
    codeLine.className = 'code-lines';
    codeLine.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    codeLine.style.left = Math.random() * 100 + '%';
    codeLine.style.animationDuration = (Math.random() * 10 + 15) + 's';
    codeBg.appendChild(codeLine);

    setTimeout(() => {
        codeLine.remove();
    }, 25000);
}

// Create initial code lines
for (let i = 0; i < 5; i++) {
    setTimeout(createCodeLine, i * 2000);
}

// Continue creating code lines
setInterval(createCodeLine, 4000);

// Global Variables
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Typewriter Effect
const typewriterTexts = [
    "Full Stack Developer",
    "Java Enthusiast", 
    "Problem Solver",
    "Creative Thinker"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('animatedTitle');

function typewriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed = 50;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typeSpeed = 500; // Pause before next word
    }
    
    setTimeout(typewriter, typeSpeed);
}

// Start typewriter effect
if (typewriterElement) {
    typewriter();
}

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Set navigation item indices for staggered animations
document.querySelectorAll('.nav-item').forEach((item, index) => {
    item.style.setProperty('--item-index', index);
});

// Mobile Navigation Toggle
const navClose = document.getElementById('navClose');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        openMobileMenu();
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        closeMobileMenu();
    });
}

function openMobileMenu() {
    navMenu.classList.add('active');
    navToggle.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = 'auto';
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    }
});

// Keyboard shortcut to open navigation (Ctrl+K)
document.addEventListener('keydown', (e) => {
    // Check if Ctrl+K is pressed
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault(); // Prevent default browser behavior
        
        // Toggle navigation menu
        if (navMenu && navToggle) {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
    }
    
    // Close navigation with Escape key
    if (e.key === 'Escape') {
        if (navMenu && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

// Touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    // Swipe right to open menu (only if menu is closed)
    if (swipeDistance > swipeThreshold && !navMenu.classList.contains('active')) {
        openMobileMenu();
    }
    
    // Swipe left to close menu (only if menu is open)
    if (swipeDistance < -swipeThreshold && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
}

// Highlight current section in navigation
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for section highlighting
window.addEventListener('scroll', highlightCurrentSection);

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
        navbar.style.background = 'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(26, 26, 46, 0.98) 50%, rgba(15, 15, 35, 0.98) 100%)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'linear-gradient(135deg, rgba(15, 15, 35, 0.95) 0%, rgba(26, 26, 46, 0.95) 50%, rgba(15, 15, 35, 0.95) 100%)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
    }
    
    // Ensure navbar is always visible
    navbar.style.opacity = '1';
    navbar.style.visibility = 'visible';
    navbar.style.transform = 'translateY(0)';
    navbar.style.display = 'block';
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.left = '0';
    navbar.style.width = '100%';
    navbar.style.zIndex = '9999';
    navbar.style.pointerEvents = 'auto';
});

// Additional function to ensure navbar is always visible
function ensureNavbarVisible() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
        navbar.style.transform = 'translateY(0)';
        navbar.style.display = 'block';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.width = '100%';
        navbar.style.zIndex = '9999';
        navbar.style.pointerEvents = 'auto';
    }
}

// Call this function periodically to ensure navbar stays visible
setInterval(ensureNavbarVisible, 1000);

// Also call on page load and resize
window.addEventListener('load', ensureNavbarVisible);
window.addEventListener('resize', ensureNavbarVisible);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
    
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Skill Progress Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
            bar.style.width = width;
        }
    });
}

// Animate skill bars when skills section is visible
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
}

function changeTestimonial(direction) {
    currentTestimonial += direction;
    
    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    } else if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }
    
    showTestimonial(currentTestimonial);
}

function currentTestimonialSlide(index) {
    currentTestimonial = index - 1;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
setInterval(() => {
    changeTestimonial(1);
}, 5000);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.querySelector('.btn-text').textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Floating Shapes Animation Enhancement
function createFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    if (!shapesContainer) return;
    
    // Add more dynamic shapes
    for (let i = 0; i < 10; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.animationDelay = Math.random() * 5 + 's';
        shape.style.animationDuration = (Math.random() * 3 + 3) + 's';
        shapesContainer.appendChild(shape);
    }
}

// Code Rain Effect
function createCodeRain() {
    const codeRain = document.getElementById('codeRain');
    if (!codeRain) return;

    const characters = '01{}[]();,.<>=+-*/&|!~^%$#@?:';
    const lineCount = 5; // Reduced number of lines for lighter effect
    const lines = [];

    function randomText(length = 20) {
        let text = '';
        for (let i = 0; i < length; i++) {
            text += characters[Math.floor(Math.random() * characters.length)];
        }
        return text;
    }

    function resetLine(line) {
        line.textContent = randomText();
        line.style.left = Math.random() * 100 + 'vw';
        line.style.top = '-40px';
        line.style.animation = 'none';
        // Force reflow to restart animation
        void line.offsetWidth;
        line.style.animation = `codeFall linear ${Math.random() * 2 + 4}s`;
    }

    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'code-rain-line';
        resetLine(line);
        line.addEventListener('animationend', () => resetLine(line));
        codeRain.appendChild(line);
        lines.push(line);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCodeRain);
} else {
    createCodeRain();
}

// Parallax Effect for Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shapes');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Initialize all effects when page loads
document.addEventListener('DOMContentLoaded', () => {
    createFloatingShapes();
    
    // Add loading animation
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
    
    // Remove loading after page loads
    setTimeout(() => {
        loading.remove();
    }, 2000);
});

// Hover Effects for Cards
document.querySelectorAll('.project-card, .experience-card, .certificate-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Social Media Links Enhancement
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}); 

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #FFD700, #FFA500)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add some fun particle effects
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '1';
    
    document.body.appendChild(particlesContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#FFD700';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.opacity = '0.6';
        
        particlesContainer.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 0.6 },
            { transform: `translateY(-${window.innerHeight}px) scale(0)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });
        
        animation.onfinish = () => particle.remove();
    }
    
    setInterval(createParticle, 200);
}

// Initialize particles
createParticles();

// Scroll animation for Education timeline
function animateTimelineItems() {
    const items = document.querySelectorAll('.timeline-item');
    const triggerBottom = window.innerHeight * 0.85;
    items.forEach(item => {
        const boxTop = item.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            item.classList.add('visible');
        } else {
            item.classList.remove('visible');
        }
    });
}
window.addEventListener('scroll', animateTimelineItems);
window.addEventListener('DOMContentLoaded', animateTimelineItems);

// Scroll animation for Get In Touch section (staggered)
function animateContactSection() {
    const contact = document.querySelector('.contact-container');
    if (!contact) return;
    const triggerBottom = window.innerHeight * 0.85;
    const boxTop = contact.getBoundingClientRect().top;
    const items = contact.querySelectorAll('.contact-item, .contact-form-container');
    if (boxTop < triggerBottom) {
        items.forEach((item, idx) => {
            setTimeout(() => item.classList.add('visible'), idx * 150);
        });
    } else {
        items.forEach(item => item.classList.remove('visible'));
    }
}
window.addEventListener('scroll', animateContactSection);
window.addEventListener('DOMContentLoaded', animateContactSection);

// Remove .no-js from body if JS is enabled
window.addEventListener('DOMContentLoaded', function() {
    document.body.classList.remove('no-js');
    animateContactSection();
});

// Animate Get Started (Get In Touch) section on scroll
const getStartedSection = document.getElementById('contact');
if (getStartedSection) {
    const getStartedHeader = getStartedSection.querySelector('.get-started-header');
    const getStartedCard = getStartedSection.querySelector('.get-started-card');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (getStartedHeader) getStartedHeader.classList.add('visible');
                if (getStartedCard) getStartedCard.classList.add('visible');
                obs.disconnect();
            }
        });
    }, { threshold: 0.3 });
    observer.observe(getStartedSection);
} 