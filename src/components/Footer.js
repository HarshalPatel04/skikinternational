
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";

const services = [
    { label: "Study Abroad", href: "/services" },
    { label: "Visa Guidance", href: "/services" },
    { label: "IELTS & PTE", href: "/services" },
    { label: "Spoken English", href: "/services" },
];

export default function Footer() {
    return (
        <footer className="bg-[#07182D] text-white">
            <div className="mx-auto max-w-[1370px] px-6 py-16 md:px-10 lg:py-20">
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
                    {/* BRAND */}
                    <div>
                        <Link
                            href="/"
                            className="inline-block text-xl font-bold tracking-tight"
                        >
                            SKIK INTERNATIONAL
                        </Link>

                        <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-slate-400">
                            YOUR GLOBAL JOURNEY
                        </p>

                        <p className="mt-6 max-w-xs text-sm leading-7 text-slate-300">
                            Helping students explore international education opportunities
                            through personalized guidance and support.
                        </p>
                    </div>

                    {/* EXPLORE */}
                    <div>
                        <h3 className="font-bold">Explore</h3>

                        <div className="mt-5 flex flex-col items-start gap-4 text-sm text-slate-300">
                            <Link className="transition hover:text-[#86C33C]" href="/about">
                                About Us
                            </Link>
                            <Link
                                className="transition hover:text-[#86C33C]"
                                href="/countries"
                            >
                                Explore Abroad
                            </Link>
                            <Link
                                className="transition hover:text-[#86C33C]"
                                href="/services"
                            >
                                Our Services
                            </Link>
                            <Link
                                className="transition hover:text-[#86C33C]"
                                href="/contact"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h3 className="font-bold">Our Services</h3>

                        <div className="mt-5 flex flex-col items-start gap-4 text-sm text-slate-300">
                            {services.map((service) => (
                                <Link
                                    key={service.label}
                                    href={service.href}
                                    className="transition hover:text-[#86C33C]"
                                >
                                    {service.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="font-bold">Our Branches</h3>

                        <div className="mt-5 space-y-5 text-sm leading-6 text-slate-300">

                            <a
                                href="https://maps.app.goo.gl/jcmjWsHQxdb2eJKM6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 transition-colors hover:text-[#86C33C]"
                            >
                                <MapPin
                                    size={18}
                                    className="mt-1 shrink-0 text-[#86C33C]"
                                />

                                <p>
                                    A-302, Pragati IT Park,
                                    <br />
                                    Surat, Gujarat.
                                </p>
                            </a>

                            <a
                                href="https://maps.app.goo.gl/BpaXWSrz8MJVCP1D6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 transition-colors hover:text-[#86C33C]"
                            >
                                <MapPin
                                    size={18}
                                    className="mt-1 shrink-0 text-[#86C33C]"
                                />

                                <p>
                                    315, Akshar Complex,
                                    <br />
                                    Ahmedabad, Gujarat.
                                </p>
                            </a>

                            <a
                                href="https://maps.app.goo.gl/z3YC8vYby5GMbKiA8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 transition-colors hover:text-[#86C33C]"
                            >
                                <MapPin
                                    size={18}
                                    className="mt-1 shrink-0 text-[#86C33C]"
                                />

                                <p>
                                    108/109, Shivaji Chowk,
                                    <br />
                                    Bardoli, Gujarat.
                                </p>
                            </a>

                            <a
                                href="https://maps.app.goo.gl/43gkhwZDDbP8nfjYA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 transition-colors hover:text-[#86C33C]"
                            >
                                <MapPin
                                    size={18}
                                    className="mt-1 shrink-0 text-[#86C33C]"
                                />

                                <p>
                                    S/10-13, Ganesh SQUARE,
                                    <br />
                                    Ankleshwar, Gujarat.
                                </p>
                            </a>
                        </div>
                    </div>

                    <div>

                        <h3 className="font-bold">Get in touch</h3>

                        <div className="mt-5 space-y-5 text-sm leading-6 text-slate-300">


                            <a
                                href="tel:8000576969"
                                className="flex items-center gap-3 transition hover:text-[#86C33C]"
                            >
                                <Phone size={17} className="text-[#86C33C]" />
                                80005 76969
                            </a>

                            <a
                                href="mailto:skikinternational@gmail.com"
                                className="flex items-center gap-3 break-all transition hover:text-[#86C33C]"
                            >
                                <Mail size={17} className="shrink-0 text-[#86C33C]" />
                                skikinternational@gmail.com
                            </a>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-[#86C33C]"
                            >
                                Talk to our team <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* SOCIAL MEDIA */}
                    <div className="footer-socials">

                        <div className="footer-socials-list">
                            <a
                                href="https://www.facebook.com/Skikinternational"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <img
                                    src="/facebook.png"
                                    alt="Facebook"
                                    className="h-7 w-7 brightness-0 invert"
                                />
                            </a>

                            <a
                                href="https://www.instagram.com/skik_international"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <img
                                    src="/instagram.png"
                                    alt="Instagram"
                                    className="h-6 w-6 brightness-0 invert"
                                />
                            </a>

                            <a
                                href="https://www.linkedin.com/company/skik-international-pvt-ltd"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <img
                                    src="/linkedin.png"
                                    alt="LinkedIn"
                                    className="h-7 w-7 brightness-0 invert"
                                />
                            </a>

                            <a
                                href="https://x.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X"
                            >
                                <img
                                    src="/twitter.png"
                                    alt="X"
                                    className="h-5 w-5 brightness-0 invert"
                                />
                            </a>
                        </div>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="mt-4 flex flex-col gap-5 border-t border-white/10 pt-7 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Skik International. All rights
                        reserved.
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <Link
                            href="/privacy-policy"
                            className="transition hover:text-white"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms-and-conditions"
                            className="transition hover:text-white"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
