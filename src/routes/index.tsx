import { createFileRoute } from "@tanstack/react-router";
import { Check, Download, Heart, ShieldCheck, Sparkles, Star } from "lucide-react";

import heroImg from "@/assets/hero-libros.jpg";
import basicoImg from "@/assets/pack-basico.jpg";
import familiarImg from "@/assets/pack-familiar.jpg";
import megaImg from "@/assets/pack-mega.jpg";
import { BuyButton } from "@/components/landing/BuyButton";
import { CountdownDigits } from "@/components/landing/OfferCountdown";
import { formatUSD, getPack, type Pack } from "@/lib/packs";

const TITLE = "Libros Bíblicos Infantiles – Mega Pack a $14.99 USD";
const DESCRIPTION =
  "Historias bíblicas ilustradas para niños en español. Mega Pack con 9 materiales de $39.99 por solo $14.99 USD por tiempo limitado.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const basico = getPack("basico");
const familiar = getPack("familiar");
const mega = getPack("mega");

const PACK_DETAILS: Record<Pack["id"], { image: string; tagline: string; items: string[] }> = {
  basico: {
    image: basicoImg,
    tagline: "Ideal para empezar",
    items: ["5 libros de aventuras bíblicas", "Ilustraciones a todo color", "Formato digital para imprimir"],
  },
  familiar: {
    image: familiarImg,
    tagline: "Para compartir en familia",
    items: [
      "7 colecciones bíblicas infantiles",
      "Historias del Antiguo y Nuevo Testamento",
      "Formato digital para imprimir",
    ],
  },
  mega: {
    image: megaImg,
    tagline: "El más completo",
    items: [
      "9 materiales bíblicos infantiles",
      "Libros de historias, para colorear y actividades",
      "Formato digital para imprimir",
      "Acceso inmediato después de la compra",
    ],
  },
};

function OfferBar() {
  return (
    <div className="sticky top-0 z-50 bg-urgency text-urgency-foreground shadow-soft">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-center sm:flex-row sm:text-left">
        <div className="leading-tight">
          <p className="font-display text-base font-semibold sm:text-lg">⭐ Oferta especial por tiempo limitado</p>
          <p className="text-sm opacity-90">
            Aprovechá el Mega Pack a <strong className="text-gold">$14.99 USD</strong> antes de que termine esta
            promoción <span className="line-through opacity-70">$39.99</span>
          </p>
        </div>
        <CountdownDigits size="sm" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-hero">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground">
            <Sparkles className="size-4" /> Para niños de 3 a 10 años
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            Historias bíblicas que tus hijos van a <span className="text-primary">amar</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Libros ilustrados en español para enseñar la Palabra de Dios de forma divertida, en casa o en la iglesia.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuyButton pack={mega} label="Quiero el Mega Pack a $14.99" pulse />
            <a href="#packs" className="text-center font-semibold text-primary underline-offset-4 hover:underline">
              Ver todos los packs
            </a>
          </div>
          <div className="mt-6 flex items-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-current" />
            ))}
            <span className="ml-2 text-sm font-semibold text-muted-foreground">Amado por familias cristianas</span>
          </div>
        </div>
        <img
          src={heroImg}
          alt="Libro bíblico infantil abierto con el arca de Noé y un arcoíris"
          width={1280}
          height={960}
          className="w-full rounded-3xl shadow-featured"
        />
      </div>
    </section>
  );
}

const BENEFITS = [
  { icon: Heart, title: "Valores para toda la vida", text: "Fe, amor, obediencia y valentía a través de historias reales de la Biblia." },
  { icon: Download, title: "Acceso inmediato", text: "Recibís todo en formato digital, listo para leer o imprimir cuando quieras." },
  { icon: ShieldCheck, title: "Compra segura", text: "Pago protegido y entrega digital directa a tu correo." },
];

function Benefits() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {BENEFITS.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl bg-card p-6 shadow-soft">
            <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Icon className="size-6" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-muted-foreground">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PackCard({ pack }: { pack: Pack }) {
  const details = PACK_DETAILS[pack.id];
  const featured = pack.featured;
  return (
    <article
      className={
        featured
          ? "relative flex flex-col rounded-3xl border-4 border-gold bg-card p-6 shadow-featured md:-mt-6"
          : "flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
      }
    >
      {featured && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold px-4 py-1 font-display text-sm font-bold text-gold-foreground">
          ⭐ Más elegido
        </span>
      )}
      <img
        src={details.image}
        alt={pack.name}
        width={1024}
        height={768}
        loading="lazy"
        className="w-full rounded-2xl bg-cream"
      />
      <p className="mt-5 text-sm font-bold uppercase tracking-wide text-primary">{details.tagline}</p>
      <h3 className="mt-1 text-xl font-semibold leading-snug">{pack.name}</h3>
      <ul className="mt-4 flex-1 space-y-2">
        {details.items.map((item) => (
          <li key={item} className="flex gap-2 text-muted-foreground">
            <Check className="mt-0.5 size-5 shrink-0 text-cta" /> {item}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        {pack.originalPrice && (
          <p className="text-muted-foreground">
            De <span className="line-through">{formatUSD(pack.originalPrice)}</span> por solo
          </p>
        )}
        <p className="font-display text-4xl font-bold text-foreground">
          {formatUSD(pack.price)} <span className="text-base font-semibold text-muted-foreground">USD</span>
        </p>
      </div>
      {featured && (
        <div className="mt-4 rounded-2xl bg-urgency p-4 text-urgency-foreground">
          <p className="mb-2 text-sm font-semibold">La oferta termina en:</p>
          <CountdownDigits />
        </div>
      )}
      <div className="mt-5 [&_a]:w-full">
        <BuyButton
          pack={pack}
          label={featured ? "¡Quiero el Mega Pack!" : "Comprar ahora"}
          variant={featured ? "gold" : "cta"}
          pulse={featured}
        />
      </div>
    </article>
  );
}

function Packs() {
  return (
    <section id="packs" className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Elegí el pack ideal para tu familia</h2>
          <p className="mt-3 text-lg text-muted-foreground">Pago único. Acceso inmediato. Para siempre.</p>
        </div>
        <div className="mt-14 grid items-start gap-8 md:grid-cols-3">
          <PackCard pack={basico} />
          <PackCard pack={mega} />
          <PackCard pack={familiar} />
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  { q: "¿Cómo recibo los materiales?", a: "Después del pago recibís el acceso por correo electrónico para descargar todo al instante." },
  { q: "¿Para qué edades son?", a: "Están pensados para niños de 3 a 10 años, ideales para leer juntos en familia." },
  { q: "¿Puedo imprimirlos?", a: "Sí, podés imprimirlos en casa todas las veces que quieras." },
];

function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="text-center text-3xl font-bold">Preguntas frecuentes</h2>
      <div className="mt-10 space-y-4">
        {FAQ.map(({ q, a }) => (
          <details key={q} className="group rounded-2xl bg-card p-5 shadow-soft">
            <summary className="cursor-pointer list-none font-display text-lg font-semibold">{q}</summary>
            <p className="mt-3 text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="bg-urgency py-16 text-urgency-foreground">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">No te pierdas el Mega Pack a $14.99 USD</h2>
        <p className="text-lg opacity-90">
          Precio normal <span className="line-through">$39.99</span>. Esta promoción termina en:
        </p>
        <CountdownDigits />
        <BuyButton pack={mega} label="¡Sí, quiero el Mega Pack!" variant="gold" pulse />
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <OfferBar />
      <main>
        <Hero />
        <Benefits />
        <Packs />
        <Faq />
        <FinalCta />
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Libros Bíblicos Infantiles. Todos los derechos reservados.
      </footer>
    </div>
  );
}
