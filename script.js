// This file is loaded in <head>, so the saved theme is applied
// before the page is drawn (no white flash in dark mode).

// 1. Saved theme. Light is the default.
function readTheme() {
    try {
        return localStorage.getItem('theme');
    } catch (err) {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem('theme', theme);
    } catch (err) {
        // Private windows can block storage. The switch still works, it just isn't remembered.
    }
}

if (readTheme() === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Everything below needs the page to exist first.
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const header = document.querySelector('header');
    const topBar = document.querySelector('.top-bar');
    const preloader = document.getElementById('preloader');

    // 2. Intro animation. Plays once per browser tab, then the page fades in.
    function showPage() {
        if (header) header.classList.add('loaded');
        if (topBar) topBar.classList.add('loaded');
    }

    let introSeen = false;
    try {
        introSeen = sessionStorage.getItem('intro-seen') === 'yes';
        sessionStorage.setItem('intro-seen', 'yes');
    } catch (err) {
        introSeen = false;
    }

    if (preloader && !introSeen) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(showPage, 400);
        }, 1800);
    } else {
        if (preloader) preloader.remove();
        setTimeout(showPage, 50);
    }

    // 3. Black/white switch.
    const themeBtn = document.getElementById('theme-toggle');
    const moonIcon = document.getElementById('icon-moon');
    const sunIcon = document.getElementById('icon-sun');

    function drawIcon() {
        const isDark = root.getAttribute('data-theme') === 'dark';
        if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'block';
        if (sunIcon) sunIcon.style.display = isDark ? 'block' : 'none';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            if (root.getAttribute('data-theme') === 'dark') {
                root.removeAttribute('data-theme');
                saveTheme('light');
            } else {
                root.setAttribute('data-theme', 'dark');
                saveTheme('dark');
            }
            drawIcon();
        });
    }
    drawIcon();

    // 4. Sections slide in as you scroll to them.
    function reveal() {
        document.querySelectorAll('.reveal').forEach((el) => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', reveal);
    reveal();

    // 5. Copy button on the terminal.
    document.querySelectorAll('.copy-btn').forEach((btn) => {
        btn.addEventListener('click', async () => {
            const code = document.getElementById(btn.dataset.copyTarget);
            if (!code) return;
            try {
                await navigator.clipboard.writeText(code.innerText);
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
            } catch (err) {
                btn.textContent = 'Select & copy';
            }
            setTimeout(() => {
                btn.textContent = 'Copy';
                btn.classList.remove('copied');
            }, 2000);
        });
    });

    // 6. This year in the footer.
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});
