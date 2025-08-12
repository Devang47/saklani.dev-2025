import { animate } from "motion";

function randChar(): string {
  const c: string = "ABCDEFZabcxyz0123456789!@#$%^&*()_+=-{}[]|:;\"'<>,.?/`~";
  const char: string = c[Math.floor(Math.random() * c.length)];
  return Math.random() > 0.5 ? char : char.toUpperCase();
}

export function scrambleAndReveal(element: HTMLElement): void {
  const isBot =
    /bot|crawler|spider|crawling/i.test(navigator.userAgent) ||
    navigator.webdriver ||
    window.navigator.webdriver ||
    (window as any).phantom ||
    (window as any).callPhantom;
  if (isBot) return;

  const originalText: string = element.innerHTML.trim();
  const originalChars: string[] = originalText.split("");
  const scrambledChars: string[] = originalChars.map(() => randChar());

  element.innerHTML = scrambledChars.join("");

  let lastUpdateTime = 0;
  const updateInterval = 50;

  animate(
    { progress: 0 },
    {
      progress: 1,
    },
    {
      duration: 1,
      ease: "linear",
      onUpdate: (progress: number) => {
        console.log(progress);
        const currentTime = Date.now();
        const revealedCount = Math.floor(progress * originalChars.length);

        if (currentTime - lastUpdateTime > updateInterval) {
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
          lastUpdateTime = currentTime;
        }
      },
    }
  );
}
