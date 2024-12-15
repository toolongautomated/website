// Theme handling
const root = document.documentElement;
const toggle = document.querySelector('.tdnn');
const moon = document.querySelector('.moon');

// Function to update theme-specific stylesheets
const updateThemeStylesheets = (theme) => {
    document.querySelectorAll('.theme-specific').forEach(stylesheet => {
        stylesheet.disabled = stylesheet.dataset.theme !== theme;
    });
};

// Check localStorage first, then system preference
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial state based on localStorage or system preference
if (storedTheme) {
    root.setAttribute('data-theme', storedTheme);
    updateThemeStylesheets(storedTheme);
    if (storedTheme === 'light') {
        toggle.classList.add('day');
        moon.classList.add('sun');
    }
} else if (prefersDark) {
    root.setAttribute('data-theme', 'dark');
    updateThemeStylesheets('dark');
    toggle.classList.remove('day');
    moon.classList.remove('sun');
} else {
    root.setAttribute('data-theme', 'light');
    updateThemeStylesheets('light');
    toggle.classList.add('day');
    moon.classList.add('sun');
}

// Theme toggle listener
toggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', newTheme);
    updateThemeStylesheets(newTheme);
    toggle.classList.toggle('day');
    moon.classList.toggle('sun');

    // Store preference
    localStorage.setItem('theme', newTheme);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        root.setAttribute('data-theme', newTheme);
        updateThemeStylesheets(newTheme);
        toggle.classList.toggle('day', !e.matches);
        moon.classList.toggle('sun', !e.matches);
    }
});
