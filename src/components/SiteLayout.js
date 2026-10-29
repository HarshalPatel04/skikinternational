"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteLayout({ children }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin");
    const WHATSAPP = "https://wa.me/918000576969";

    // Keep admin pages separate from the public website layout.
    if (isAdminPage) {
        return children;
    }

    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />

            {/* FLOATING WHATSAPP */}
            <a
                href={`${WHATSAPP}?text=${encodeURIComponent(
                    `Hello SKIK International, I would like to discuss my plans for Abroad.`
                )}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with Skik International on WhatsApp"
                className="fixed bottom-7 right-7 z-40 flex items-center justify-center rounded-full shadow-lg transition hover:scale-105 animate-bounce"
            >
                <img
                    src="/whatsapp.png"
                    alt="WhatsApp Icon"
                    className="h-13 w-13"
                />
            </a>
        </>
    );
}