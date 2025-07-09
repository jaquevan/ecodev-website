'use client';

import { useLanguage } from '@/context/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

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
        // Existing fetchSlugs implementation
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
        // Existing effect implementation
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
            if (pathname.startsWith('/course/') && slugPairRef.current) {
                const targetSlug = slugPairRef.current[target];
                if (targetSlug) {
                    // First update the locale
                    setLocale(target);
                    // Then navigate to the correct slug for that locale
                    router.push(`/course/${targetSlug}`);
                    return;
                }
            }

            // For other pages, just update the locale
            setLocale(target);
            router.refresh();
        });
    };

    return (
        <div className="flex space-x-2 items-center">
            <div className="bg-white backdrop-blur-sm rounded-full p-1 shadow-lg">
                <div className="flex items-center relative px-1 py-0.5">
                    {/* Animated background slider */}
                    <motion.div
                        className="absolute inset-0 bg-teal-100 rounded-full shadow-md z-0 duration-50"
                        initial={false}
                        animate={{
                            x: locale === 'en' ? 0 : '100%',
                            width: '50%'
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                    />

                    <button
                        onClick={() => switchTo('en')}
                        disabled={isPending || locale === 'en'}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all z-10 relative ${
                            locale === 'en'
                                ? 'text-teal-700'
                                : 'text-black hover:text-teal-700 cursor-pointer'
                        } disabled:cursor-not-allowed disabled:opacity-70`}
                        aria-label="Switch to English"
                    >
                        <motion.span
                            animate={{
                                scale: locale === 'en' ? 1.05 : 1
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            English
                        </motion.span>
                    </button>
                    <button
                        onClick={() => switchTo('es')}
                        disabled={isPending || locale === 'es'}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all z-10 relative ${
                            locale === 'es'
                                ? 'text-teal-700'
                                : 'text-black hover:text-teal-700 cursor-pointer'
                        } disabled:cursor-not-allowed disabled:opacity-70`}
                        aria-label="Switch to Spanish"
                    >
                        <motion.span
                            animate={{
                                scale: locale === 'es' ? 1.05 : 1
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            Español
                        </motion.span>
                    </button>
                </div>
            </div>
        </div>
    );
}