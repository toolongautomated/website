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

// Category badge click handler
document.addEventListener('DOMContentLoaded', function() {
    const categoryBadges = document.querySelectorAll('.category-badge');

    categoryBadges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            window.location.href = 'archive.html?filter=' + category;
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ... existing theme toggle code ...

    // Add heading links
    const mainContent = document.querySelector('main');
    if (mainContent) {
        // Select h2 through h6, excluding h1
        const headings = mainContent.querySelectorAll('h2, h3, h4, h5, h6');

        headings.forEach((heading, index) => {
            // Generate ID if it doesn't exist
            let id = heading.id;
            if (!id) {
                id = heading.textContent.trim().toLowerCase()
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
                    .replace(/[^\w-]+/g, '') // Remove non-word chars except hyphens
                    .replace(/--+/g, '-'); // Replace multiple hyphens with single
                // Ensure uniqueness if multiple headings generate the same ID
                const existingElement = document.getElementById(id);
                if (existingElement && existingElement !== heading) {
                    id = `${id}-${index}`;
                }
                heading.id = id;
            }

            // Create link icon
            const linkIcon = document.createElement('span');
            linkIcon.className = 'heading-link-icon';
            linkIcon.textContent = '🔗';
            linkIcon.setAttribute('role', 'button');
            linkIcon.setAttribute('aria-label', 'Copy link to this section');
            linkIcon.setAttribute('title', 'Copy link'); // Tooltip

            // Append icon to heading
            // heading.style.position = 'relative'; // No longer needed
            heading.appendChild(linkIcon);

            // Add click listener to copy link
            linkIcon.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent potential navigation if it were an <a>
                event.stopPropagation(); // Prevent triggering other listeners on heading

                const url = `${window.location.origin}${window.location.pathname}#${id}`;
                navigator.clipboard.writeText(url).then(() => {
                    // Optional: Provide feedback e.g., change icon or tooltip
                    linkIcon.textContent = '✅';
                    linkIcon.setAttribute('title', 'Link copied!');
                    setTimeout(() => {
                        linkIcon.textContent = '🔗';
                        linkIcon.setAttribute('title', 'Copy link');
                    }, 1500); // Reset after 1.5 seconds
                }).catch(err => {
                    console.error('Failed to copy link: ', err);
                    // Optional: Provide error feedback
                    linkIcon.setAttribute('title', 'Failed to copy');
                     setTimeout(() => {
                        linkIcon.setAttribute('title', 'Copy link');
                    }, 1500);
                });
            });
        });
    }

});
