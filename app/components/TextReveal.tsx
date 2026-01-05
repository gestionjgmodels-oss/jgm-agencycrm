"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?~ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function TextReveal({ children, className }: { children: string, className?: string }) {
    const [displayText, setDisplayText] = useState(children);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    useEffect(() => {
        if (!isInView) return;

        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                children
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return children[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= children.length) {
                clearInterval(interval);
            }

            iteration += 1 / 2; // Speed of reveal
        }, 30);

        return () => clearInterval(interval);
    }, [children, isInView]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
}
