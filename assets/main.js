// ===== 路由器技巧站 — 首页搜索/筛选 =====
(function () {
  'use strict';

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const categorySidebar = document.getElementById('categorySidebar');
  const tipsGrid = document.getElementById('tipsGrid');
  const tipsEmpty = document.getElementById('tipsEmpty');
  const resultInfo = document.getElementById('resultInfo');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav__links');

  let activeCategory = 'all';
  let searchQuery = '';

  function filter() {
    const cards = tipsGrid.querySelectorAll('.tip-card');
    let count = 0;
    cards.forEach(card => {
      const c = card.dataset.category;
      const text = card.textContent.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchCategory = activeCategory === 'all' || c === activeCategory;
      const matchSearch = !q || text.includes(q);
      const visible = matchCategory && matchSearch;
      card.style.display = visible ? '' : 'none';
      if (visible) count++;
    });
    tipsEmpty.style.display = count === 0 ? '' : 'none';
    if (resultInfo) {
      const unit = document.documentElement.lang.startsWith('zh') ? '篇技巧' : 'tips';
      resultInfo.textContent = count === 0 ? (document.documentElement.lang.startsWith('zh') ? '没有找到匹配' : 'No results') : `共 ${count} ${unit}`;
    }
  }

  // 分类侧边栏筛选
  if (categorySidebar) {
    categorySidebar.addEventListener('click', function(e) {
      const item = e.target.closest('.sidebar__item');
      if (!item) return;
      activeCategory = item.dataset.category;
      categorySidebar.querySelectorAll('.sidebar__item').forEach(el => el.classList.remove('sidebar__item--active'));
      item.classList.add('sidebar__item--active');
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
