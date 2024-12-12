// Theme handling
const themeToggles = document.querySelectorAll('.theme-toggle');
const root = document.documentElement;

// Check for saved theme or system preference
const savedTheme = localStorage.getItem('theme') || 'system';
setTheme(savedTheme);

// Theme toggle listeners
themeToggles.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        setTheme(theme);
        localStorage.setItem('theme', theme);
    });
});

// Theme setting function
function setTheme(theme) {
    themeToggles.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });

    let effectiveTheme = theme;
    if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    root.setAttribute('data-theme', effectiveTheme);

    // Handle highlight.js themes
    document.querySelectorAll('.theme-specific').forEach(stylesheet => {
        stylesheet.disabled = stylesheet.getAttribute('data-theme') !== effectiveTheme;
    });
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') {
        setTheme('system');
    }
});
