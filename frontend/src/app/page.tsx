'use client';

// import { TextField } from '@mui/material';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Calendar from '@/components/Calendar';

// icon imports for programs section
import { School as SchoolIcon } from '@mui/material/icons';
import { Work as WorkIcon } from '@mui/material/icons';
import { Badge as BadgeIcon } from '@mui/material/icons';
import { HealthAndSafety as HealthAndSafetyIcon } from '@mui/material/icons';
import { SolarPower as SolarPowerIcon } from '@mui/material/icons';

export default function Home() {

    return (
        <>
            <Nav/>
            <main className="px-6 md:px-10 lg:px-16 py-20 space-y-32 max-w-screen-2xl mx-auto">
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
                        <div className="mt-6">
                            <a
                                href="/course"
                                className="inline-block bg-teal-700 hover:bg-teal-800 text-white py-3 px-6 rounded-md font-medium transition-colors"
                            >
                                Explore Our Programs
                            </a>
                        </div>
                    </div>

                    {/* CALENDAR */}
                    <div className="w-full max-w-3xl mx-auto my-12 lg:mx-0">
                        <Calendar/>
                    </div>
                </section>

                ;

                <section>
                    <h2 className="text-3xl font-semibold text-center mb-12 text-slate-800">
                        Explore Our Programs
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* AE: Adult Education */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 border-slate-300 inline-block">
                                AE
                            </h3>
                            <ul className="space-y-4 mt-4">
                                {[
                                    ['ESOL', <SchoolIcon fontSize="small" />],
                                    ['Financial Literacy', <BadgeIcon fontSize="small" />],
                                    ['Civic Engagement and Citizenship', <BadgeIcon fontSize="small" />],
                                    ['Digital Equity', <SchoolIcon fontSize="small" />],
                                ].map(([label, icon], i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700">
                                        <span className="mt-0.5 text-slate-600">{icon}</span>
                                        <span className="font-medium">{label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* WD: Workforce Development */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 border-slate-300 inline-block">
                                WD
                            </h3>
                            <ul className="space-y-4 mt-4">
                                <li className="flex gap-3 text-slate-700">
                                    <HealthAndSafetyIcon fontSize="small" className="text-slate-600" />
                                    <span className="font-medium">Health Care</span>
                                </li>
                                <li className="flex gap-3 text-slate-700">
                                    <SolarPowerIcon fontSize="small" className="text-slate-600" />
                                    <div>
                                        <p className="font-medium">Green Jobs and Clean Energy</p>
                                        <ul className="ml-6 list-disc text-sm mt-1 text-slate-600">
                                            <li>Weatherization</li>
                                            <li>HVAC</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* JR: Job Readiness */}
                        <div>
                            <h3 className="text-2xl font-bold text-slate-700 mb-4 border-b-2 border-slate-300 inline-block">
                                JR
                            </h3>
                            <ul className="space-y-4 mt-4">
                                {[
                                    ['Resume Writing', <WorkIcon fontSize="small" />],
                                    ['Interview Skills', <WorkIcon fontSize="small" />],
                                    ['Job Search Support', <WorkIcon fontSize="small" />],
                                ].map(([label, icon], i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-700">
                                        <span className="mt-0.5 text-slate-600">{icon}</span>
                                        <span className="font-medium">{label}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CONNECT SECTION */}
                <section
                    className="bg-gradient-to-r from-teal-900 to-orange-200 p-10 rounded-xl shadow text-white text-center">
                    <h2 className="text-2xl font-semibold mb-3">Connect with an Advisor</h2>
                    <p className="mb-5 text-base">
                        Get in touch to learn more about our Job Search & Placement programs.
                    </p>
                    <button
                        className="bg-white text-teal-800 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100 transition">
                        Connect with an Advisor
                    </button>
                </section>
            </main>

            <Footer/>
        </>
    )
        ;
}
