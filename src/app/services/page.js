
import Link from "next/link";
import {
    GraduationCap,
    FileCheck2,
    Languages,
    MessageCircle,
    Globe2,
    ArrowUpRight,
    CheckCircle2,
} from "lucide-react";

const serviceGroups = [
    {
        number: "01",
        title: "Study Abroad Consultancy",
        description:
            "Explore international education opportunities with guidance on destinations, university options, courses, and admission requirements.",
        icon: GraduationCap,
        services: [
            "University and course selection",
            "Admission guidance",
            "Application documentation",
            "Study destination planning",
        ],
    },
    {
        number: "02",
        title: "Visa Services",
        description:
            "Get guidance on preparing your visa application and understanding the documentation required for your circumstances.",
        icon: FileCheck2,
        services: [
            "Student visa guidance",
            "Spouse visa guidance",
            "Visitor visa guidance",
            "Application document preparation",
        ],
    },
    {
        number: "03",
        title: "IELTS & PTE Coaching",
        description:
            "Prepare for English language proficiency tests with structured learning, practice, and support.",
        icon: Languages,
        services: [
            "IELTS preparation",
            "PTE preparation",
            "Practice and test strategies",
            "English language improvement",
        ],
    },
    {
        number: "04",
        title: "Spoken English",
        description:
            "Build your English communication skills and confidence for education, professional, and everyday situations.",
        icon: MessageCircle,
        services: [
            "Speaking practice",
            "Vocabulary development",
            "Communication skills",
            "Confidence building",
        ],
    },
];

const destinations = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Europe",
    "Dubai",
];

export default function ServicesPage() {
    return (
        <main>
            {/* HERO */}
            <section className="bg-navy px-5 py-20 text-white sm:py-22">
                <div className="mx-auto max-w-7xl">
                    <p className="section-label !text-[#86C33C]">
                        Our services
                    </p>

                    <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight sm:text-6xl">
                        The right guidance for your global ambitions.
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        From choosing a study destination to preparing for
                        English language tests and visa applications, SKIK
                        International helps you plan your next step.
                    </p>

                    <Link
                        href="/contact"
                        style={{ color: "#ffffff" }}
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-6 py-4 font-semibold transition hover:bg-[#86C33C]"
                    >
                        Discuss Your Goals <ArrowUpRight size={18} />
                    </Link>
                </div>
            </section>

            {/* SERVICES */}
            <section className="bg-surface px-5 py-20 sm:py-14">
                <div className="mx-auto max-w-7xl">
                    <p className="section-label">How we help</p>

                    <h2 className="mt-5 max-w-2xl font-heading text-3xl font-bold text-navy sm:text-4xl">
                        Support for every stage of your journey.
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-muted">
                        Choose the service you need and speak with our team
                        about the options available for your situation.
                    </p>

                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        {serviceGroups.map((service) => {
                            const Icon = service.icon;

                            return (
                                <article
                                    key={service.number}
                                    className="rounded-2xl border border-border bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg sm:p-9"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-brand-blue">
                                            <Icon size={27} strokeWidth={1.7} />
                                        </div>

                                        <span className="font-heading text-sm font-bold text-slate-300">
                                            {service.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-6 font-heading text-2xl font-bold text-navy">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-muted">
                                        {service.description}
                                    </p>

                                    <ul className="mt-6 space-y-3">
                                        {service.services.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3 text-sm text-slate-700"
                                            >
                                                <CheckCircle2
                                                    size={18}
                                                    className="mt-0.5 shrink-0 text-brand-blue"
                                                />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href="/contact"
                                        className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-blue transition hover:gap-3"
                                    >
                                        Enquire about this service
                                        <ArrowUpRight size={17} />
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* DESTINATIONS */}
            <section className="bg-white px-5 py-16 sm:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="section-label">Explore destinations</p>

                            <h2 className="mt-5 font-heading text-3xl font-bold text-navy sm:text-4xl">
                                Where would you like to go?
                            </h2>
                        </div>

                        <Link
                            href="/countries"
                            className="inline-flex items-center gap-2 font-semibold text-brand-blue"
                        >
                            View all destinations <ArrowUpRight size={18} />
                        </Link>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        {destinations.map((destination) => (
                            <span
                                key={destination}
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-navy"
                            >
                                <Globe2 size={16} className="text-brand-blue" />
                                {destination}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-surface px-5 py-16 sm:py-20">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-2xl bg-navy p-8 text-white sm:p-12 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="section-label !text-[#86C33C]">
                            Let's get started
                        </p>

                        <h2 className="mt-5 font-heading text-3xl font-bold sm:text-4xl">
                            Your next chapter starts with a conversation.
                        </h2>

                        <p className="mt-4 leading-7 text-slate-300">
                            Tell us about your plans and find out how our team
                            can help you understand your next steps.
                        </p>
                    </div>

                    <Link
                        href="/contact"
                        style={{ color: "#ffffff" }}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-4 font-semibold transition hover:bg-[#86C33C]"
                    >
                        Contact Our Team <ArrowUpRight size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
