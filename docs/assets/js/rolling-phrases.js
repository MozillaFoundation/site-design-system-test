const CSS_VARS = {
  lineHeightMultiplier: '--line-height-multiplier',
  animationDuration: '--animation-duration-in-ms',
};

const FALLBACKS = {
  lineHeight: 1,
  animationDurationMs: 1000,
  pauseDurationMs: 3000,
};

const getCssVarFloat = (element, varName, fallback) => {
  const value = parseFloat(getComputedStyle(element).getPropertyValue(varName));
  if (isNaN(value)) {
    console.warn(`CSS variable ${varName} is missing or invalid. Using fallback: ${fallback}`);
    return fallback;
  }
  return value;
};

export function initRollingPhrases(phraseList) {
  const phrases = Array.from(phraseList.children);
  const root = phraseList.closest('.rolling-phrases');
  if (!root) return;

  const lineHeightMultiplier = getCssVarFloat(
    root,
    CSS_VARS.lineHeightMultiplier,
    FALLBACKS.lineHeight
  );

  const transitionDurationMs = getCssVarFloat(
    root,
    CSS_VARS.animationDuration,
    FALLBACKS.animationDurationMs
  );

  const pauseDurationMs = FALLBACKS.pauseDurationMs;

  phrases.forEach(phrase => {
    const clone = phrase.cloneNode(true);
    phraseList.appendChild(clone);
  });

  const total = phrases.length;
  let index = 0;

  function updateWrapperWidth(phrase) {
    const phraseWrapper = phrase.closest(".phrase-wrapper");
    if (!phraseWrapper) return;

    phraseWrapper.style.width = "auto";
    const width = phrase.offsetWidth;
    phraseWrapper.style.width = `${width}px`;
  }

  function rollLoop() {
    index += 1;

    phraseList.style.transition = `transform ${transitionDurationMs}ms ease-in-out`;
    phraseList.style.transform = `translateY(-${index * lineHeightMultiplier}em)`;

    if (root.dataset.styleType === "3") {
      const visiblePhraseIndex = index % phrases.length;
      updateWrapperWidth(phrases[visiblePhraseIndex]);
    }

    setTimeout(() => {
      if (index >= total) {
        phraseList.style.transition = 'none';
        phraseList.style.transform = 'translateY(0)';
        index = 0;
      }

      setTimeout(rollLoop, pauseDurationMs);
    }, transitionDurationMs + 100);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setTimeout(rollLoop, pauseDurationMs);
  }
}

export function initAllRollingPhrases() {
  document.querySelectorAll('.phrase-list').forEach(initRollingPhrases);
}
