'use client';

import { useLanguage } from '@/context/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition, ChangeEvent, useEffect, useRef, useCallback } from 'react';

interface SlugPair {
    en: string;
    es: string;
}

export default function LanguageSwitcher() {
    const { locale, setLocale } = useLanguage();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const slugPairRef = useRef<SlugPair | null>(null);
    const fetchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const fetchSlugs = useCallback(async () => {
        if (!pathname.startsWith('/course/')) return;
        const currentSlug = pathname.split('/course/')[1]?.split('?')[0] ?? '';
        if (!currentSlug) return;

        const api = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1340';

        try {
            // Initial fetch with current locale and slug
            const currentUrl = `${api}/api/courses?locale=${locale}&filters[slug][$eq]=${currentSlug}`;
            console.log('Fetching course:', currentUrl);

            const res = await fetch(currentUrl);
            if (!res.ok) {
                console.error('Initial fetch failed:', res.status);
                return;
            }

            const json = await res.json();
            if (!json.data?.[0]) {
                console.log('No course found, retrying in 1s...');
                return false;
            }

            const entry = json.data[0];
            const docId = entry.documentId;

            if (!docId) {
                console.error('Missing documentId:', entry);
                return false;
            }

            // Fetch both language versions
            const [enRes, esRes] = await Promise.all([
                fetch(`${api}/api/courses?locale=en&filters[documentId][$eq]=${docId}`),
                fetch(`${api}/api/courses?locale=es&filters[documentId][$eq]=${docId}`)
            ]);

            if (!enRes.ok || !esRes.ok) return false;

            const [enJson, esJson] = await Promise.all([
                enRes.json(),
                esRes.json()
            ]);

            const enSlug = enJson.data?.[0]?.slug;
            const esSlug = esJson.data?.[0]?.slug;

            if (!enSlug || !esSlug) return false;

            slugPairRef.current = { en: enSlug, es: esSlug };
            console.log('Stored slug pairs:', slugPairRef.current);
            return true;
        } catch (err) {
            console.error('Error in fetchSlugs:', err);
            return false;
        }
    }, [pathname, locale]);

    useEffect(() => {
        // Clear any existing timeout
        if (fetchTimeoutRef.current) {
            clearTimeout(fetchTimeoutRef.current);
        }

        const attemptFetch = async (attempts = 0) => {
            const success = await fetchSlugs();

            if (!success && attempts < 3) {
                // Retry up to 3 times with increasing delays
                fetchTimeoutRef.current = setTimeout(() => {
                    attemptFetch(attempts + 1);
                }, 1000 * (attempts + 1));
            }
        };

        attemptFetch();

        return () => {
            if (fetchTimeoutRef.current) {
                clearTimeout(fetchTimeoutRef.current);
            }
        };
    }, [pathname, locale, fetchSlugs]);

    const switchTo = (target: 'en' | 'es') => {
        if (target === locale) return;

        startTransition(() => {
            if (pathname === '/courses') {
                setLocale(target);
                return;
            }

            if (pathname.startsWith('/course/') && slugPairRef.current) {
                const targetSlug = slugPairRef.current[target];
                if (targetSlug) {
                    setLocale(target);
                    router.push(`/course/${targetSlug}`);
                    return;
                }
            }

            setLocale(target);
            router.refresh();
        });
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
        switchTo(e.target.value as 'en' | 'es');

    return (
        <div className="relative">
            <label htmlFor="locale-select" className="sr-only">
                Select language
            </label>
            <select
                id="locale-select"
                value={locale}
                onChange={handleChange}
                disabled={isPending}
                className="bg-[#00464D] text-white px-3 py-2 rounded-lg shadow focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
                <option value="en">English</option>
                <option value="es">Español</option>
            </select>
        </div>
    );
}