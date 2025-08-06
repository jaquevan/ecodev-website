'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { mediaUrl } from '@/lib/strapi';


export interface TeamMember {
    id: number;
    attributes: {
        name: string;
        role: string;
        description?: string;
        photo?: {
            data?: {
                attributes?: {
                    url: string;
                };
            };
        };
        social: {
            email: string;
            linkedin?: string;
        };
        isLocal?: boolean;
    };
}

function MemberAvatar({ name, imgUrl, size = 'md', isLocal = false }: { name: string; imgUrl?: string; size?: 'sm' | 'md' | 'lg'; isLocal?: boolean }) {
    const sizes = {
        sm: 'w-20 h-20',
        md: 'w-28 h-28',
        lg: 'w-32 h-32',
    };
    const sizeClass = sizes[size];
    const initials = name.split(' ').map(n => n[0]).join('');
    return (
        <div className={`${sizeClass} rounded-full ring-4 ring-emerald-500 overflow-hidden relative shadow-md`}>
            {imgUrl ? (
                <Image
                    src={isLocal ? imgUrl : mediaUrl(imgUrl)}
                    alt={`Photo of ${name}`}
                    fill
                    sizes={size === 'sm' ? '80px' : size === 'md' ? '112px' : '128px'}
                    className="object-cover object-center"
                    onError={(e) => {
                        e.currentTarget.style.display = 'none';
                    }}
                />
            ) : (
                <span className="flex h-full w-full items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-3xl font-bold">
                    {initials}
                </span>
            )}
        </div>
    );
}

function getButtonStyles(variant: 'primary' | 'secondary' | 'outline') {
    const base = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition px-4 py-1.5 min-w-[110px]";
    const variants = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-300",
        secondary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300",
        outline: "border border-emerald-600 text-emerald-700 bg-white hover:bg-emerald-50 hover:text-emerald-900 focus:ring-2 focus:ring-emerald-200"
    };
    return `${base} ${variants[variant]}`;
}

function EmailButton({ email }: { email: string }) {
    return (
        <Link
            href={`mailto:${email}`}
            target="_blank"
            rel="noopener noreferrer"
            className={getButtonStyles('secondary')}
            onClick={e => e.stopPropagation()}
            aria-label={`Email ${email}`}
        >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Email
        </Link>
    );
}

function LinkedInButton({ url }: { url: string }) {
    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={getButtonStyles('primary')}
            onClick={e => e.stopPropagation()}
            aria-label="LinkedIn"
        >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5ZM8 19H5V8h3v11Zm-1.5-12.3a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm13.5 12.3h-3v-5.6c0-3.37-4-3.12-4 0V19h-3V8h3v1.77C14.9 7.2 21 7 21 12.24V19Z" />
            </svg>
            LinkedIn
        </Link>
    );
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
    const { name, role, description, photo, social, isLocal } = member.attributes;
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const imgUrl = photo?.data?.attributes?.url;
    const email = social?.email;
    const linkedin = social?.linkedin;

    useEffect(() => {
        const handleEscape = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape' && showModal) setShowModal(false);
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [showModal]);

    useEffect(() => {
        if (showModal && modalRef.current) {
            modalRef.current.focus();
            const prev = document.activeElement as HTMLElement;
            return () => prev && prev.focus();
        }
    }, [showModal]);

    return (
        <>
            <article
                className="bg-gradient-to-tr from-[#fefdf5] to-white border-4 border-amber-400 rounded-3xl shadow-sm flex flex-col items-center text-center px-6 py-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                onClick={() => description && setShowModal(true)}
                role={description ? "button" : undefined}
                tabIndex={description ? 0 : undefined}
                aria-label={description ? `View bio for ${name}` : undefined}
                onKeyDown={e => {
                    if (description && (e.key === 'Enter' || e.key === ' ')) {
                        setShowModal(true);
                        e.preventDefault();
                    }
                }}
            >
                <MemberAvatar name={name} imgUrl={imgUrl} isLocal={isLocal} />
                <h2 className="mt-5 text-xl font-bold text-emerald-800">{name}</h2>
                <p className="mt-1 text-sm font-medium text-gray-700">{role}</p>
                <div className="mt-4 flex flex-col items-center gap-2 w-full">
                    {description && (
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                setShowModal(true);
                            }}
                            className={getButtonStyles('outline')}
                            aria-label={`View bio for ${name}`}
                        >
                            View Bio
                        </button>
                    )}
                    {(email || linkedin) && (
                        <div className="flex flex-row gap-2 mt-2">
                            {email && <EmailButton email={email} />}
                            {linkedin && <LinkedInButton url={linkedin} />}
                        </div>
                    )}
                </div>
            </article>
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
                    onClick={() => setShowModal(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`modal-title-${member.id}`}
                >
                    <div
                        ref={modalRef}
                        className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-300"
                        onClick={e => e.stopPropagation()}
                        tabIndex={-1}
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-6">
                                <MemberAvatar name={name} imgUrl={imgUrl} size="sm" isLocal={isLocal} />
                                <div>
                                    <h3 id={`modal-title-${member.id}`} className="text-2xl font-bold text-emerald-800">{name}</h3>
                                    <p className="text-lg font-medium text-gray-700">{role}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="prose prose-emerald max-w-none">
                            <p className="text-base leading-relaxed text-gray-700">{description}</p>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-3 justify-end">
                            {email && <EmailButton email={email} />}
                            {linkedin && <LinkedInButton url={linkedin} />}
                            <button
                                className={getButtonStyles('outline') + " border-gray-300 text-gray-700 hover:text-gray-900"}
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}