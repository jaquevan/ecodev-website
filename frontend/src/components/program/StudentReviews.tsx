'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type StudentReview = {
    id: number;
    name: string;
    quote: string;
    date: string;
    avatarUrl?: string | null;
};

interface StudentReviewsProps {
    heading?: string;
    reviews: StudentReview[];
    showRegisterButton?: boolean;
    scrollSpeed?: number;
}

export default function StudentReviews({
                                           heading = "Student Reviews",
                                           reviews,
                                           scrollSpeed = 1,
                                           showRegisterButton = false,
                                       }: StudentReviewsProps) {
    const [duplicatedReviews, setDuplicatedReviews] = useState<StudentReview[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // duplicate reviews to create continuous scrolling effect
        if (reviews && reviews.length) {
            setDuplicatedReviews([...reviews, ...reviews, ...reviews]);
        }
    }, [reviews]);

    if (!reviews || reviews.length === 0) return null;

    return (
        <section className="py-12 overflow-hidden">
            <div className="container mx-auto max-w-5xl px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-[#00464D] text-center mb-8">{heading}</h2>

                <div className="relative w-full overflow-hidden mb-8">
                    <div
                        ref={scrollRef}
                        className="flex animate-scroll-x"
                        style={{
                            animationDuration: `${duplicatedReviews.length * scrollSpeed}s`,
                            animationTimingFunction: 'linear',
                            animationIterationCount: 'infinite',
                        }}
                    >
                        {duplicatedReviews.map((review, index) => (
                            <div
                                key={`${review.id}-${index}`}
                                className="flex-shrink-0 w-[300px] mx-4"
                            >
                                <ReviewCard review={review} />
                            </div>
                        ))}
                    </div>
                </div>

                {showRegisterButton && (
                    <div className="text-center">
                        <Link
                            href="#register"
                            className="inline-block bg-[#00AF98] text-white px-6 py-3 rounded-lg hover:bg-[#00464D] transition-all shadow-md hover:scale-105 duration-300"
                        >
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

function ReviewCard({ review }: { review: StudentReview }) {
    return (
        <div className="bg-white border border-[#FCD3B6] rounded-xl shadow-md p-6 flex flex-col gap-4 h-full hover:shadow-lg transition-shadow duration-300">
            <p className="italic text-[#212020] flex-grow">"{review.quote}"</p>
            <div className="flex items-center gap-3 mt-auto">
                {review.avatarUrl ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                            src={review.avatarUrl}
                            alt={review.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <DefaultAvatar />
                )}
                <div>
                    <div className="font-semibold text-[#212020]">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                </div>
            </div>
        </div>
    );
}

function DefaultAvatar() {
    return (
        <div className="w-10 h-10 rounded-full bg-[#FFE6D3] flex items-center justify-center text-[#FF7001]">
            <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zM4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
        </div>
    );
}