// Meta Pixel global (loaded by the base code in src/routes/__root.tsx).
interface Window {
  fbq?: (...args: unknown[]) => void;
}
