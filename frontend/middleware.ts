import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of all supported languages
const locales = ['en', 'es'];

// Default locale to use when no locale matches
const defaultLocale = 'en';

// Get the preferred locale from request
function getLocale(request: NextRequest) {
    // Check if there is a locale in the pathname
    const pathname = request.nextUrl.pathname;
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return pathname.split('/')[1];

    // Check for Accept-Language header
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
        const preferredLocale = acceptLanguage
            .split(',')
            .map((lang) => {
                const [locale, priority = '1'] = lang.trim().split(';q=');
                return { locale: locale.split('-')[0], priority: parseFloat(priority) };
            })
            .sort((a, b) => b.priority - a.priority)
            .find((lang) => locales.includes(lang.locale))?.locale;

        if (preferredLocale) return preferredLocale;
    }

    return defaultLocale;
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if the pathname already has a valid locale
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(
                `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
                request.url
            )
        );
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};