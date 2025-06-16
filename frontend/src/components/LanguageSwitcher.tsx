'use client'

import { useRouter, usePathname } from 'next/navigation';

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const switchLanguage = (locale: string) => {
        // Create the new path with the selected locale
        const newPath = `/${locale}${pathname.replace(/^\/[a-z]{2}/, '')}`;
        router.push(newPath);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={() => switchLanguage('en')}
                className="bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg flex items-center gap-2 border border-white/20"
            >
                <span className="fi fi-us"></span>
                <span>English</span>
            </button>
            <button
                onClick={() => switchLanguage('es')}
                className="bg-white/10 hover:bg-white/20 transition-colors px-3 py-2 rounded-lg flex items-center gap-2 border border-white/20"
            >
                <span className="fi fi-es"></span>
                <span>Español</span>
            </button>
        </div>
    );
}