import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { StaticImageData } from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type ProgramItem = {
    label: string;
    icon: ReactNode;
    image?: string | StaticImageData;
    subItems?: string[];
};

type ProgramCardProps = {
    title: string;
    category: string;
    items: ProgramItem[];
    colorScheme: 'indigo' | 'teal' | 'amber';
};

const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
        },
    },
};

export default function ProgramCards({ title, category, items, colorScheme }: ProgramCardProps) {
    const { ref, inView } = useInView({ triggerOnce: false });

    const colors = {
        indigo: {
            bg: 'bg-white',
            border: 'border-indigo-200',
            iconBg: 'bg-indigo-400',
            iconColor: 'text-white',
            hoverBg: 'hover:bg-indigo-100',
            itemText: 'text-indigo-800',
            itemBorder: 'border-indigo-200',
            button: 'bg-indigo-600 hover:bg-indigo-700',
        },
        teal: {
            bg: 'bg-white',
            border: 'border-indigo-200',
            iconBg: 'bg-teal-400',
            iconColor: 'text-white',
            hoverBg: 'hover:bg-teal-100',
            itemText: 'text-teal-800',
            itemBorder: 'border-teal-200',
            button: 'bg-teal-600 hover:bg-teal-700',
        },
        amber: {
            bg: 'bg-white',
            border: 'border-indigo-200',
            iconBg: 'bg-amber-400',
            iconColor: 'text-white',
            hoverBg: 'hover:bg-amber-100',
            itemText: 'text-amber-800',
            itemBorder: 'border-amber-200',
            button: 'bg-amber-600 hover:bg-amber-700',
        },
    };

    const color = colors[colorScheme];

    return (
        <motion.div
            ref={ref}
            variants={staggerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className={`flex flex-col items-center text-center rounded-xl shadow-md p-6 space-y-5 max-w-sm mx-auto
                        ${color.bg} border ${color.border} transition-all duration-300`}
        >
            {/* Icon and Title */}
            <motion.div variants={bubbleVariants} className="flex items-center justify-center space-x-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-md ${color.iconBg} shadow-sm`}>
                    <span className={`text-lg ${color.iconColor}`}>{items[0].icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
            </motion.div>

            <motion.div variants={bubbleVariants}>
                <p className="text-sm text-slate-600 mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </motion.div>

            {/* Image */}
            {items[0]?.image && (
                <motion.div
                    variants={bubbleVariants}
                    className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-md flex justify-center hover:scale-101 transition-transform duration-300 animate-bubble"
                >
                    <Image
                        src={items[0].image}
                        alt={`${title} image`}
                        width={176}
                        height={176}
                        className="object-cover"
                    />
                </motion.div>
            )}

            {/* Sub Items */}
            <motion.div variants={bubbleVariants} className="w-full space-y-2 font-medium text-slate-700">
                {items[0]?.subItems?.map((item, idx) => (
                    <Link href={`/course?category=${category}`} key={idx} className="block">
                        <div className={`rounded-lg border ${color.itemBorder} p-3 text-left ${color.hoverBg} transition-all duration-200
                                        flex items-center justify-between cursor-pointer group`}>
                            <span className={`group-hover:${color.itemText}`}>{item}</span>
                            <ArrowForwardIosIcon
                                fontSize="small"
                                className={`opacity-60 group-hover:opacity-100 ${color.itemText}`}
                            />
                        </div>
                    </Link>
                ))}
            </motion.div>

            {/* Button */}
            <motion.div variants={bubbleVariants} className="w-full mt-auto pt-4">
                <Link href={`/course?category=${category}`} className="block">
                    <button
                        className={`${color.button} text-white py-3 px-5 rounded-lg font-semibold shadow-sm hover:shadow transition w-full`}
                    >
                        Learn More
                    </button>
                </Link>
            </motion.div>
        </motion.div>
    );
}