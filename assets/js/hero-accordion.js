document.querySelectorAll('.hero-accordion .panel').forEach(panel => {
  panel.addEventListener('click', () => {
    document.querySelectorAll('.hero-accordion .panel').forEach(p => {
      p.classList.remove('is-expanded');
      p.setAttribute('aria-selected', 'false');
    });

    panel.classList.add('is-expanded');
    panel.setAttribute('aria-selected', 'true');
  });
});
