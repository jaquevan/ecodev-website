'use client';

// import { TextField } from '@mui/material';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Calendar from '@/components/Calendar';

// icon imports for programs section
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import BadgeIcon from '@mui/icons-material/Badge';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import SolarPowerIcon from '@mui/icons-material/SolarPower';

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
                    <h3 className="text-3xl font-semibold text-center mb-12 text-slate-800">
                        Explore Our Programs
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Adult Education */}
                        <a href="/course?category=ae" className="block group">
                            <div
                                className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-blue-100 hover:translate-y-[-8px] h-full">
                                <h3 className="text-2xl font-bold text-indigo-800 mb-5 border-b-2 border-indigo-300 pb-2 font-['Libre_Franklin'] group-hover:border-indigo-500 transition-colors">
                                    Adult Education
                                </h3>
                                <ul className="space-y-4 mt-6">
                                    {[
                                        ['ESOL', <SchoolIcon fontSize="small" className="text-indigo-600"/>],
                                        ['Financial Literacy',
                                            <BadgeIcon fontSize="small" className="text-indigo-600"/>],
                                        ['Civic Engagement and Citizenship',
                                            <BadgeIcon fontSize="small" className="text-indigo-600"/>],
                                        ['Digital Equity', <SchoolIcon fontSize="small" className="text-indigo-600"/>],
                                    ].map(([label, icon], i) => (
                                        <li key={i}
                                            className="flex items-center gap-3 text-slate-700 group-hover:text-indigo-900 transition-colors">
                                            <div
                                                className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full group-hover:bg-indigo-200 transition-colors">
                                                {icon}
                                            </div>
                                            <span className="font-medium">{label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </a>

                        {/* Workforce Development */}
                        <a href="/course?category=wd" className="block group">
                            <div
                                className="bg-gradient-to-br from-teal-50 to-emerald-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-teal-100 hover:translate-y-[-8px] h-full">
                                <h3 className="text-2xl font-bold text-teal-800 mb-5 border-b-2 border-teal-300 pb-2 font-['Libre_Franklin'] group-hover:border-teal-500 transition-colors">
                                    Workforce Development
                                </h3>
                                <ul className="space-y-4 mt-6">
                                    <li className="flex items-center gap-3 text-slate-700 group-hover:text-teal-900 transition-colors">
                                        <div
                                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-teal-100 rounded-full group-hover:bg-teal-200 transition-colors">
                                            <HealthAndSafetyIcon fontSize="small" className="text-teal-600"/>
                                        </div>
                                        <span className="font-medium">Health Care</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-700 group-hover:text-teal-900 transition-colors">
                                        <div
                                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-teal-100 rounded-full group-hover:bg-teal-200 transition-colors mt-1">
                                            <SolarPowerIcon fontSize="small" className="text-teal-600"/>
                                        </div>
                                        <div>
                                            <p className="font-medium">Green Jobs and Clean Energy</p>
                                            <ul className="ml-6 list-disc text-sm mt-1 text-slate-600 group-hover:text-teal-700 transition-colors">
                                                <li>Weatherization</li>
                                                <li>HVAC</li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </a>

                        {/* Job Readiness */}
                        <a href="/course?category=jr" className="block group">
                            <div
                                className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-amber-100 hover:translate-y-[-8px] h-full">
                                <h3 className="text-2xl font-bold text-amber-800 mb-5 border-b-2 border-amber-300 pb-2 font-['Libre_Franklin'] group-hover:border-amber-500 transition-colors">
                                    Job Readiness
                                </h3>
                                <ul className="space-y-4 mt-6">
                                    {[
                                        ['Resume Writing', <WorkIcon fontSize="small" className="text-amber-600"/>],
                                        ['Interview Skills', <WorkIcon fontSize="small" className="text-amber-600"/>],
                                        ['Job Search Support', <WorkIcon fontSize="small" className="text-amber-600"/>],
                                    ].map(([label, icon], i) => (
                                        <li key={i}
                                            className="flex items-center gap-3 text-slate-700 group-hover:text-amber-900 transition-colors">
                                            <div
                                                className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors">
                                                {icon}
                                            </div>
                                            <span className="font-medium">{label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </a>
                    </div>
                </section>

                {/* CONNECT SECTION */}
                <section
                    className="bg-gradient-to-r from-teal-900 to-orange-200 p-10 rounded-xl shadow text-white text-center border-teal-800 border-3">
                    <h3 className="text-2xl font-semibold mb-3">Connect with an Advisor</h3>
                    <p className="mb-5 text-base">
                        Get in touch to learn more about our Job Search & Placement programs.
                    </p>
                    <button
                        className="bg-white text-teal-800 font-semibold px-6 py-2 rounded shadow hover:bg-gray-100 transition ">
                        Connect Now
                    </button>
                </section>
            </main>

            <Footer/>
        </>
    )
        ;
}
