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
                className="bg-white border-4 border-amber-500 rounded-2xl flex flex-col items-center text-center px-6 py-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                onClick={() => description && setShowModal(true)}
            >
                <div className="w-24 h-24 rounded-full ring-3 ring-emerald-600 overflow-hidden relative">
                    {imgUrl ? (
                        <Image
                            src={mediaUrl(imgUrl)}
                            alt={name}
                            fill
                            sizes="96px"
                            className="object-cover object-center"
                        />
                    ) : (
                        <span className="flex h-full w-full items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-2xl font-semibold">
                            {name.split(' ').map(n => n[0]).join('')}
                        </span>
                    )}
                </div>

                <h2 className="mt-4 text-xl font-bold text-emerald-700">{name}</h2>
                <p className="mt-1 text-sm font-medium text-gray-800">{role}</p>

                {description && (
                    <button className="mt-3 text-sm text-emerald-600 hover:text-emerald-800 font-medium">
                        View Bio
                    </button>
                )}

                {linkedIn && (
                    <a
                        href={linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-md bg-emerald-500 px-3 py-1.5 text-white text-sm font-medium transition-colors duration-200 hover:bg-emerald-700"
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-xl p-8 max-w-3xl w-[90%] mx-2 max-h-[95vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden relative flex-shrink-0">
                                {imgUrl ? (
                                    <Image
                                        src={mediaUrl(imgUrl)}
                                        alt={name}
                                        fill
                                        sizes="96px"
                                        className="object-cover object-center"
                                    />
                                ) : (
                                    <span className="flex h-full w-full items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-2xl font-semibold">
                                        {name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-emerald-700">{name}</h3>
                                <p className="text-lg font-medium text-gray-800">{role}</p>
                            </div>
                        </div>

                        <p className="text-lg leading-relaxed text-gray-700">{description}</p>

                        <div className="mt-8 flex justify-between">
                            {linkedIn && (
                                <a
                                    href={linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-white text-sm font-medium transition-colors hover:bg-emerald-700"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5ZM8 19H5V8h3v11Zm-1.5-12.3a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5Zm13.5 12.3h-3v-5.6c0-3.37-4-3.12-4 0V19h-3V8h3v1.77C14.9 7.2 21 7 21 12.24V19Z" />
                                    </svg>
                                    Connect on LinkedIn
                                </a>
                            )}
                            <button
                                className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
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

