class HeroAccordion {
  constructor(containerSelector = ".hero-accordion") {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.panels = this.container.querySelectorAll(".panel");
    this.setCssVariables();
    this.bindEvents();
  }

  getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }


  setCssVariables() {
    const panelCount = this.panels.length;
    const styles = getComputedStyle(this.container);
    const gapSize = styles.getPropertyValue("--gap-size").trim() || "0px";
    if (!gapSize.endsWith("px")) {
      console.warn("Expected the CSS variable --gap-size in px, but got:", gapSize);
    }
    const gapValue = parseFloat(gapSize) || 0
    const totalGap = gapValue * (panelCount - 1);
    const scrollbarWidth = this.getScrollbarWidth();

    this.container.style.setProperty("--panel-count", panelCount);
    this.container.style.setProperty("--total-gap", `${totalGap}px`);
    this.container.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
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
