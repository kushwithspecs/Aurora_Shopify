/* ─── Catalogue — Filter / Sort / Search / Load More / URL Params ─── */
(function () {
  const PAGE_SIZE = 9;

  // State
  let activeFilter = 'all';
  let activeSort   = 'featured';
  let searchQuery  = '';
  let shownCount   = PAGE_SIZE;

  // DOM
  const grid         = document.getElementById('catalogueGrid');
  if (!grid) return;
  const allCards     = Array.from(grid.querySelectorAll('.product-card'));
  const countEl      = document.getElementById('productCount');
  const shownEl      = document.getElementById('shownCount');
  const totalEl      = document.getElementById('totalCount');
  const emptyState   = document.getElementById('catEmpty');
  const loadMoreBtn  = document.getElementById('loadMoreBtn');
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const searchInput  = document.getElementById('catalogueSearch');
  const sortSel      = document.getElementById('catalogueSort');

  // Original index (for "featured" sort = original order)
  allCards.forEach((c, i) => c.dataset.originalIndex = i);

  function getVisible() {
    return allCards.filter(card => {
      const matchCat    = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchSearch = card.dataset.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  function sortCards(cards) {
    const sorted = [...cards];
    if (activeSort === 'price-asc')  sorted.sort((a, b) => +a.dataset.price - +b.dataset.price);
    else if (activeSort === 'price-desc') sorted.sort((a, b) => +b.dataset.price - +a.dataset.price);
    else if (activeSort === 'newest')     sorted.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
    else                                  sorted.sort((a, b) => +a.dataset.originalIndex - +b.dataset.originalIndex);
    return sorted;
  }

  function render() {
    const visible = sortCards(getVisible());
    const total = visible.length;

    // Hide everything, reset reveal
    allCards.forEach(c => {
      c.style.display = 'none';
      c.classList.remove('is-visible');
    });

    // Reorder in DOM (so flexbox order matches sort)
    visible.forEach(c => grid.appendChild(c));

    // Show up to shownCount
    const toShow = visible.slice(0, shownCount);
    toShow.forEach((card, i) => {
      card.style.display = 'block';
      setTimeout(() => card.classList.add('is-visible'), 60 + i * 60);
    });

    // Counts
    if (countEl) countEl.textContent = total;
    if (shownEl) shownEl.textContent = Math.min(shownCount, total);
    if (totalEl) totalEl.textContent = total;

    // Empty + Load More
    emptyState.classList.toggle('is-shown', total === 0);
    loadMoreWrap.classList.toggle('is-hidden', shownCount >= total || total === 0);
  }

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFilter = btn.dataset.filter;
      shownCount = PAGE_SIZE;
      render();
    });
  });

  // Sort
  if (sortSel) sortSel.addEventListener('change', e => {
    activeSort = e.target.value;
    render();
  });

  // Search
  if (searchInput) searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    shownCount = PAGE_SIZE;
    render();
  });

  // Load more
  if (loadMoreBtn) loadMoreBtn.addEventListener('click', () => {
    shownCount += PAGE_SIZE;
    render();
  });

  // View toggle
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      grid.classList.toggle('view-2col', btn.dataset.view === '2');
    });
  });

  // Reset (empty state)
  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) resetBtn.addEventListener('click', () => {
    activeFilter = 'all';
    searchQuery  = '';
    shownCount   = PAGE_SIZE;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add('is-active');
    if (searchInput) searchInput.value = '';
    render();
  });

  // URL param ?filter=rings
  const urlParams = new URLSearchParams(window.location.search);
  const f = urlParams.get('filter');
  if (f) {
    const btn = document.querySelector(`[data-filter="${f}"]`);
    if (btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFilter = f;
    }
  }

  render();
})();
