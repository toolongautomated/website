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
