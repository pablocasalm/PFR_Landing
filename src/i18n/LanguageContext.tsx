import { createContext, useContext, useEffect, useMemo, useState, useCallback, type ReactNode } from "react";
import type { Language, Translations } from "./types";
import { es } from "./es";
import { en } from "./en";
import { applyRemote, fetchRemoteTexts, readCachedTexts } from "./remote";
import { isOpenSignup, OPEN_SIGNUP_TEXTS } from "./openSignup";
import { currentRoute } from "../lib/route";

const translations: Record<Language, Translations> = { es, en };

type LanguageContextValue = {
  lang: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANG_KEY = "pfr_lang";

function getInitialLang(): Language {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === "en" || stored === "es") return stored;
  return "es";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLang);
  // Textos guardados en la base de datos, por idioma (ver remote.ts). Arranca con lo último que
  // se descargó en este navegador y se refresca en segundo plano al entrar y al cambiar de idioma.
  const [remote, setRemote] = useState<Partial<Record<Language, Record<string, string> | null>>>(() => ({
    es: readCachedTexts("es"),
    en: readCachedTexts("en"),
  }));

  useEffect(() => {
    let cancelled = false;
    fetchRemoteTexts(lang).then((dict) => {
      if (dict && !cancelled) setRemote((prev) => ({ ...prev, [lang]: dict }));
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  // Durante el alta abierta (openSignup.ts), sus textos van por encima de todo lo demás.
  const t = useMemo(() => {
    const base = applyRemote(translations[lang], remote[lang] ?? null);
    return isOpenSignup() ? applyRemote(base, OPEN_SIGNUP_TEXTS[lang]) : base;
  }, [lang, remote]);

  const setLanguage = useCallback((next: Language) => {
    setLang(next);
    localStorage.setItem(LANG_KEY, next);
  }, []);

  // Idioma del documento, título de la pestaña y descripción: siguen al idioma elegido (también
  // al cargar, si el visitante ya tenía guardado el inglés). index.html trae los de español.
  useEffect(() => {
    // Título y descripción de la página en la que está (cada una tiene los suyos, también en el
    // HTML que se publica: ver vite.config.ts).
    const route = currentRoute();
    const title = route === "pricing" ? t.meta.pricingTitle : route === "notFound" ? t.meta.notFoundTitle : t.meta.title;
    const description = route === "pricing" ? t.meta.pricingDescription : t.meta.description;
    document.documentElement.lang = lang;
    document.title = title;
    const setMeta = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[property="og:locale"]', lang === "en" ? "en_US" : "es_ES");
  }, [lang, t]);

  return (
    <LanguageContext.Provider value={{ lang, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
