type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** h1 en el título principal de una página (/precios); h2 en las secciones de la portada. */
  as?: "h1" | "h2";
};

export function SectionTitle({ eyebrow, title, subtitle, as: Heading = "h2" }: SectionTitleProps) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent-cyan">{eyebrow}</p>
      <Heading className="mt-4 font-display text-3xl uppercase leading-[0.98] text-text sm:text-5xl">{title}</Heading>
      {subtitle ? <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p> : null}
    </header>
  );
}
