import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';

type ProgramItem = {
    label: string;
    icon: ReactNode;
    image?: string;
    subItems?: string[];
};

type ProgramCardProps = {
    title: string;
    category: string;
    items: ProgramItem[];
    colorScheme: 'indigo' | 'teal' | 'amber';
};

export default function ProgramCards({ title, category, items, colorScheme }: ProgramCardProps) {
    const colors = {
        indigo: {
            iconBg: 'bg-blue-500',
            iconColor: 'text-white',
            button: 'bg-indigo-700 hover:bg-indigo-800',
        },
        teal: {
            iconBg: 'bg-emerald-400',
            iconColor: 'text-white',
            button: 'bg-teal-600 hover:bg-teal-800',
        },
        amber: {
            iconBg: 'bg-amber-500',
            iconColor: 'text-white',
            button: 'bg-amber-700 hover:bg-amber-700',
        },
    };

    const color = colors[colorScheme];

    return (
        <div
            className="flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-6 space-y-4 max-w-sm mx-auto">
            {/* Icon */}
            <div className="flex items-center justify-center space-x-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-md ${color.iconBg}`}>
                    <span className={`text-lg ${color.iconColor}`}>{items[0].icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
            </div>

            <div>
                <p className="text-sm text-slate-600 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            {/*  image */}
            {items[0]?.image && (
                <div
                    className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm fill flex justify-center animate-bubble">
                    <Image
                        src={items[0].image}
                        alt={`${title} image`}
                        width={160}
                        height={160}
                        className="object-cover"
                    />
                </div>
            )}

            <div className="text-md space-y-2 font-medium text-slate-700">
                {items[0]?.label && <p>{items[0].label}</p>}
                {items[0]?.subItems?.map((item, idx) => (
                    <p key={idx}>{item}</p>
                ))}
            </div>

            {/* Button */}
            <div className="mt-auto pt-6">
                <Link href={`/course?category=${category}`}>
                    <button
                        className={`${color.button} text-white py-2 px-5 rounded-md font-semibold shadow hover:shadow-md transition w-full`}
                    >
                        Learn More
                    </button>
                </Link>
            </div>
        </div>
    );
}