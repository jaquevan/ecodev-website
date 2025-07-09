'use client';

import React from 'react';

export type RegistrationStep = {
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
};

interface RegistrationStepsProps {
    heading?: string;
    subheading?: string;
    steps: RegistrationStep[];
}

export default function RegistrationSteps({ heading = "Registration Process", subheading, steps }: RegistrationStepsProps) {
    if (!steps || steps.length === 0) return null;

    return (
        <section className="py-12">
            <div className="container mx-auto max-w-5xl px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#00464D] mb-4">{heading}</h2>
                {subheading && (
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">{subheading}</p>
                )}

                {steps.length === 1 ? (
                    <div className="flex justify-center">
                        <StepCard step={steps[0]} />
                    </div>
                ) : (
                    <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <StepCard step={step} />
                                {index < steps.length - 1 && (
                                    <Trail />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

function StepCard({ step }: { step: RegistrationStep }) {
    return (
        <div className="bg-[#FFFDF5] border border-[#FCD3B6] rounded-xl shadow-md p-6 w-64 text-center hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-[#FFE6D3] text-[#FF7001] mx-auto">
                {step.icon ?? <DefaultIcon />}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#212020]">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
        </div>
    );
}

function Trail() {
    return (
        <div className="hidden md:block w-24 h-10 relative">
            <svg
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
            >
                <path
                    d="M0 10 C 25 0, 75 20, 100 10"
                    fill="transparent"
                    stroke="#FF7001"
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
}

function DefaultIcon() {
    return (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path d="M12 2a10 10 0 00-6.93 17.07A10 10 0 1012 2z" />
        </svg>
    );
}
