import { useEffect, useState } from "react";
import { OFFER_DURATION_MS, OFFER_STORAGE_KEY, resolveOfferEnd, splitRemaining } from "@/lib/countdown";

export function useOfferCountdown() {
  const [remaining, setRemaining] = useState(OFFER_DURATION_MS);

  useEffect(() => {
    let end = resolveOfferEnd(window.localStorage.getItem(OFFER_STORAGE_KEY), Date.now());
    window.localStorage.setItem(OFFER_STORAGE_KEY, String(end));
    const tick = () => {
      const now = Date.now();
      if (now >= end) {
        end = resolveOfferEnd(null, now);
        window.localStorage.setItem(OFFER_STORAGE_KEY, String(end));
      }
      setRemaining(end - now);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return splitRemaining(remaining);
}

export function CountdownDigits({ size = "md" }: { size?: "sm" | "md" }) {
  const { h, m, s } = useOfferCountdown();
  const box =
    size === "sm"
      ? "min-w-9 rounded-md px-1.5 py-1 text-base"
      : "min-w-14 rounded-xl px-2 py-2 text-2xl sm:text-3xl";
  const parts: [string, string][] = [
    [h, "horas"],
    [m, "min"],
    [s, "seg"],
  ];
  return (
    <div className="flex items-center gap-1.5" role="timer" aria-label={`Quedan ${h}:${m}:${s}`}>
      {parts.map(([value, label], i) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className="flex flex-col items-center">
            <span className={`${box} bg-gold text-center font-display font-bold tabular-nums text-gold-foreground`}>
              {value}
            </span>
            {size === "md" && <span className="mt-1 text-[11px] uppercase tracking-wide opacity-80">{label}</span>}
          </div>
          {i < 2 && <span className="font-display text-xl font-bold opacity-70">:</span>}
        </div>
      ))}
    </div>
  );
}
