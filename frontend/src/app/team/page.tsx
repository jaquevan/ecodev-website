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

import gladys from '../../../public/Gladys-new-headshot-1200x1200.webp'
import dini from '../../../public/Dini-new-headshot-1200x1200.webp'
import carlos from '../../../public/carlos.png'
import alex from '../../../public/AlexTrain-1-1200x1200.webp'

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

                <main className="container mx-auto pb-24 px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 text-center mb-10">
                        Our Program Team
                    </h2>

                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-14">
                        <TeamMemberCard
                            member={{
                                id: -1,
                                attributes: {
                                    name: 'Gladys Vega',
                                    role: 'President & CEO',
                                    description: 'Gladys Vega has dedicated more than three decades of service to the City of Chelsea and La Colaborativa, which she joined in 1990—just two years after its founding. Born in Puerto Rico and raised in Chelsea from the age of nine, Gladys has made a lifelong commitment to the community. As a mother of two, she is deeply committed to building a better future for families throughout the region. During her tenure, she advanced from receptionist to community organizer, then to Executive Director, and ultimately President & CEO, a role she has held since 2006. Gladys is a groundbreaking community organizer and advocate, working tirelessly to ensure the Latinx immigrant community has a voice and the power to achieve its goals. She has designed nearly all of La Colaborativa\'s programs and campaigns, expanding rights for immigrants, low-income families, tenants, workers, youths, and people of color across Massachusetts. Her leadership during the COVID-19 crisis brought national recognition from outlets such as The Atlantic Monthly and The Boston Globe.',
                                    photo: {
                                        data: {
                                            attributes: {
                                                url: gladys.src
                                            }
                                        }
                                    },
                                    social: {
                                        email: 'gladys@la-colaborativa.org',
                                        linkedin: 'https://www.linkedin.com/in/gladys-vega-53a55827/',
                                    },
                                    isLocal: true
                                },
                            }}
                        />

                        <TeamMemberCard
                            member={{
                                id: -2,
                                attributes: {
                                    name: 'Dinanyili Del Carmen Paulino',
                                    role: 'Executive Vice President',
                                    description: 'Dinanyili Paulino is the Executive Vice President at La Colaborativa. Dinanyili joined the La Colaborativa team in 2016. She oversees the development team, finance team, program directors, and is responsible for the organization\'s day-to-day functions and evaluations.\n\nDinanyili is passionate about working for youth and families starting from an early age and has been involved in youth advocacy. After migrating to the United States from Dominican Republic at the age of 14, Dinanyili became homeless. She credits organizations similar to La Colaborativa for helping her and instilling a sense of advocacy for the Latinx community. Soon enough, she got involved as a youth leader which sparked her passion for youth workforce development. Dinanyili has been passionate about the empowerment of youth and Latinx communities and has been involved in social justice for over 26 years. It is because of her background that she is passionate about helping the immigrant Latinx community.',
                                    photo: {
                                        data: {
                                            attributes: {
                                                url: dini.src
                                            }
                                        }
                                    },
                                    social: {
                                        email: 'dinanyili@la-colaborativa.org',
                                        linkedin: 'https://www.linkedin.com/in/dinanyili-paulino-505538131/',
                                    },
                                    isLocal: true
                                },
                            }}
                        />

                        <TeamMemberCard
                            member={{
                                id: -4,
                                attributes: {
                                    name: 'Alex Train',
                                    role: 'Chief Strategy Officer',
                                    description: 'Alex Train is the Chief Strategy Officer at La Colaborativa. With a focus on strategic planning, program development, and policy analysis, Alex works to advance the organization\'s goals and create sustainable impact in the community.',
                                    photo: {
                                        data: {
                                            attributes: {
                                                url: alex.src
                                            }
                                        }
                                    },
                                    social: {
                                        email: 'alex@la-colaborativa.org',
                                        linkedin: 'https://www.linkedin.com/in/alex-train/',
                                    },
                                    isLocal: true
                                },
                            }}
                        />

                        <TeamMemberCard
                            member={{
                                id: -3,
                                attributes: {
                                    name: 'Carlos R. Gálvez',
                                    role: 'Director of Economic Sustainability & Mobility',
                                    description: 'I\'m an Economist with over sixteen years of experience leading community, social, and economic development projects focused on social mobility for vulnerable individuals and families in Mexico and the United States. These development projects are brought to fruition through strategic alliances and partnerships involving governmental and political institutions, nonprofit organizations, academia, and private companies. Skills gained in these endeavors include a deep knowledge of community-oriented intervention project planning and design, budgeting and management, and experience working with individuals for career development, socio-political analysis, and data management. Academic background in Social Sciences, Economics, and regional development.\n\nI\'m Bilingual in Spanish and English, currently learning two additional languages: Portuguese to serve also community members from the big Brazilian population in Massachusetts and French.',
                                    photo: {
                                        data: {
                                            attributes: {
                                                url: carlos.src
                                            }
                                        }
                                    },
                                    social: {
                                        email: 'carlos@la-colaborativa.org',
                                        linkedin: 'https://www.linkedin.com/in/carlosricardogalvez/',
                                    },
                                    isLocal: true
                                },
                            }}
                        />



                        {/* Dynamic team members from Strapi */}
                        {loading ? (
                            <div className="flex justify-center col-span-full">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700"></div>
                            </div>
                        ) : team.length ? (
                            team.map((member) => (
                                <TeamMemberCard key={member.id} member={member} />
                            ))
                        ) : null}
                    </div>

                    {!loading && !team.length && (
                        <p className="text-center text-gray-700">No additional team members found.</p>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}