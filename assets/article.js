// ===== 路由器技巧站 — 文章页增强 =====
(function () {
  'use strict';

  // 目录高亮（滚动监听）
  const tocLinks = document.querySelectorAll('.article-toc__item a');
  const headings = document.querySelectorAll('.article-body h2[id], .article-body h3[id]');

  if (tocLinks.length && headings.length) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function(link) {
            link.classList.remove('article-toc__link--active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('article-toc__link--active');
            }
          });
        }
      });
    }, { rootMargin: '-80px 0px -60% 0px' });

    headings.forEach(function(h) { observer.observe(h); });
  }
})();
