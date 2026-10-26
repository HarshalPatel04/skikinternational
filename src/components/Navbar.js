
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Menu,
    X,
    ChevronDown,
    ArrowUpRight,
    Phone,
} from "lucide-react";

const destinations = [
    { name: "United Kingdom", code: "UK" },
    { name: "United States", code: "USA" },
    { name: "Canada", code: "CA" },
    { name: "Australia", code: "AU" },
    { name: "Europe", code: "EU" },
    { name: "Dubai", code: "AE" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [countriesOpen, setCountriesOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-xl">
            <div className="container-width flex h-[78px] items-center justify-between gap-6">

                <Link href="/" className="flex shrink-0 items-center gap-3">
                    <img
                        src="/logo.avif"
                        alt="Skik International"
                        className="h-12 w-12 rounded-xl object-contain"
                    />

                    <div>
                        <p className="text-base font-bold tracking-tight text-navy">
                            SKIK INTERNATIONAL
                        </p>
                        <p className="mt-1 text-[10px] font-semibold tracking-[0.2em] text-slate-500">
                            YOUR GLOBAL JOURNEY
                        </p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-7 lg:flex">
                    <Link href="/" className="text-sm font-semibold text-navy">
                        Home
                    </Link>

                    <Link
                        href="/about"
                        className="text-sm text-muted transition hover:text-navy"
                    >
                        About Us
                    </Link>


                    <div className="group relative">
                        <div className="flex items-center gap-1.5">
                            <Link
                                href="/countries"
                                className="text-sm text-muted transition hover:text-navy"
                            >
                                Explore Abroad
                            </Link>

                            <button
                                type="button"
                                onClick={() => setCountriesOpen(!countriesOpen)}
                                aria-label="Toggle country menu"
                                aria-expanded={countriesOpen}
                                className="text-muted transition hover:text-navy"
                            >
                                <ChevronDown size={15} />
                            </button>
                        </div>

                        <div
                            className={`absolute left-0 top-full w-56 pt-4 transition-all ${countriesOpen
                                ? "visible translate-y-0 opacity-100"
                                : "invisible translate-y-2 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
                                }`}
                        >
                            <div className="rounded-xl border border-border bg-white p-2 shadow-xl">
                                {[
                                    { name: "United Kingdom", slug: "uk" },
                                    { name: "United States", slug: "usa" },
                                    { name: "Canada", slug: "canada" },
                                    { name: "Australia", slug: "australia" },
                                    { name: "Dubai", slug: "dubai" },
                                ].map((destination) => (
                                    <Link
                                        key={destination.slug}
                                        href={`/countries/${destination.slug}`}
                                        onClick={() => setCountriesOpen(false)}
                                        className="block rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-surface hover:text-navy"
                                    >
                                        {destination.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Link
                        href="/services"
                        className="text-sm text-muted transition hover:text-navy"
                    >
                        Services
                    </Link>

                    <Link
                        href="/contact"
                        className="text-sm text-muted transition hover:text-navy"
                    >
                        Contact
                    </Link>
                </nav>

                <div className="hidden items-center gap-4 lg:flex">
                    <a
                        href="tel:8000576969"
                        className="flex items-center gap-2 text-sm font-semibold text-navy"
                    >
                        <Phone size={16} />
                        80005 76969
                    </a>

                    <Link
                        href="/contact"
                        style={{ color: "#ffffff" }}
                        className="flex items-center gap-2 rounded-lg bg-navy px-5 py-3 text-sm font-semibold transition hover:bg-brand-blue"
                    >
                        Free Consultation
                        <ArrowUpRight size={16} />
                    </Link>

                </div>

                <button
                    onClick={() => setOpen(!open)}
                    aria-label={open ? "Close navigation" : "Open navigation"}
                    aria-expanded={open}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-navy lg:hidden"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {open && (
                <nav className="border-t border-border bg-white px-5 py-5 lg:hidden">
                    <div className="container-width flex flex-col gap-1">
                        {[
                            ["Home", "/"],
                            ["About Us", "/about"],
                            ["Explore Abroad", "/countries"],
                            ["Services", "/services"],
                            ["Contact", "/contact"],
                        ].map(([label, href]) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={() => setOpen(false)}
                                className="rounded-lg px-3 py-3 font-medium text-navy hover:bg-surface"
                            >
                                {label}
                            </Link>
                        ))}

                        <a
                            href="tel:8000576969"
                            className="navy-white-button mt-3 rounded-lg bg-navy px-4 py-3 text-center font-semibold"
                        >
                            Call Us: 80005 76969
                        </a>
                    </div>
                </nav>
            )}
        </header>
    );
}
