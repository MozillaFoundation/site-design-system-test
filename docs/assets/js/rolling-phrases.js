const phraseList = document.querySelector('.phrase-list');
const phrases = Array.from(phraseList.children);
const root = phraseList.closest('.rolling-phrases');

// configuration variables
const CSS_VARS = {
  lineHeightMultiplier: '--line-height-multiplier',
  animationDuration: '--animation-duration-in-ms',
};

const FALLBACKS = {
  lineHeight: 1,
  animationDurationMs: 1000,
  pauseDurationMs: 3000,
};

// get CSS variable and parse as float with fallback
const getCssVarFloat = (varName, fallback) =>
  parseFloat(getComputedStyle(root).getPropertyValue(varName)) || fallback;

const lineHeightMultiplier = getCssVarFloat(
  CSS_VARS.lineHeightMultiplier,
  FALLBACKS.lineHeight
);

const transitionDurationMs = getCssVarFloat(
  CSS_VARS.animationDuration,
  FALLBACKS.animationDurationMs
);

const pauseDurationMs = FALLBACKS.pauseDurationMs;

// duplicate phrases for seamless looping
phrases.forEach(phrase => {
  const clone = phrase.cloneNode(true);
  phraseList.appendChild(clone);
});

let index = 0;

function rollLoop() {
  index += 1;
  const total = phrases.length;

  // animate scroll
  phraseList.style.transition = `transform ${transitionDurationMs}ms ease-in-out`;
  phraseList.style.transform = `translateY(-${index * lineHeightMultiplier}em)`;

  // after transition ends
  setTimeout(() => {
    if (index >= total) {
      // instantly jump back to start
      phraseList.style.transition = 'none';
      phraseList.style.transform = 'translateY(0)';
      index = 0;
    }
  }, transitionDurationMs + 100); // buffer to ensure animation is done

  setTimeout(rollLoop, pauseDurationMs); // schedule next scroll
}

// initial delay
setTimeout(rollLoop, pauseDurationMs);
