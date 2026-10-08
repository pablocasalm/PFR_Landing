import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import type { Language, Translations } from "./types";
import { es } from "./es";
import { en } from "./en";

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

  const setLanguage = useCallback((next: Language) => {
    setLang(next);
    localStorage.setItem(LANG_KEY, next);
  }, []);

  // Idioma del documento, título de la pestaña y descripción: siguen al idioma elegido (también
  // al cargar, si el visitante ya tenía guardado el inglés). index.html trae los de español.
  useEffect(() => {
    const { title, description } = translations[lang].meta;
    document.documentElement.lang = lang;
    document.title = title;
    const setMeta = (selector: string, value: string) => document.querySelector(selector)?.setAttribute("content", value);
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:locale"]', lang === "en" ? "en_US" : "es_ES");
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
