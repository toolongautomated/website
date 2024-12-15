// Theme handling
const root = document.documentElement;
const toggle = document.querySelector('.tdnn');
const moon = document.querySelector('.moon');

// Check system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Set initial state based on system preference
if (prefersDark) {
    root.setAttribute('data-theme', 'dark');
    toggle.classList.remove('day');
    moon.classList.remove('sun');
} else {
    root.setAttribute('data-theme', 'light');
    toggle.classList.add('day');
    moon.classList.add('sun');
}

// Theme toggle listener
toggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', newTheme);
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
        toggle.classList.toggle('day', !e.matches);
        moon.classList.toggle('sun', !e.matches);
    }
});
