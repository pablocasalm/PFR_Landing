import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
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
    document.documentElement.lang = next;
  }, []);

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
