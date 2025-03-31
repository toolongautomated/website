document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const seriesButtons = document.querySelector('.series-buttons');
    const articleCards = document.querySelectorAll('.article-card');
    const articleList = document.querySelector('.article-list');

    // Sort articles by date (newest first)
    function sortArticles(cards) {
        return Array.from(cards).sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateB - dateA;
        });
    }

    // Initial sort
    let sortedCards = sortArticles(articleCards);
    sortedCards.forEach(card => articleList.appendChild(card));

    // Check for URL parameters for filtering
    function checkUrlFilter() {
        const urlParams = new URLSearchParams(window.location.search);
        const filterParam = urlParams.get('filter');

        if (filterParam) {
            const matchingButton = document.querySelector(`.filter-btn[data-filter="${filterParam}"]`);
            if (matchingButton) {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to this button
                matchingButton.classList.add('active');

                // Apply the filter
                filterArticles(filterParam);

                // Show series buttons if needed
                if (filterParam === 'series') {
                    seriesButtons.classList.add('visible');
                }
            }
        }
    }

    // Apply URL filter on page load
    checkUrlFilter();

    // Filter articles based on category and optional series
    function filterArticles(filter, seriesName = null) {
        let visibleCount = 0;

        articleCards.forEach(card => {
            let isVisible = false;

            if (filter === 'all') {
                isVisible = true;
            } else if (filter === 'series' && seriesName) {
                isVisible = card.dataset.series === seriesName;
            } else {
                isVisible = card.dataset.category === filter;
            }

            if (isVisible) {
                visibleCount++;
            }
            card.classList.toggle('hidden', !isVisible);
        });
    }

    // Filter buttons functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Toggle series buttons visibility
            if (filter === 'series') {
                seriesButtons.classList.add('visible');
                // Hide all articles until specific series is selected
                articleCards.forEach(card => {
                    card.classList.add('hidden');
                });
            } else {
                seriesButtons.classList.remove('visible');
                document.querySelectorAll('.series-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                filterArticles(filter);
            }
        });
    });

    // Series buttons functionality
    document.querySelectorAll('.series-btn').forEach(button => {
        button.addEventListener('click', function() {
            const seriesName = this.dataset.series;

            // Update active states
            document.querySelectorAll('.series-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');

            // Filter articles by the selected series
            filterArticles('series', seriesName);
        });
    });
});