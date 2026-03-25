var cur = 1, total = 7;
var landing = document.getElementById('landing');
var main = document.getElementById('resumeMain');
var nav = document.getElementById('topNav');
var pnav = document.getElementById('pageNav');
var prevB = document.getElementById('prevBtn');
var nextB = document.getElementById('nextBtn');
var pgNum = document.getElementById('pgNum');

// Landing click
document.getElementById('deskWrap').addEventListener('click', function() {
    landing.classList.add('fade-out');
    setTimeout(function() {
        landing.style.display = 'none';
        document.body.style.overflow = 'auto';
        main.classList.remove('hidden');
        main.classList.add('show');
        setTimeout(function() {
            nav.classList.add('show');
            pnav.classList.add('show');
            revealPage();
        }, 300);
    }, 900);
});

function revealPage() {
    var active = document.querySelector('.page.active');
    if (!active) return;
    var els = active.querySelectorAll('.reveal');
    for (var i = 0; i < els.length; i++) {
        (function(el, idx) {
            setTimeout(function() { el.classList.add('show'); }, 200 + idx * 300);
        })(els[i], i);
    }
    // Animate skill bars on page 3
    if (cur === 3) {
        setTimeout(function() {
            var fills = document.querySelectorAll('.sp-fill[data-w]');
            for (var j = 0; j < fills.length; j++) fills[j].style.width = fills[j].getAttribute('data-w') + '%';
        }, 600);
    }
}

function goTo(n) {
    if (n < 1 || n > total || n === cur) return;
    var old = document.querySelector('.page.active');
    if (old) {
        old.style.animation = 'slideOut .35s ease forwards';
        setTimeout(function() {
            old.classList.remove('active'); old.style.display = 'none'; old.style.animation = '';
            showP(n);
        }, 350);
    } else showP(n);
}

function showP(n) {
    cur = n;
    var p = document.querySelectorAll('.page')[n - 1];
    p.style.display = 'block'; p.classList.add('active');
    p.style.animation = 'slideIn .5s ease forwards';
    var els = p.querySelectorAll('.reveal');
    for (var i = 0; i < els.length; i++) {
        (function(el, idx) {
            el.classList.remove('show');
            setTimeout(function() { el.classList.add('show'); }, 150 + idx * 200);
        })(els[i], i);
    }
    updCtrl(); updNav(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Skill bars
    if (n === 3) {
        setTimeout(function() {
            var fills = document.querySelectorAll('.sp-fill[data-w]');
            for (var j = 0; j < fills.length; j++) fills[j].style.width = fills[j].getAttribute('data-w') + '%';
        }, 600);
    }
}

function updCtrl() {
    pgNum.textContent = cur + ' / ' + total;
    prevB.disabled = cur === 1;
    nextB.disabled = cur === total;
}

function updNav(n) {
    var links = document.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) links[i].classList.remove('active');
    for (var i = 0; i < links.length; i++) {
        if (parseInt(links[i].getAttribute('data-page')) === n) { links[i].classList.add('active'); break; }
    }
}

prevB.addEventListener('click', function() { goTo(cur - 1); });
nextB.addEventListener('click', function() { goTo(cur + 1); });

// Nav links
var navLinks = document.querySelectorAll('.nav-link');
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function(e) {
        e.preventDefault(); goTo(parseInt(this.getAttribute('data-page')));
    });
}

// Keyboard
document.addEventListener('keydown', function(e) {
    if (landing.style.display !== 'none') return;
    if (e.key === 'ArrowRight') goTo(cur + 1);
    if (e.key === 'ArrowLeft') goTo(cur - 1);
});

// Toggle experience
function toggle(head) {
    var body = head.nextElementSibling;
    var isOpen = body.classList.contains('open');
    var page = head.closest('.page');
    var allBodies = page.querySelectorAll('.tl-body.open');
    for (var i = 0; i < allBodies.length; i++) {
        allBodies[i].classList.remove('open');
        allBodies[i].previousElementSibling.classList.remove('open');
    }
    if (!isOpen) { body.classList.add('open'); head.classList.add('open'); }
}

updCtrl();
