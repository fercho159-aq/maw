"use client";

import { cn } from "@/lib/utils";

interface TypewriterTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
}

const TypewriterTitle: React.FC<TypewriterTitleProps> = ({ text, className }) => {
    // Calculate animation duration based on text length
    const animationDuration = `${text.length * 0.05}s`;
    
    // Calculate steps based on text length for a more natural typing speed
    const steps = text.length;

    return (
        <div className={cn("inline-block", className)}>
            <h1 
                className="font-headline text-4xl sm:text-5xl font-bold typewriter w-fit"
                style={{
                    animationDuration: `${animationDuration}, 0.75s`,
                    animationTimingFunction: `steps(${steps}, end), step-end`,
                    animationIterationCount: '1, infinite',
                    width: 'auto'
                }}
            >
                {text}
            </h1>
        </div>
    );
};

export default TypewriterTitle;

    