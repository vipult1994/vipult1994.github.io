// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll-triggered fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll(
    '.timeline-item, .award-card, .speaking-category, .edu-card, .cert-badge, .stat-card, .contact-card'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Floating particles in hero
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    Object.assign(particle.style, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        background: `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`,
        borderRadius: '50%',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
        animationDelay: `-${Math.random() * 10}s`
    });
    particlesContainer.appendChild(particle);
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
        25% { transform: translate(${Math.random()*60-30}px, -${Math.random()*60+20}px) scale(1.2); opacity: 1; }
        50% { transform: translate(${Math.random()*40-20}px, -${Math.random()*40+10}px) scale(0.8); opacity: 0.3; }
        75% { transform: translate(-${Math.random()*60-30}px, ${Math.random()*30}px) scale(1.1); opacity: 0.7; }
    }
`;
document.head.appendChild(style);
