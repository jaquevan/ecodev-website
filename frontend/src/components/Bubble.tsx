import React from 'react';

// props
export interface BubbleProps {
    color?: string;
    size?: number | string;
    className?: string;
    style?: React.CSSProperties;
    floating?: boolean;
    animationDuration?: string;
    animationDelay?: string;
}

const Bubble: React.FC<BubbleProps> = ({
                                           color = '#FFD700',
                                           size = 80,
                                           className = '',
                                           style = {},
                                           floating = false,
                                           animationDuration = '6s',
                                           animationDelay = '0s',
                                       }) => {
    // Normalize numeric values (px) and pass through strings unchanged
    const dimension = typeof size === 'number' ? `${size}px` : size;

    const animationStyle = floating ? {
        animation: `float ${animationDuration} ease-in-out infinite`,
        animationDelay,
    } : {};

    return (
        <div
            className={className}
            style={{
                backgroundColor: color,
                width: dimension,
                height: dimension,
                borderRadius: '50%',
                display: 'inline-block',
                ...animationStyle,
                ...style,
            }}
        />
    );
};

// BubbleBackground component props
interface BubbleConfig {
    color: string;
    size: number;
    top: string;
    left: string;
    delay?: string;
    duration?: string;
}

interface BubbleBackgroundProps {
    bubbles: BubbleConfig[];
}

const BubbleBackground: React.FC<BubbleBackgroundProps> = ({ bubbles }) => {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
            aria-hidden="true"
        >
            {bubbles.map((bubble, i) => (
                <Bubble
                    key={i}
                    color={bubble.color}
                    size={bubble.size}
                    floating={true}
                    animationDuration={bubble.duration || '6s'}
                    animationDelay={bubble.delay || '0s'}
                    style={{
                        position: 'absolute',
                        top: bubble.top,
                        left: bubble.left,
                        opacity: 0.5,
                    }}
                />
            ))}
        </div>
    );
};

export { Bubble };
export default BubbleBackground;