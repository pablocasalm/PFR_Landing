import { useLanguage } from "../i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/80 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Padel Film Room</p>
        <p className="font-mono uppercase tracking-[0.16em]">{t.footer.tagline}</p>
      </div>
    </footer>
  );
}
