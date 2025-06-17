'use client';

interface LoadingProps {
    className?: string;
}

export default function Loading({ className = '' }: LoadingProps) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative w-16 h-16">
                {/* Outer circle */}
                <div className="absolute inset-0 border-4 border-[#00464D]/20 rounded-full" />
                {/* Spinning circle */}
                <div className="absolute inset-0 border-4 border-transparent border-t-[#00464D] rounded-full animate-spin" />
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
}