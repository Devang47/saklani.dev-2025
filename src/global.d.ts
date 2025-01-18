// global.d.ts
interface Window {
  posthog: {
    capture: (event: string, properties?: Record<string, any>) => void;
  };
}
