'use client';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Calendar from '@/components/Calendar';
import BubbleBackground from '@/components/Bubble';
import FeatureCard from "@/components/FeatureCard";
import ProgramCards from '@/components/ProgramCards';

import mural from '../../public/Mural.jpg'
import classroom from '../../public/classroom.jpg'
import woodwork from '../../public/woodwork.jpg'


import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';


const adultEducationPrograms = [
    {
        label: 'ESOL',
        icon: <SchoolIcon fontSize="small" />,
        image: classroom,
        subItems: ['Financial Literacy', 'Civic Engagement and Citizenship', 'Digital Equity'],
    },
];

const workforceDevelopmentPrograms = [
    {
        label: 'Health Care',
        icon: <HealthAndSafetyIcon fontSize="small" />,
        image: woodwork,
        subItems: ['Green Jobs and Clean Energy', 'Weatherization', 'HVAC'],
    },
];

const jobReadinessPrograms = [
    {
        label: 'Resume Writing',
        icon: <WorkIcon fontSize="small" />,
        image: mural,
        subItems: ['Interview Skills', 'Job Search Support'],
    },
];

const bubbles = [
    { color: '#9EDED5', size: 100, top: '5%', left: '10%', delay: '0s' },
    { color: '#FFD700', size: 120, top: '25%', left: '25%', delay: '0.7s' },
    { color: '#98FB98', size: 300, top: '40%', left: '88%', delay: '1.2s' },
    { color: '#7FD1AE', size: 220, top: '60%', left: '5%', delay: '1.8s' },
    { color: '#FFC8A2', size: 270, top: '70%', left: '60%', delay: '2.2s' },
    { color: '#B5EAD7', size: 260, top: '85%', left: '40%', delay: '2.6s' },
    { color: '#F47820', size: 200, top: '30%', left: '45%', delay: '3.0s' },
];

export default function Home() {
    return (
        <>
            <Nav />
            <div className="relative min-h-screen overflow-hidden">
                <BubbleBackground bubbles={bubbles} />

                <main className="relative px-6 md:px-10 lg:px-16 py-20 space-y-32 max-w-screen-2xl mx-auto">
                    {/* Hero Section */}
                    <section className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="max-w-xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 leading-tight">
                                Economic Development
                            </h1>

                            <p className="text-gray-700 text-lg leading-relaxed">
                                La Colaborativa offers contextualized support to empower our community
                                towards financial independence. We provide holistic workforce development
                                pathways for individuals between the ages of 14–60, ensuring they have the
                                necessary tools and resources to succeed in the workforce.
                            </p>
                            <div className="m-6">

                                <FeatureCard />

                            </div>
                        </div>

                        <div className="w-full max-w-3xl mx-auto my-12 lg:mx-0">
                            <Calendar showWalkInOnly={true} />
                        </div>



                    </section>



                    {/* Programs Section */}
                    <section>
                        <h1 className="text-5xl font-semibold text-center mb-6">
                            Explore Our Programs
                        </h1>
                        <h4 className="text-lg font-semibold text-center mb-12 text-slate-800">
                            We drive lasting change through the development and implementation of our comprehensive programs.
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <ProgramCards
                                title="Adult Education"
                                category="ae"
                                items={adultEducationPrograms}
                                colorScheme="indigo"
                            />
                            <ProgramCards
                                title="Workforce Development"
                                category="wd"
                                items={workforceDevelopmentPrograms}
                                colorScheme="teal"
                            />
                            <ProgramCards
                                title="Job Readiness"
                                category="jr"
                                items={jobReadinessPrograms}
                                colorScheme="amber"
                            />
                        </div>
                    </section>

                    {/* Connect Section */}
                    <section className="bg-gradient-to-r from-teal-900 to-orange-200 p-10 rounded-xl shadow text-white text-center border-teal-800 border-3">
                        <h3 className="text-2xl font-semibold mb-3">Connect with an Advisor</h3>
                        <p className="mb-5 text-base">
                            Get in touch to learn more about our Job Search & Placement programs.
                        </p>
                        <button className="bg-white text-teal-800 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100 transition">
                            Connect Now
                        </button>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}
