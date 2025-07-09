'use client'

import React, { use, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchProgramBySlug, mediaUrl } from '@/lib/programs';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RegistrationSteps from '@/components/program/RegistrationSteps';
import StudentReviews from "@/components/program/StudentReviews";
import ProgramHero from '@/components/program/ProgramHero';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { Program } from '@/types/program';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { locale } = useLanguage();
    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(true);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        let mounted = true;

        async function loadProgram() {
            if (!slug) return;

            setLoading(true);
            try {
                console.log(`Fetching program with slug: ${slug} in locale: ${locale}`);
                let data = await fetchProgramBySlug(slug, locale);
                console.log('Fetched program data:', data);

                if (!data && locale === 'es') {
                    console.log("Spanish version not found, trying to fetch English version as fallback...");
                    data = await fetchProgramBySlug(slug, 'en');
                }

                if (mounted) {
                    if (data) {
                        setProgram(data);
                        setTimeout(() => setContentVisible(true), 100);
                    } else {
                        console.error(`Program not found with slug: ${slug} in any locale`);
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error loading program:', error);
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadProgram();

        return () => {
            mounted = false;
        };
    }, [slug, locale]);

    if (loading) {
        return <LoadingView />;
    }

    if (!program) {
        return <ProgramNotFoundView />;
    }

    console.log("Program heroImage:", program.heroImage);

    // Properly extract URLs based on Strapi's media structure
    const imageUrls = program.heroImage.map(img => {
        // Check for common Strapi media paths
        if (img.attributes?.url) return mediaUrl(img.attributes.url);
        if (img.attributes?.file?.url) return mediaUrl(img.attributes.file.url);
        if (img.url) return mediaUrl(img.url);

        console.error("Could not find URL in media object:", img);
        return "";
    }).filter(url => url !== ""); // Remove any empty URLs

    return (
        <>
            <Nav />

            <ProgramHero
                title={program.title}
                images={imageUrls}
                description={program.title}
                imageAspectRatio="16/9"
            />

            <div className={`transition-all duration-700 delay-300 ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {program.steps && program.steps.length > 0 && (
                    <RegistrationSteps
                        steps={program.steps.map(step => ({
                            id: String(step.id),
                            title: step.title,
                            description: step.description,
                            icon: step.icon || null
                        }))}
                    />
                )}
            </div>

            <div className={`transition-all duration-700 delay-400 ease-out ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {program.review && program.review.length > 0 && (
                    <StudentReviews reviews={program.review} />
                )}
            </div>

            <Footer />
        </>
    );
}

function LoadingView() {
    return (
        <>
            <Nav />
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">
                    <Loading />
                </div>
            </div>
            <Footer />
        </>
    );
}

function ProgramNotFoundView() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Nav />
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className={`text-center max-w-md bg-white rounded-xl shadow-md p-8 border border-gray-200 transition-all duration-500 ease-out ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <h1 className="text-2xl font-bold text-[#00464D] mb-4">Program Not Found</h1>
                    <p className="mb-6 text-gray-600">
                        The program you&apos;re looking for could not be found. Please check the URL or return to the programs list.
                    </p>
                    <Link
                        href="/program"
                        className="inline-flex items-center text-white bg-[#FF7001] px-4 py-2 rounded-full transition-all shadow-md hover:bg-[#FF7001]/90 hover:scale-105 duration-300"
                    >
                        <ArrowBackIcon className="mr-1" fontSize="small" /> Back to Programs
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}