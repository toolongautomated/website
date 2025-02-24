document.addEventListener('DOMContentLoaded', function() {
    const articleCards = Array.from(document.querySelectorAll('.article-card'));
    const filterButtons = document.querySelectorAll('.filter-btn');
    const seriesBtn = document.getElementById('series-btn');
    const seriesButtons = document.querySelector('.series-buttons');
    const articleList = document.querySelector('.article-list');

    // Sort articles by date (newest first by default)
    function sortArticles(cards, oldestFirst = false) {
        return [...cards].sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return oldestFirst ? dateA - dateB : dateB - dateA;
        });
    }

    // Initial sort (newest first for default view)
    let sortedCards = sortArticles(articleCards);
    sortedCards.forEach(card => articleList.appendChild(card));

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

    // Filter articles based on selected filter
    function filterArticles(filter, seriesName = null) {
        let visibleCount = 0;
        let visibleCards = [];

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
                visibleCards.push(card);
                visibleCount++;
            }
            card.classList.toggle('hidden', !isVisible);
        });

        // Sort visible cards
        const oldestFirst = filter === 'series' && seriesName;
        const sortedVisible = sortArticles(visibleCards, oldestFirst);

        // Reorder visible cards
        sortedVisible.forEach(card => articleList.appendChild(card));

        // Check if we need to show "no results" message
        let noResultsMessage = document.querySelector('.no-results-message');

        if (visibleCount === 0) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.classList.add('no-results-message');
                noResultsMessage.textContent = 'No articles found matching this filter.';
                articleList.appendChild(noResultsMessage);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
});