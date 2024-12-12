document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('zoom-overlay');
    const zoomedContainer = document.createElement('div');
    zoomedContainer.className = 'zoomed-container';
    const zoomedImg = document.createElement('img');
    zoomedImg.className = 'zoomed-image';
    const zoomedCaption = document.createElement('figcaption');
    zoomedCaption.className = 'zoomed-caption';

    zoomedContainer.appendChild(zoomedImg);
    zoomedContainer.appendChild(zoomedCaption);
    overlay.appendChild(zoomedContainer);

    document.querySelectorAll('.zoomable').forEach(img => {
        img.addEventListener('click', () => {
            zoomedImg.src = img.src;
            zoomedCaption.textContent = img.closest('figure').querySelector('figcaption').textContent;
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});
