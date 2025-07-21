'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TeamMemberCard from '@/components/TeamMemberCard';
import BubbleBackground from '@/components/Bubble';

import groupPhoto from '../../../public/team-photo.png';

import {fetchCachedTeamMembers} from '@/lib/team';
import { TeamMember as OriginalTeamMember } from '@/types/member';

const bubbles = [
    { color: '#9EDED5', size: 200, top: '18%',  left: '10%', delay: '0s' },
    { color: '#FFB347', size: 180, top: '10%',  left: '45%', delay: '0s' },
    { color: '#53e9b5', size: 220, top: '18%', left: '70%', delay: '2.3s' },
    { color: '#f7a538', size: 300, top: '30%', left: '5%', delay: '1.5s' },
    { color: '#7FD1AE', size: 250, top: '60%', left: '75%', delay: '2.1s' },
    { color: '#FFB347', size: 100, top: '25%', left: '50%', delay: '3.2s' },
    { color: '#8EDFDF', size: 140, top: '40%', left: '80%', delay: '0.4s' },
    { color: '#FAE7A5', size: 110, top: '70%', left: '60%', delay: '1.9s' },
    { color: '#C1E1C1', size: 180, top: '55%', left: '30%', delay: '2.5s' },
    { color: '#b4a7ed', size: 190, top: '85%', left: '40%', delay: '3.0s' },
];

interface NormalizedPhoto {
    data?: {
        attributes?: {
            url: string;
        };
    };
}

interface TeamMember extends Omit<OriginalTeamMember, 'attributes'> {
    attributes: Omit<OriginalTeamMember['attributes'], 'photo'> & { photo: NormalizedPhoto };
}

function normalizePhoto(photo: unknown): NormalizedPhoto {
    if (Array.isArray(photo)) {
        return {
            data: photo[0] ? { attributes: { url: photo[0].url } } : undefined,
        };
    }

    if (typeof photo === 'object' && photo !== null) {
        const photoObj = photo as Record<string, unknown>;
        if ('url' in photoObj) {
            return { data: { attributes: { url: photoObj.url as string } } };
        }
        if (photoObj.data && typeof photoObj.data === 'object' && 'attributes' in photoObj.data) {
            return photoObj as NormalizedPhoto;
        }
    }

    return { data: undefined };
}

export default function TeamPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCachedTeamMembers()
            .then((members) =>
                members.map((member): TeamMember => ({
                    ...member,
                    attributes: {
                        ...member.attributes,
                        photo: normalizePhoto(member.attributes.photo),
                    },
                }))
            )
            .then(setTeam)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <div className="inset-0 pointer-events-none">
                <BubbleBackground bubbles={bubbles} />
            </div>

            <Nav />

            <div className="relative">
                <header className="relative flex items-center justify-center overflow-hidden py-12 md:py-20 lg:py-28">
                    <div className="container mx-auto flex flex-col-reverse items-center justify-center gap-10 px-4 md:flex-row md:gap-16">
                        <div className="max-w-xl w-full md:order-2">
                            <figure className="relative w-full rounded-2xl overflow-hidden border-4 border-amber-400 shadow-xl">
                                <Image
                                    src={groupPhoto}
                                    alt="La Colaborativa team standing outside the headquarters"
                                    priority
                                    className="w-full h-auto object-cover rounded-2xl"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                                />
                            </figure>
                        </div>

                        <div className="max-w-2xl w-full text-center md:text-left bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl shadow-lg p-6 md:p-8">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-800 mb-4 leading-tight">
                                Meet the Economic Development Team
                            </h1>
                            <p className="text-base sm:text-lg leading-relaxed text-slate-700">
                                La Colaborativa offers contextualized support to empower our community toward financial independence. We provide holistic workforce-development pathways for individuals aged 14 – 60, ensuring they have the tools and resources needed to succeed.
                            </p>
                        </div>
                    </div>
                </header>

                <section className="container mx-auto pb-8 px-4">
                    <article className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-2xl border-4 border-amber-400 bg-gradient-to-tr from-[#99DED6] to-[#FFDBC2] p-8 shadow-lg md:flex-row">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-2">
                                Carlos R. Gálvez
                            </h2>
                            <p className="text-lg font-medium text-gray-800 mb-4">
                                Director of Economic Sustainability & Mobility
                            </p>
                            <p className="text-base leading-relaxed text-gray-700 mb-4">
                                Economist from Hermosillo, Sonora, now based in Massachusetts, with multi-sector experience across academia, government, NGOs, and business. Carlos partners with nonprofits serving Latinx immigrants and vulnerable youth, applying strategic planning and project-development expertise to foster long-term community wellbeing.
                            </p>
                            <a
                                href="https://la-colaborativa.org/program-contact/?advisor-email=carlosg@la-colaborativa.org&program-service=Economic-Development"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                            >
                                Connect with Carlos
                            </a>
                        </div>
                    </article>
                </section>

                <main className="container mx-auto pb-24 px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 text-center mb-10">
                        Our Program Team
                    </h2>
                    {loading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
                        </div>
                    ) : team.length ? (
                        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-14">
                            {team.map((member) => (
                                <TeamMemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-700">No team members found.</p>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}
