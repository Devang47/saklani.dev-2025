function randChar(): string {
  const c: string = "ABCDEFZabcxyz0123456789!@#$%^&*()_+=-{}[]|:;\"'<>,.?/`~";
  const char: string = c[Math.floor(Math.random() * c.length)];
  return Math.random() > 0.5 ? char : char.toUpperCase();
}

export function scrambleAndReveal(element: HTMLElement): void {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isBot =
    /bot|crawler|spider|crawling/i.test(navigator.userAgent) ||
    navigator.webdriver ||
    (window as any).phantom ||
    (window as any).callPhantom;

  // Never scramble for bots (keeps the real text in the DOM for crawlers) or
  // for users who prefer reduced motion.
  if (isBot || prefersReducedMotion) return;

  const originalText: string = element.innerHTML.trim();
  const originalChars: string[] = originalText.split("");
  const scrambledChars: string[] = originalChars.map(() => randChar());

  element.innerHTML = scrambledChars.join("");

  const duration = 1000; // total reveal time in ms
  const updateInterval = 50; // ms between scramble refreshes
  let start: number | null = null;
  let lastUpdateTime = 0;

  const tick = (now: number): void => {
    if (start === null) start = now;
    const progress = Math.min((now - start) / duration, 1);
    const revealedCount = Math.floor(progress * originalChars.length);

    if (now - lastUpdateTime > updateInterval || progress === 1) {
      let result = "";
      for (let i = 0; i < originalChars.length; i++) {
        if (i < revealedCount || progress >= 0.95) {
          result += originalChars[i];
        } else {
          scrambledChars[i] = randChar();
          result += scrambledChars[i];
        }
      }
      element.innerHTML = result;
      lastUpdateTime = now;
    }

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.innerHTML = originalChars.join("");
    }
  };

  requestAnimationFrame(tick);
}
