'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ProgramHeroProps {
    title: string;
    images: string[];
    description: string;
    ctaLabel?: string;
    onCtaClick?: () => void;
    imageAspectRatio?: string;
}

export default function ProgramHero({
                                        title,
                                        images,
                                        description,
                                        ctaLabel = "Learn More",
                                        onCtaClick,
                                        imageAspectRatio = "4/3"
                                    }: ProgramHeroProps) {
    return (
        <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#f9fafb]">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="mb-8">
                    <Link
                        href="/program"
                        className="inline-flex items-center text-white bg-[#FF7001] hover:bg-[#FF8C33] px-4 py-2 rounded-full shadow-md transition"
                    >
                        <ArrowBackIcon className="mr-1" fontSize="small" />
                        <span className="text-sm font-medium">Back to Programs</span>
                    </Link>
                </div>

                <div className="text-center mb-12">
                    <h1 className="text-[#00464D] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                        {title}
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-[#212020] leading-relaxed">
                        {description}
                    </p>
                    <div className="w-40 h-1 bg-gradient-to-r from-[#00464D] to-[#FF7001] rounded-full mx-auto mt-10" />
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                    <div className="relative flex flex-col items-start">
                        {images && images.length > 0 && (
                            <div
                                className="relative w-full rounded-xl overflow-hidden shadow-lg border border-[#FF7001]"
                                style={{ aspectRatio: imageAspectRatio }}
                            >
                                <Image
                                    src={images[0]}
                                    alt={`${title} image`}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    <div className="border border-[#FF7001] rounded-xl p-6 md:p-8 shadow-sm flex flex-col justify-between bg-white">
                        <p className="text-[#00464D] text-lg md:text-xl leading-relaxed mb-6">
                            Equipping community members with essential skills and connections to succeed in today&apos;s workforce.
                        </p>
                        {onCtaClick && (
                            <button
                                onClick={onCtaClick}
                                className="self-start inline-flex items-center bg-[#FF7001] text-white px-6 py-3 rounded-lg hover:bg-[#FF8C33] transition-all duration-300 shadow"
                            >
                                <span className="font-semibold">{ctaLabel}</span>
                                <span className="ml-2 text-xl">→</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
