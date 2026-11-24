
"use client";

import { useEffect, useRef, useState } from "react";
import {
    UserRoundSearch,
    GraduationCap,
    BookOpenCheck,
    FileCheck,
    Plane,
} from "lucide-react";

const processes = [
    {
        number: "01",
        title: "Profile Evaluation",
        description:
            "Start your global journey with a detailed assessment of your academic background, interests, goals, and eligibility. Our counsellors help you understand the opportunities that match your profile.",
        icon: UserRoundSearch,
        button: "Get Your Profile Evaluated",
    },
    {
        number: "02",
        title: "University & Course Selection",
        description:
            "Explore universities and courses that match your ambitions. Our counsellors help you shortlist the right options based on your goals, academic profile, and eligibility.",
        icon: GraduationCap,
        button: "Explore University Options",
    },
    {
        number: "03",
        title: "Test Preparation",
        description:
            "Prepare for IELTS, PTE and other required language tests with structured guidance, expert support, and a preparation plan designed around your target score.",
        icon: BookOpenCheck,
        button: "Explore Test Preparation",
    },
    {
        number: "04",
        title: "University Application",
        description:
            "Move forward with confidence. Our team supports you through applications, documentation, statements, and submission requirements for your selected universities.",
        icon: FileCheck,
        button: "Get Application Assistance",
    },
    {
        number: "05",
        title: "Visa & Pre-Departure Guidance",
        description:
            "Get ready for your international journey with visa documentation support, interview preparation, and essential pre-departure guidance.",
        icon: Plane,
        button: "Prepare for Your Journey",
    },
];

const FLIGHT_PATH =
    "M 70 570 C 220 570, 250 150, 480 190 S 700 650, 900 490 S 1120 100, 1370 210";

export default function JourneyProcess() {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);

    const [flight, setFlight] = useState({
        x: 70,
        y: 570,
        angle: 0,
    });

    const [activeStep, setActiveStep] = useState(-1);

    useEffect(() => {
        const section = sectionRef.current;
        const path = pathRef.current;

        if (!section || !path) return;

        let frame;

        const update = () => {
            cancelAnimationFrame(frame);

            frame = requestAnimationFrame(() => {
                const rect = section.getBoundingClientRect();
                const distance = section.offsetHeight - window.innerHeight;

                const progress = Math.max(
                    0,
                    Math.min(1, -rect.top / distance)
                );

                const length = path.getTotalLength();

                const pointAt = path.getPointAtLength(progress * length);

                const nextPoint = path.getPointAtLength(
                    Math.min(length, progress * length + 2)
                );

                const angle =
                    (Math.atan2(
                        nextPoint.y - pointAt.y,
                        nextPoint.x - pointAt.x
                    ) *
                        180) /
                    Math.PI;

                // First state is the plane alone.
                // Then reveal each process as the plane travels.
                let step = -1;

                if (progress >= 0.08) {
                    step = Math.min(
                        4,
                        Math.floor(((progress - 0.08) / 0.92) * 5)
                    );
                }

                setFlight({
                    x: pointAt.x,
                    y: pointAt.y,
                    angle,
                });

                setActiveStep(step);
            });
        };

        update();

        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    const current = activeStep >= 0 ? processes[activeStep] : null;
    const ActiveIcon = current?.icon;

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#f7faff]"
            style={{ height: "600vh" }}
        >
            <div className="sticky top-0 h-screen overflow-hidden">

                {/* HEADER */}
                <div className="absolute left-0 top-0 z-30 w-full pt-10 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#79b83d]">
                        Your Journey With Us
                    </p>

                    <h2 className="mt-3 px-4 text-3xl font-semibold text-[#0b4b9b] sm:text-4xl">
                        Your Global Journey, Simplified
                    </h2>
                </div>

                {/* FLIGHT PATH */}
                <div className="absolute inset-0 flex items-center">
                    <svg
                        viewBox="0 0 1440 760"
                        preserveAspectRatio="none"
                        className="h-full w-full overflow-visible"
                    >
                        {/* Soft path background */}
                        <path
                            d={FLIGHT_PATH}
                            fill="none"
                            stroke="#e4edfa"
                            strokeWidth="38"
                            strokeLinecap="round"
                        />

                        {/* Actual measurement path */}
                        <path
                            ref={pathRef}
                            d={FLIGHT_PATH}
                            fill="none"
                            stroke="transparent"
                            strokeWidth="1"
                        />

                        {/* Milestone dots */}
                        {[0.08, 0.264, 0.448, 0.632, 0.816, 1].map(
                            (position, index) => {
                                const point = pathRef.current?.getPointAtLength(
                                    position *
                                    (pathRef.current?.getTotalLength() || 0)
                                );

                                return point ? (
                                    <circle
                                        key={index}
                                        cx={point.x}
                                        cy={point.y}
                                        r="9"
                                        fill="#ffffff"
                                        stroke="#0b4b9b"
                                        strokeWidth="3"
                                    />
                                ) : null;
                            }
                        )}
                    </svg>
                </div>

                {/* MOVING PLANE */}
                <div
                    className="pointer-events-none absolute z-20"
                    style={{
                        left: `${(flight.x / 1440) * 100}%`,
                        top: `${(flight.y / 760) * 100}%`,
                        transform: `translate(-50%, -50%) rotate(${flight.angle}deg)`,
                    }}
                >
                    <img
                        src="/images/plane.png"
                        alt=""
                        className="h-16 w-24 object-contain drop-shadow-lg sm:h-20 sm:w-32"
                    />
                </div>

                {/* INITIAL STATE */}
                {activeStep === -1 && (
                    <div className="absolute bottom-[12%] left-1/2 z-10 -translate-x-1/2 text-center">
                        <p className="text-sm font-medium tracking-wide text-slate-500">
                            Every great journey starts with a first step.
                        </p>
                        <p className="mt-2 text-xs font-bold uppercase tracking-[0.25em] text-[#0b4b9b]">
                            Scroll to begin your journey
                        </p>
                    </div>
                )}

                {/* PROCESS CONTENT */}
                {current && (
                    <div
                        key={activeStep}
                        className="absolute bottom-[10%] left-1/2 z-20 w-[90%] max-w-[760px] -translate-x-1/2 rounded-3xl border border-[#e5edf8] bg-white/95 p-6 text-center shadow-[0_20px_80px_rgba(11,75,155,0.08)] backdrop-blur-sm animate-[journeyFade_.6s_ease] sm:bottom-[9%] sm:p-10"
                    >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ff] text-[#0b4b9b]">
                            <ActiveIcon size={29} strokeWidth={1.6} />
                        </div>

                        <p className="mt-5 text-xs font-bold tracking-[0.28em] text-[#79b83d]">
                            STEP {current.number} / 05
                        </p>

                        <h3 className="mt-3 text-2xl font-semibold text-[#0b4b9b] sm:text-4xl">
                            {current.title}
                        </h3>

                        <p className="mx-auto mt-4 max-w-[650px] text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                            {current.description}
                        </p>

                        <a
                            href="/contact"
                            className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#0b4b9b] px-7 py-3.5 text-sm font-semibold textgreen transition-all duration-300 hover:-translate-y-1 hover:bg-[#083b7c]"
                        >
                            {current.button}
                            <span>↗</span>
                        </a>
                    </div>
                )}

                {/* BOTTOM PROGRESS */}
                <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2">
                    {processes.map((process, index) => (
                        <div
                            key={process.number}
                            className={`h-1.5 rounded-full transition-all duration-500 ${activeStep === index
                                    ? "w-10 bg-[#0b4b9b]"
                                    : "w-5 bg-[#dce6f4]"
                                }`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes journeyFade {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
