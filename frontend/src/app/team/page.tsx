'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TeamMemberCard from '@/components/TeamMemberCard';
import BubbleBackground from '@/components/Bubble';

import groupPhoto from '../../../public/team-photo.png';
import carlosPhoto from '../../../public/carlos.png';

import { fetchTeamMembers } from '@/lib/team';
import { TeamMember } from '@/types/member';

/* static ui helpers */
const bubbles = [
    { color: '#9EDED5', size: 180, top: '2%',  left: '8%',  delay: '0s'   },
    { color: '#FFD700', size: 100, top: '35%', left: '12%', delay: '1.5s' },
    { color: '#98FB98', size: 320, top: '65%', left: '75%', delay: '2.1s' },
    { color: '#7FD1AE', size: 250, top: '50%', left: '5%',  delay: '2.7s' },
    { color: '#FFC8A2', size: 140, top: '28%', left: '48%', delay: '3.2s' },
    { color: '#8EDFDF', size: 170, top: '42%', left: '80%', delay: '0.4s' },
    { color: '#FAE7A5', size: 130, top: '75%', left: '60%', delay: '1.9s' },
    { color: '#C1E1C1', size: 220, top: '58%', left: '30%', delay: '2.5s' },
    { color: '#FFB347', size: 110, top: '88%', left: '40%', delay: '3.0s' },
    { color: '#B5EAD7', size: 280, top: '10%', left: '70%', delay: '2.3s' },
    { color: '#F47820', size: 160, top: '45%', left: '55%', delay: '1.0s' },
]; // Removed 'as const'

export default function TeamPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeamMembers()
            .then(setTeam)
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Nav />

            <div className="relative min-h-screen overflow-hidden">
                <BubbleBackground bubbles={bubbles}/>

                <div className="container mx-auto pt-10 pb-4 px-4 text-center">
                    <h2
                        className="mb-8 inline-block rotate-[-1.75deg] bg-amber-400 px-5 py-2 text-4xl font-extrabold text-emerald-900 shadow-md lg:text-5xl">
                        Meet the Eco Dev Team
                    </h2>
                </div>

                <header className="relative isolate min-h-[50vh] flex items-center justify-center overflow-hidden mb-8">
                    <div
                        className="container mx-auto flex flex-col-reverse items-center justify-center gap-12 px-4 lg:flex-row lg:gap-25">
                        <div className="max-w-xl text-center">
                            <p className="text-lg leading_relaxed text-slate-700">
                                La Colaborativa offers contextualized support to empower our
                                community toward financial independence. We provide holistic
                                workforce-development pathways for individuals aged 14 – 60,
                                ensuring they have the tools and resources needed to succeed.
                            </p>
                        </div>

                        <figure className="relative w-full max-w-xl">
                            <span
                                className="absolute inset-0 -translate-x-2 translate-y-2 rounded-[2rem] f "
                                aria-hidden
                            />
                            <Image
                                src={groupPhoto}
                                alt="La Colaborativa team standing outside the headquarters"
                                priority
                                width={600}
                                height={400}
                                className="relative rounded-[1rem] border-4 border-amber-500 shadow-xl w-full"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </figure>
                    </div>
                </header>

                <section className="container mx-auto py-8 px-4">
                    <article
                        className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-2xl border-4 border-amber-500 bg-gradient-to-tr from-[#99DED6] to-[#FFDBC2] p-8 shadow-lg md:flex-row">
                        <div className="shrink-0">
                            <Image
                                src={carlosPhoto}
                                alt="Picture of Carlos R. Gálvez"
                                width={200}
                                height={200}
                                className="rounded-full shadow-md"
                                priority
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-emerald-800">
                                Carlos R. Gálvez
                            </h2>
                            <p className="mt-1 text-lg font-medium text-gray-800">
                                Director of Economic Sustainability&nbsp;&amp;&nbsp;Mobility
                            </p>
                            <p className="mt-4 text-base leading-relaxed text-gray-700">
                                Economist from Hermosillo, Sonora, now based in Massachusetts, with multi-sector
                                experience across academia, government, NGOs, and business. Carlos partners with
                                nonprofits serving Latinx immigrants and vulnerable youth, applying strategic
                                planning and project-development expertise to foster long-term community wellbeing.
                            </p>

                            <a
                                href="https://la-colaborativa.org/program-contact/?advisor-email=carlosg@la-colaborativa.org&program-service=Economic-Development"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                            >
                                Connect with Carlos
                            </a>
                        </div>
                    </article>
                </section>

                <main className="container mx-auto pb-24 px-4">
                    <h2 className="text-2xl font-bold text-emerald-800 text-center mb-10">
                        Our Program Team
                    </h2>

                    {loading ? (
                        <p className="text-center text-gray-700">Loading team&nbsp;…</p>
                    ) : team.length ? (
                        <div
                            className="grid grid-cols-1 gap-10 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:gap-14">
                            {team.map((member) => (
                                <TeamMemberCard key={member.id} member={member as any}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-700">No team members found.</p>
                    )}
                </main>
            </div>

            <Footer/>
        </>
    );
}