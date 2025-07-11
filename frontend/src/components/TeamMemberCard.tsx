import Image from 'next/image';
import { useState } from 'react';
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
        social?: {
            linkedin?: string;
        };
    };
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
    const { name, role, description, photo, social } = member.attributes;
    const [showModal, setShowModal] = useState(false);

    const imgUrl = photo?.data?.attributes?.url;
    const linkedIn = social?.linkedin;

    return (
        <>
            <article
                className="bg-gradient-to-tr from-[#fefdf5] to-white border-4 border-amber-400 rounded-3xl shadow-sm flex flex-col items-center text-center px-6 py-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                onClick={() => description && setShowModal(true)}
            >
                <div className="w-28 h-28 rounded-full ring-4 ring-emerald-500 overflow-hidden relative shadow-md">
                    {imgUrl ? (
                        <Image
                            src={mediaUrl(imgUrl)}
                            alt={name}
                            fill
                            sizes="112px"
                            className="object-cover object-center"
                        />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-3xl font-bold">
              {name.split(' ').map((n) => n[0]).join('')}
            </span>
                    )}
                </div>

                <h2 className="mt-5 text-xl font-bold text-emerald-800">{name}</h2>
                <p className="mt-1 text-sm font-medium text-gray-700">{role}</p>

                {description && (
                    <button
                        className="mt-4 text-sm text-emerald-700 hover:text-emerald-900 font-medium rounded-md border border-emerald-600 px-3 py-1.5 transition-colors hover:bg-emerald-50"
                    >
                        View Bio
                    </button>
                )}

                {linkedIn && (
                    <a
                        href={linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-white text-sm font-medium transition hover:bg-emerald-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5ZM8 19H5V8h3v11Zm-1.5-12.3a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm13.5 12.3h-3v-5.6c0-3.37-4-3.12-4 0V19h-3V8h3v1.77C14.9 7.2 21 7 21 12.24V19Z" />
                        </svg>
                        Connect
                    </a>
                )}
            </article>

            {showModal && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-3xl p-8 max-w-2xl w-[90%] mx-2 max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden relative flex-shrink-0 ring-4 ring-emerald-500 shadow">
                                {imgUrl ? (
                                    <Image
                                        src={mediaUrl(imgUrl)}
                                        alt={name}
                                        fill
                                        sizes="96px"
                                        className="object-cover object-center"
                                    />
                                ) : (
                                    <span className="flex h-full w-full items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-3xl font-bold">
                    {name.split(' ').map((n) => n[0]).join('')}
                  </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-emerald-800">{name}</h3>
                                <p className="text-lg font-medium text-gray-700">{role}</p>
                            </div>
                        </div>

                        <p className="text-base leading-relaxed text-gray-700">{description}</p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-end">
                            {linkedIn && (
                                <a
                                    href={linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-white text-sm font-medium transition hover:bg-emerald-700"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5ZM8 19H5V8h3v11Zm-1.5-12.3a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm13.5 12.3h-3v-5.6c0-3.37-4-3.12-4 0V19h-3V8h3v1.77C14.9 7.2 21 7 21 12.24V19Z" />
                                    </svg>
                                    Connect on LinkedIn
                                </a>
                            )}
                            <button
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md transition hover:bg-gray-50"
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
