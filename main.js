/* ═══════════════════════════════════════════════
   VEDANT JADHAV — Portfolio JS
═══════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ── Terminal Overlay ── */
    const termBtn = document.getElementById('terminal-btn');
    const termBtnNav = document.getElementById('terminal-btn-nav');
    const overlay = document.getElementById('terminal-overlay');
    const closeBtn = document.getElementById('terminal-close');

    function openTerminal() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Typewriter effect
        runTerminalTypewriter();
    }
    function closeTerminal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (termBtn) termBtn.addEventListener('click', openTerminal);
    if (termBtnNav) termBtnNav.addEventListener('click', openTerminal);
    if (closeBtn) closeBtn.addEventListener('click', closeTerminal);
    overlay?.addEventListener('click', (e) => { if (e.target === overlay) closeTerminal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeTerminal(); });

    /* ── Terminal Typewriter ── */
    let typewriterRan = false;
    function runTerminalTypewriter() {
        if (typewriterRan) return;
        typewriterRan = true;

        const lines = document.querySelectorAll('.t-line[data-type]');
        let delay = 0;
        lines.forEach((line) => {
            const cmd = line.querySelector('.t-cmd');
            if (!cmd) return;
            const full = cmd.getAttribute('data-full') || '';
            cmd.textContent = '';
            const chars = full.split('');
            chars.forEach((ch) => {
                delay += 35;
                setTimeout(() => { cmd.textContent += ch; }, delay);
            });
            delay += 200;
        });
    }

    /* ── Nav mobile toggle ── */
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    menuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    /* ── Active nav link on scroll ── */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((a) => {
                        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));

    /* ── Smooth anchor scroll (close mobile menu on click) ── */
    navItems.forEach((a) => {
        a.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    /* ── Hero typewriter ── */
    const heroTypeEl = document.getElementById('hero-type');
    if (heroTypeEl) {
        const words = ['Building secure systems.', 'Breaking weak ones.', 'Learn. Break. Adapt.'];
        let wi = 0, ci = 0, deleting = false;
        function heroType() {
            const word = words[wi];
            if (!deleting) {
                heroTypeEl.textContent = word.slice(0, ++ci);
                if (ci === word.length) {
                    deleting = true;
                    setTimeout(heroType, 1800);
                    return;
                }
            } else {
                heroTypeEl.textContent = word.slice(0, --ci);
                if (ci === 0) {
                    deleting = false;
                    wi = (wi + 1) % words.length;
                }
            }
            setTimeout(heroType, deleting ? 45 : 80);
        }
        heroType();
    }

    /* ── Scroll-reveal (Intersection Observer) ── */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    revealObs.unobserve(e.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    revealEls.forEach((el) => revealObs.observe(el));

})();
