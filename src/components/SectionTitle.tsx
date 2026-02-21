type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.26em] text-accent-cyan">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl uppercase leading-[0.98] text-text sm:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p> : null}
    </header>
  );
}
