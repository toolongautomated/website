document.addEventListener('click', function(event) {
    const modal = document.getElementById('gif-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('gif-modal');
    if (event.key === 'Escape') {
        modal.style.display = 'none';
    }
});

// Handle table scroll shadows
function checkTableScroll(container) {
    const wrapper = container.closest('.article-table-wrapper');
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) { // -1 for rounding errors
        wrapper.classList.add('scrolled-end');
    } else {
        wrapper.classList.remove('scrolled-end');
    }
}

document.querySelectorAll('.article-table-scroll').forEach(container => {
    // Check on load
    checkTableScroll(container);

    // Check on scroll
    container.addEventListener('scroll', () => checkTableScroll(container));

    // Check on window resize
    window.addEventListener('resize', () => checkTableScroll(container));
});
