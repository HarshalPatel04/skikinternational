"use client";

import { useEffect, useState, useRef } from "react";

export function HeroTypingHeading() {
    const fullText = "Your Global\nDreams Begin\nRight Here.";

    const [typedCount, setTypedCount] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const isComplete = typedCount === fullText.length;

    useEffect(() => {
        let timeout;

        if (!isDeleting && typedCount === fullText.length) {
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 1800);
        } else if (isDeleting && typedCount === 0) {
            timeout = setTimeout(() => {
                setIsDeleting(false);
            }, 500);
        } else {
            timeout = setTimeout(() => {
                setTypedCount((count) =>
                    count + (isDeleting ? -1 : 1)
                );
            }, isDeleting ? 35 : 85);
        }

        return () => clearTimeout(timeout);
    }, [typedCount, isDeleting]);

    const lines = fullText.slice(0, typedCount).split("\n");

    return (
        <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold leading-[1.12] tracking-tight text-white">
            <span>{lines[0] || ""}</span>
            <br />

            <span>{lines[1] || ""}</span>
            <br />

            <span
                key={isComplete ? "stamped" : "typing"}
                className={`inline-block text-[#8BCB3F] ${isComplete ? "animate-stamp" : ""
                    }`}
            >
                {lines[2] || ""}
            </span>

            <span className="inline-block ml-1 h-[0.9em] w-[3px] bg-[#8BCB3F] animate-pulse align-middle" />
        </h1>
    );
}

export function AnimatedStat({ value }) {
    const elementRef = useRef(null);
    const [count, setCount] = useState(0);

    const target = Number(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9,]/g, "");

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) {
            setCount(target);
            return;
        }

        let animationFrame;
        let started = false;

        const startCounting = () => {
            if (started) return;
            started = true;

            const duration = 1400;
            let startTime = null;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;

                const progress = Math.min(
                    (timestamp - startTime) / duration,
                    1
                );

                // Smooth ease-out counting animation
                const easedProgress = 1 - Math.pow(1 - progress, 4);

                setCount(Math.floor(easedProgress * target));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setCount(target);
                }
            };

            animationFrame = requestAnimationFrame(animate);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    startCounting();
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, [target]);

    return (
        <p
            ref={elementRef}
            className="font-heading text-3xl font-extrabold text-navy"
            aria-label={value}
        >
            {count.toLocaleString("en-IN")}
            {suffix}
        </p>
    );
}
