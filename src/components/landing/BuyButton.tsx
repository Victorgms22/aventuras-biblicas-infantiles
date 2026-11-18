import { Button } from "@/components/ui/button";
import { openCheckout, type Pack } from "@/lib/packs";

export function BuyButton({
  pack,
  label = "¡Quiero este pack!",
  variant = "cta",
  pulse = false,
}: {
  pack: Pack;
  label?: string;
  variant?: "cta" | "gold";
  pulse?: boolean;
}) {
  return (
    <Button asChild variant={variant} size="xl" className={pulse ? "animate-pulse-cta" : undefined}>
      <a
        href={pack.checkoutUrl}
        data-pack={pack.id}
        onClick={(e) => {
          e.preventDefault();
          openCheckout(pack.checkoutUrl);
        }}
      >
        {label}
      </a>
    </Button>
  );
}
