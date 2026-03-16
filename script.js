// ===== Theme Toggle (Dark/Light) =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('theme') || 'dark';

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', theme);
}
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Typing Animation =====
const typingEl = document.getElementById('typingText');
const phrases = [
    'Sr. Solutions Architect — Agentic AI | FinOps COE',
    'Blue Prism MVP x4 | UiPath Certified',
    'Enterprise Automation Leader',
    'Professional Speaker & Mentor',
    'AWS | RPA | Python | AI'
];

let phraseIdx = 0, charIdx = 0, isDeleting = false;
const cursor = document.createElement('span');
cursor.className = 'typing-cursor';
typingEl.appendChild(cursor);

function type() {
    const current = phrases[phraseIdx];
    if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIdx + 1);
        typingEl.appendChild(cursor);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(type, 2000); // pause at end
            return;
        }
        setTimeout(type, 50 + Math.random() * 30);
    } else {
        typingEl.textContent = current.substring(0, charIdx - 1);
        typingEl.appendChild(cursor);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            setTimeout(type, 500);
            return;
        }
        setTimeout(type, 25);
    }
}
type();

// ===== Animated Counters =====
const counters = document.querySelectorAll('.stat-number[data-target]');
let countersDone = false;

function animateCounters() {
    if (countersDone) return;
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            counter.textContent = current + suffix;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + suffix;
            }
        }
        requestAnimationFrame(update);
    });
    countersDone = true;
}

// ===== Skill Bar Animation =====
let skillsDone = false;
function animateSkills() {
    if (skillsDone) return;
    document.querySelectorAll('.skill-fill').forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.classList.add('animated');
        bar.style.width = level + '%';
    });
    skillsDone = true;
}

// ===== Scroll-triggered Animations =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll(
    '.timeline-item, .award-card, .speaking-category, .edu-card, .cert-badge, .stat-card, .contact-card, .skill-item'
).forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Counter observer — trigger when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) animateCounters();
    });
}, { threshold: 0.3 });

document.querySelectorAll('.about-stats').forEach(el => statsObserver.observe(el));

// Skills observer — trigger when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) animateSkills();
    });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillsObserver.observe(skillsSection);

// ===== Parallax Effect =====
const heroParallax = document.getElementById('heroParallax');
window.addEventListener('scroll', () => {
    if (heroParallax) {
        const scrolled = window.scrollY;
        heroParallax.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Also add subtle mouse-move parallax on hero
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', (e) => {
    if (!heroParallax) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroParallax.style.transform = `translate(${x}px, ${y + window.scrollY * 0.4}px)`;
});

// ===== Floating Particles =====
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

const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
        25% { transform: translate(30px, -40px) scale(1.2); opacity: 1; }
        50% { transform: translate(-20px, -20px) scale(0.8); opacity: 0.3; }
        75% { transform: translate(-30px, 15px) scale(1.1); opacity: 0.7; }
    }
`;
document.head.appendChild(style);
