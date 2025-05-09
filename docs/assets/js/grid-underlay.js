document.getElementById('toggleUnderlayBtn')?.addEventListener('click', function() {
    document.querySelectorAll('.grid-container-underlay').forEach((underlay) => {
    underlay.classList.toggle('hidden');
  });
});
