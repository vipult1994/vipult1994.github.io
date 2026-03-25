document.addEventListener('DOMContentLoaded', function() {

    // ===== Theme Toggle =====
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = document.getElementById('themeIcon');
    var savedTheme = localStorage.getItem('theme') || 'dark';
    function setTheme(t) {
        document.documentElement.setAttribute('data-theme', t);
        if (themeIcon) themeIcon.className = t === 'light' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', t);
    }
    setTheme(savedTheme);
    if (themeToggle) themeToggle.addEventListener('click', function() {
        setTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    // ===== Slide Navigation =====
    var slides = document.querySelectorAll('.slide');
    var counter = document.getElementById('slideCounter');
    var dotsWrap = document.getElementById('pageDots');
    var current = 0;
    var total = slides.length;
    var animating = false;

    // Create dots
    for (var d = 0; d < total; d++) {
        var dot = document.createElement('button');
        dot.className = 'page-dot' + (d === 0 ? ' active' : '');
        dot.setAttribute('data-i', d);
        dot.addEventListener('click', function() { goTo(parseInt(this.getAttribute('data-i'))); });
        dotsWrap.appendChild(dot);
    }

    function goTo(idx) {
        if (animating || idx === current || idx < 0 || idx >= total) return;
        animating = true;
        slides[current].classList.remove('active');
        slides[current].classList.add('exit');
        setTimeout(function() { slides[current - (current > idx ? 0 : (idx - current))]; }, 0);
        var prev = current;
        current = idx;
        slides[current].classList.add('active');
        counter.textContent = (current + 1) + ' / ' + total;
        var dots = dotsWrap.querySelectorAll('.page-dot');
        dots[prev].classList.remove('active');
        dots[current].classList.add('active');
        setTimeout(function() { slides[prev].classList.remove('exit'); animating = false; }, 500);
        // Trigger skill bars on skills slide
        if (current === 2) animateSkills();
    }

    document.getElementById('slideNext').addEventListener('click', function() { goTo(current + 1 >= total ? 0 : current + 1); });
    document.getElementById('slidePrev').addEventListener('click', function() { goTo(current - 1 < 0 ? total - 1 : current - 1); });

    // Keyboard nav
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1 >= total ? 0 : current + 1);
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(current - 1 < 0 ? total - 1 : current - 1);
    });

    // ===== Typing Animation =====
    var typingEl = document.getElementById('typingText');
    if (typingEl) {
        var phrases = [
            'Sr. Solutions Architect — Agentic AI | FinOps COE',
            'Blue Prism MVP x5 | UiPath Certified',
            'Enterprise Automation Leader',
            'Professional Speaker & Mentor',
            'AWS | RPA | Python | AI'
        ];
        var pi = 0, ci = 0, del = false;
        var cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        typingEl.appendChild(cursor);
        function type() {
            var p = phrases[pi];
            if (!del) {
                typingEl.textContent = p.substring(0, ci + 1);
                typingEl.appendChild(cursor);
                ci++;
                if (ci === p.length) { del = true; setTimeout(type, 2000); return; }
                setTimeout(type, 45 + Math.random() * 25);
            } else {
                typingEl.textContent = p.substring(0, ci - 1);
                typingEl.appendChild(cursor);
                ci--;
                if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; setTimeout(type, 400); return; }
                setTimeout(type, 20);
            }
        }
        type();
    }

    // ===== Skill Bars =====
    var skillsDone = false;
    function animateSkills() {
        if (skillsDone) return;
        document.querySelectorAll('.skill-fill').forEach(function(b) { b.style.width = b.getAttribute('data-level') + '%'; });
        skillsDone = true;
    }

    // ===== Testimonials 2-Card Slider =====
    var tTrack = document.getElementById('testiTrack');
    var tPrev = document.getElementById('testiPrev');
    var tNext = document.getElementById('testiNext');
    if (tTrack && tPrev && tNext) {
        var tCards = tTrack.querySelectorAll('.testi-card');
        var tPos = 0;
        var gap = 16;

        function getVisible() { return window.innerWidth <= 768 ? 1 : 2; }

        function updateTesti() {
            var vis = getVisible();
            var maxP = Math.max(0, tCards.length - vis);
            if (tPos > maxP) tPos = maxP;
            var vw = tTrack.parentElement.offsetWidth;
            var cardW = (vw - gap * (vis - 1)) / vis;
            tTrack.style.transform = 'translateX(-' + (tPos * (cardW + gap)) + 'px)';
        }

        tNext.addEventListener('click', function() {
            var vis = getVisible();
            var maxP = Math.max(0, tCards.length - vis);
            tPos = tPos >= maxP ? 0 : tPos + 1;
            updateTesti();
        });
        tPrev.addEventListener('click', function() {
            var vis = getVisible();
            var maxP = Math.max(0, tCards.length - vis);
            tPos = tPos <= 0 ? maxP : tPos - 1;
            updateTesti();
        });

        window.addEventListener('resize', updateTesti);
        updateTesti();

        // Auto-slide
        var tAuto = setInterval(function() {
            var vis = getVisible();
            var maxP = Math.max(0, tCards.length - vis);
            tPos = tPos >= maxP ? 0 : tPos + 1;
            updateTesti();
        }, 5000);
        tNext.addEventListener('click', function() { clearInterval(tAuto); });
        tPrev.addEventListener('click', function() { clearInterval(tAuto); });
    }

    // ===== Particles =====
    var pc = document.getElementById('particles');
    if (pc) {
        for (var i = 0; i < 20; i++) {
            var p = document.createElement('div');
            var s = Math.random() * 3 + 1;
            p.style.cssText = 'position:absolute;width:'+s+'px;height:'+s+'px;background:rgba(99,102,241,'+(Math.random()*0.3+0.1)+');border-radius:50%;left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;animation:float '+(Math.random()*10+10)+'s ease-in-out infinite;animation-delay:-'+(Math.random()*10)+'s';
            pc.appendChild(p);
        }
    }
    var fs = document.createElement('style');
    fs.textContent = '@keyframes float{0%,100%{transform:translate(0,0) scale(1);opacity:.5}25%{transform:translate(30px,-40px) scale(1.2);opacity:1}50%{transform:translate(-20px,-20px) scale(.8);opacity:.3}75%{transform:translate(-30px,15px) scale(1.1);opacity:.7}}';
    document.head.appendChild(fs);

}); // end DOMContentLoaded
