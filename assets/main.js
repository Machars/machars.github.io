// ===== 路由器技巧站 — 首页搜索/筛选 =====
(function () {
  'use strict';

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const brandFilter = document.getElementById('brandFilter');
  const categoryGrid = document.getElementById('categoryGrid');
  const tipsGrid = document.getElementById('tipsGrid');
  const tipsEmpty = document.getElementById('tipsEmpty');
  const resultInfo = document.getElementById('resultInfo');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav__links');

  let activeBrand = 'all';
  let activeCategory = 'all';
  let searchQuery = '';

  function filter() {
    const cards = tipsGrid.querySelectorAll('.tip-card');
    let count = 0;
    cards.forEach(card => {
      const b = card.dataset.brand;
      const c = card.dataset.category;
      const text = card.textContent.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchBrand = activeBrand === 'all' || b === activeBrand;
      const matchCategory = activeCategory === 'all' || c === activeCategory;
      const matchSearch = !q || text.includes(q);
      const visible = matchBrand && matchCategory && matchSearch;
      card.style.display = visible ? '' : 'none';
      if (visible) count++;
    });
    tipsEmpty.style.display = count === 0 ? '' : 'none';
    if (resultInfo) {
      const unit = document.documentElement.lang.startsWith('zh') ? '篇技巧' : 'tips';
      resultInfo.textContent = count === 0 ? (document.documentElement.lang.startsWith('zh') ? '没有找到匹配' : 'No results') : `共 ${count} ${unit}`;
    }
  }

  // 品牌筛选
  if (brandFilter) {
    brandFilter.addEventListener('click', function(e) {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;
      activeBrand = chip.dataset.brand;
      brandFilter.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('filter-chip--active'));
      chip.classList.add('filter-chip--active');
      filter();
    });
  }

  // 分类筛选
  if (categoryGrid) {
    categoryGrid.addEventListener('click', function(e) {
      const card = e.target.closest('.cat-card');
      if (!card) return;
      activeCategory = card.dataset.category;
      categoryGrid.querySelectorAll('.cat-card').forEach(c => c.classList.remove('cat-card--active'));
      card.classList.add('cat-card--active');
      filter();
    });
  }

  // 搜索
  if (searchInput) {
    let debounce;
    searchInput.addEventListener('input', function() {
      clearTimeout(debounce);
      debounce = setTimeout(function() {
        searchQuery = searchInput.value;
        filter();
      }, 300);
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      searchQuery = searchInput ? searchInput.value : '';
      filter();
    });
  }

  // 移动端菜单
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('nav__links--open');
    });
  }
})();
