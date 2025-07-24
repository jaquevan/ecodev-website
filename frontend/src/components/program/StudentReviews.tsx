'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
                                           scrollSpeed = 30,
                                           showRegisterButton = false,
                                       }: StudentReviewsProps) {
    const [duplicatedReviews, setDuplicatedReviews] = useState<StudentReview[]>([]);

    useEffect(() => {
        if (reviews && reviews.length) {
            // Ensure we have enough items for smooth scrolling
            const minItems = Math.max(8, reviews.length * 3);
            let items = [...reviews];
            while (items.length < minItems) {
                items = [...items, ...reviews];
            }
            setDuplicatedReviews(items);
        }
    }, [reviews]);

    if (!reviews || reviews.length === 0) return null;

    return (
        <section className="py-16 overflow-hidden bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                            {heading}
                        </span>
                    </h2>
                    <div className="h-1 w-16 bg-orange-300 mx-auto rounded-full mb-4"></div>
                </div>

                <div className="relative mx-auto max-w-7xl">
                    {/* Fade edges */}
                    <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

                    <div className="relative w-full overflow-hidden">
                        <div
                            className="flex py-4 animate-scroll"
                            style={{
                                animation: `scrollReviews ${scrollSpeed}s linear infinite`
                            }}
                        >
                            {duplicatedReviews.map((review, index) => (
                                <div
                                    key={`${review.id}-${index}`}
                                    className="flex-shrink-0 w-[280px] sm:w-[320px] px-4"
                                >
                                    <ReviewCard review={review} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {showRegisterButton && (
                    <div className="text-center mt-12">
                        <Link
                            href="#register"
                            className="inline-flex items-center text-white bg-[#FF7001] px-6 py-3 rounded-lg hover:bg-[#FF8C33] transition-all shadow-md hover:shadow-lg duration-300 font-medium"
                        >
                            Register Now
                            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* CSS Animation */}
            <style jsx global>{`
                @keyframes scrollReviews {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    );
}

function ReviewCard({ review }: { review: StudentReview }) {
    return (
        <motion.div
            whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full border border-gray-100"
        >
            <div className="mb-4 text-orange-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>
            <p className="text-gray-700 mb-4 flex-grow">{review.quote}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                {review.avatarUrl ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-100">
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
                    <div className="font-semibold text-teal-700">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                </div>
            </div>
        </motion.div>
    );
}

function DefaultAvatar() {
    return (
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 border-2 border-orange-200">
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