// JavaScript to toggle the underlay visibility
document.getElementById('toggleUnderlayBtn')?.addEventListener('click', function() {
    const underlay = document.querySelector('.grid-container-underlay');
    underlay.classList.toggle('hidden');
});
