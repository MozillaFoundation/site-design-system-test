class HeroAccordion {
  constructor(containerSelector = ".hero-accordion") {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.panels = this.container.querySelectorAll(".panel");
    this.bindEvents();
  }

  collapseAllPanels() {
    this.panels.forEach(panel => {
      panel.setAttribute("aria-selected", "false");
    });
  }

  expandPanel(panel) {
    panel.setAttribute("aria-selected", "true");
  }

  handlePanelClick(event) {
    const panel = event.currentTarget;
    this.collapseAllPanels();
    this.expandPanel(panel);
  }

  bindEvents() {
    this.panels.forEach(panel => {
      // panel.addEventListener("click", this.handlePanelClick.bind(this));
      panel.addEventListener("mouseenter", this.handlePanelClick.bind(this));
      panel.addEventListener("mouseleave", this.handlePanelClick.bind(this));
    });
  }
}

new HeroAccordion();
