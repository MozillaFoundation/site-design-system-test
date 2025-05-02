// Function to convert px to rem
function pxToRem(pxValue) {
  return (parseFloat(pxValue) / 16).toFixed(3); // Convert px to rem with 3 decimal precision
}

// Select elements with specific class names
const elements = document.querySelectorAll(
  '.text-item, .header-title, .section-title, .heading-item, .body-text-item, .pull-quote-item, .label-item, .quote-large, .quote', '.figma-label-large', '.figma-label'
);

elements.forEach(element => {
  element.addEventListener('mouseenter', function () {
    // Create a tooltip element
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);

    // Get the computed styles of the hovered element
    const computedStyle = getComputedStyle(element);

    // Generate a string of CSS properties to display
    const content =
      `${element.textContent.trim()}
      / / / / / / / /
      font-family: ${computedStyle.fontFamily};
      font-size: ${computedStyle.fontSize} (=${pxToRem(computedStyle.fontSize)}rem);
      line-height: ${computedStyle.lineHeight} (=${pxToRem(computedStyle.lineHeight)}rem);
      font-weight: ${computedStyle.fontWeight};
      font-style: ${computedStyle.fontStyle};
    `;

    tooltip.innerText = content;

    // Position the tooltip near the hovered element
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
  });

  element.addEventListener('mouseleave', function () {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  });
});
