document.addEventListener('DOMContentLoaded', function() {

    // ===== Theme Toggle (Dark/Light) =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        }
        localStorage.setItem('theme', theme);
    }
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // ===== Navbar scroll effect =====
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ===== Mobile menu toggle =====
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== Typing Animation =====
    var typingEl = document.getElementById('typingText');
    if (typingEl) {
        var phrases = [
            'Sr. Solutions Architect — Agentic AI | FinOps COE',
            'Blue Prism MVP x4 | UiPath Certified',
            'Enterprise Automation Leader',
            'Professional Speaker & Mentor',
            'AWS | RPA | Python | AI'
        ];
        var phraseIdx = 0, charIdx = 0, isDeleting = false;
        var cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        typingEl.appendChild(cursor);

        function typeWriter() {
            var current = phrases[phraseIdx];
            if (!isDeleting) {
                typingEl.textContent = current.substring(0, charIdx + 1);
                typingEl.appendChild(cursor);
                charIdx++;
                if (charIdx === current.length) {
                    isDeleting = true;
                    setTimeout(typeWriter, 2000);
                    return;
                }
                setTimeout(typeWriter, 50 + Math.random() * 30);
            } else {
                typingEl.textContent = current.substring(0, charIdx - 1);
                typingEl.appendChild(cursor);
                charIdx--;
                if (charIdx === 0) {
                    isDeleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                    setTimeout(typeWriter, 500);
                    return;
                }
                setTimeout(typeWriter, 25);
            }
        }
        typeWriter();
    }

    // ===== Skill Bar Animation =====
    var skillsDone = false;
    function animateSkills() {
        if (skillsDone) return;
        document.querySelectorAll('.skill-fill').forEach(function(bar) {
            var level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
        skillsDone = true;
    }

    // ===== Scroll-triggered Fade-in Animations =====
    var fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll(
        '.timeline-item, .award-card, .speaking-category, .edu-card, .cert-badge, .contact-card, .skill-card'
    ).forEach(function(el) {
        el.classList.add('fade-in');
        fadeObserver.observe(el);
    });

    // Skills observer
    var skillsSection = document.getElementById('skills');
    if (skillsSection) {
        var skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) animateSkills();
            });
        }, { threshold: 0.2 });
        skillsObserver.observe(skillsSection);
    }

    // ===== Parallax Effect =====
    var heroParallax = document.getElementById('heroParallax');
    if (heroParallax) {
        window.addEventListener('scroll', function() {
            var scrolled = window.scrollY;
            heroParallax.style.transform = 'translateY(' + (scrolled * 0.4) + 'px)';
        });

        var hero = document.getElementById('hero');
        if (hero) {
            hero.addEventListener('mousemove', function(e) {
                var x = (e.clientX / window.innerWidth - 0.5) * 20;
                var y = (e.clientY / window.innerHeight - 0.5) * 20;
                heroParallax.style.transform = 'translate(' + x + 'px, ' + (y + window.scrollY * 0.4) + 'px)';
            });
        }
    }

    // ===== Floating Particles =====
    var particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (var i = 0; i < 30; i++) {
            var particle = document.createElement('div');
            var size = Math.random() * 4 + 1;
            particle.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;background:rgba(99,102,241,' + (Math.random() * 0.3 + 0.1) + ');border-radius:50%;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;animation:float ' + (Math.random() * 10 + 10) + 's ease-in-out infinite;animation-delay:-' + (Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    var floatStyle = document.createElement('style');
    floatStyle.textContent = '@keyframes float{0%,100%{transform:translate(0,0) scale(1);opacity:.5}25%{transform:translate(30px,-40px) scale(1.2);opacity:1}50%{transform:translate(-20px,-20px) scale(.8);opacity:.3}75%{transform:translate(-30px,15px) scale(1.1);opacity:.7}}';
    document.head.appendChild(floatStyle);

}); // end DOMContentLoaded
