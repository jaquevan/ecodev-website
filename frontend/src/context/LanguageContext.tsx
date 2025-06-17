'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type Locale = 'en' | 'es';

type Translations = Record<Locale, Record<string, string>>;

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string) => string;
}

/* ─── Simple hard-coded dictionary (expand as needed) ───────────────────────── */
const translations: Translations = {
    en: {
        welcome: 'Welcome',
        viewDetails: 'View Details',
        backToCourses: 'Back to Courses',
    },
    es: {
        welcome: 'Bienvenido',
        viewDetails: 'Ver Detalles',
        backToCourses: 'Volver a Cursos',
    },
};

/* ─── Context scaffold ──────────────────────────────────────────────────────── */
const LanguageContext = createContext<LanguageContextType>({
    locale: 'en',
    setLocale: () => {},
    t: (key) => key,
});

/* ─── Provider ──────────────────────────────────────────────────────────────── */
export function LanguageProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname(); // works because this component is client-side
    const [locale, _setLocale] = useState<Locale>('en');

    /* ── First-run: pick locale from localStorage OR current URL ─────────────── */
    useEffect(() => {
        let initial: Locale | null = null;

        if (typeof window !== 'undefined') {
            /* 1. Stored preference */
            const stored = localStorage.getItem('locale') as Locale | null;
            if (stored === 'en' || stored === 'es') {
                initial = stored;
            } else {
                /* 2. Infer from path prefix: /en/... or /es/... */
                const urlLocale = pathname.split('/')[1] as Locale;
                if (urlLocale === 'en' || urlLocale === 'es') {
                    initial = urlLocale;
                }
            }
        }

        if (initial) _setLocale(initial);
    }, [pathname]);

    /* ── Change handler: updates state, localStorage, AND a cookie ────────────── */
    const handleSetLocale = (newLocale: Locale) => {
        _setLocale(newLocale);

        if (typeof window !== 'undefined') {
            localStorage.setItem('locale', newLocale);
            /* So that server components can read it via cookies() */
            document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
        }
    };

    /* ── Tiny helper to fetch the right translation string ───────────────────── */
    const t = (key: string): string => translations[locale]?.[key] ?? key;

    return (
        <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

/* ─── Convenience hook ─────────────────────────────────────────────────────── */
export function useLanguage() {
    return useContext(LanguageContext);
}
