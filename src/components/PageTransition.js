"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
    const pathname = usePathname();
    const [visible, setVisible] = useState(false);
    const firstRender = useRef(true);
    const timer = useRef(null);

    useEffect(() => {
        if (visible) {
            document.body.classList.add("page-transitioning");
        } else {
            document.body.classList.remove("page-transitioning");
        }

        return () => {
            document.body.classList.remove("page-transitioning");
        };
    }, [visible]);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        setVisible(true);

        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            setVisible(false);
        }, 1000);

        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [pathname]);

    if (!visible) return null;

    return (
        <div className="page-transition-overlay">
            <div className="transition-logo">
                <img
                    src="/logo.png"
                    alt="SKIK International"
                    className="rounded-full"
                />

                <div className="plane-orbit">
                    <span>✈️</span>
                </div>
            </div>
        </div>
    );
}
