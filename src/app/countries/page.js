
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    GraduationCap,
    HeartHandshake,
    Plane,
    Languages,
    FileCheck2,
    Users,
    Globe2,
    MessageCircle,
    CheckCircle2,
} from "lucide-react";

const visaServices = [
    {
        number: "01",
        title: "Study Visa",
        description:
            "Explore universities, courses, and international education opportunities that match your ambitions.",
        icon: GraduationCap,
        href: "/services",
        label: "Education pathways",
    },
    {
        number: "02",
        title: "Spouse Visa",
        description:
            "Get guidance on spouse visa requirements, supporting documents, and the application process.",
        icon: HeartHandshake,
        href: "/services",
        label: "Join your partner",
    },
    {
        number: "03",
        title: "Visitor Visa",
        description:
            "Prepare for international visits to see family, meet friends, or explore a new destination.",
        icon: Plane,
        href: "/services",
        label: "Visit with confidence",
    },
    {
        number: "04",
        title: "IELTS & PTE",
        description:
            "Build your English language skills with structured preparation for IELTS and PTE exams.",
        icon: Languages,
        href: "/services",
        label: "Language preparation",
    },
];

const destinations = [
    {
        name: "United States",
        slug: "usa",
        description:
            "Explore universities, diverse courses, and international opportunities.",
        image:
            "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=900&q=85",
        position: "center",
    },
    {
        name: "Canada",
        slug: "canada",
        description:
            "Discover education opportunities and a welcoming multicultural environment.",
        image:
            "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=900&q=85",
        position: "center",
    },
    {
        name: "United Kingdom",
        slug: "united-kingdom",
        description:
            "Explore established universities and a wide range of academic programs.",
        image:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85",
        position: "center",
    },
    {
        name: "Australia",
        slug: "australia",
        description:
            "Discover opportunities in Australia's vibrant cities and communities.",
        image:
            "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=85",
        position: "center",
    },
    {
        name: "Dubai",
        slug: "dubai",
        description:
            "Explore educational opportunities and experience life in Dubai's dynamic, multicultural city.",
        image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85",
        position: "center",
    },
];

const supportSteps = [
    {
        number: "01",
        title: "Understand your goals",
        description:
            "Discuss your plans, circumstances, preferred destination, and the type of visa you need.",
        icon: Users,
    },
    {
        number: "02",
        title: "Prepare your documents",
        description:
            "Understand the documentation and preparation required for your application.",
        icon: FileCheck2,
    },
    {
        number: "03",
        title: "Get personal guidance",
        description:
            "Receive guidance on the relevant application process and your next steps.",
        icon: CheckCircle2,
    },
];

export default function CountriesPage() {
    return (
        <main className="overflow-hidden bg-white text-navy">
            {/* HERO */}

            <section className="relative overflow-hidden bg-navy px-5 py-16 text-white sm:py-20 lg:py-20">
                <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand-blue/20 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">

                    {/* LEFT: HERO CONTENT */}
                    <div className="relative z-10">
                        <p className="section-label !text-[#86C33C]">
                            <Globe2 size={15} />
                            YOUR GLOBAL JOURNEY
                        </p>

                        <h1 className="mt-7 font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                            Your world.
                            <br />
                            Your goals.
                            <br />
                            <span className="text-[#86C33C]">
                                Our guidance.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                            Whether you want to study abroad, join your spouse,
                            visit loved ones, or improve your English, we help you
                            understand your options and plan your next step.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-lg bg-[#86C33C] px-6 py-4 font-bold !text-navy transition-colors hover:bg-white"
                            >
                                Explore Your Options
                                <ArrowRight size={18} />
                            </Link>

                            <a
                                href="https://wa.me/918000576969"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-4 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                            >
                                <MessageCircle size={18} />
                                Talk to Our Team
                            </a>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="shrink-0 text-[#86C33C]" />
                                Personalized guidance
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="shrink-0 text-[#86C33C]" />
                                Application support
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2 size={16} className="shrink-0 text-[#86C33C]" />
                                Multiple visa services
                            </span>
                        </div>
                    </div>

                    {/* RIGHT: IMAGE */}
                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        <div className="absolute -inset-3 rounded-[2rem] border border-[#86C33C]/20" />

                        <div className="relative h-[360px] overflow-hidden rounded-2xl sm:h-[460px] lg:h-[560px]">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85"
                                alt="International students studying together at university"
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/5 to-navy/10" />

                            <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-navy/60 px-4 py-2 backdrop-blur-md sm:left-7 sm:top-7">
                                <span className="flex items-center gap-2 text-xs font-semibold tracking-wide text-white sm:text-sm">
                                    <Globe2 size={16} className="text-[#86C33C]" />
                                    YOUR FUTURE, WORLDWIDE
                                </span>
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-navy/75 p-5 backdrop-blur-lg sm:bottom-7 sm:left-7 sm:right-7 sm:p-6">
                                <p className="text-xs font-semibold tracking-[0.18em] text-[#86C33C]">
                                    YOUR NEXT CHAPTER
                                </p>

                                <h2 className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl">
                                    Big dreams deservede
                                    <br className="hidden sm:block" /> the right guidance.
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-200">
                                    Study, travel, reunite, and build your future
                                    beyond borders.
                                </p>
                            </div>
                        </div>

                        {/* DECORATIVE GOLD ACCENT */}
                        <div className="absolute -bottom-4 -right-3 -z-0 h-20 w-20 rounded-full border border-[#86C33C]/30 sm:-right-5" />
                    </div>

                </div>
            </section>

            {/* VISA SERVICES */}
            <section
                id="visa-services"
                className="bg-surface px-5 py-20 sm:py-14"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="section-label">
                                ONE TEAM, DIFFERENT JOURNEYS
                            </p>

                            <h2 className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight sm:text-4xl">
                                What brings you abroad?
                            </h2>

                            <p className="mt-4 max-w-2xl leading-7 text-muted">
                                Every journey is different. Find the service
                                that best matches your plans.
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex shrink-0 items-center gap-2 font-semibold text-brand-blue transition-colors hover:text-navy"
                        >
                            Discuss your plans
                            <ArrowUpRight size={18} />
                        </Link>
                    </div>

                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {visaServices.map((service) => {
                            const Icon = service.icon;

                            return (
                                <article
                                    key={service.number}
                                    className="group flex min-h-[330px] flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-navy/5 sm:p-7"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-surface text-brand-blue transition-colors group-hover:bg-navy group-hover:text-white">
                                            <Icon size={26} strokeWidth={1.8} />
                                        </div>

                                        <span className="font-heading text-sm font-bold text-slate-300">
                                            {service.number}
                                        </span>
                                    </div>

                                    <p className="mt-6 text-xs font-bold uppercase tracking-wider text-brand-blue">
                                        {service.label}
                                    </p>

                                    <h3 className="mt-2 font-heading text-xl font-bold text-navy">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                                        {service.description}
                                    </p>

                                    <Link
                                        href={service.href}
                                        className="mt-6 inline-flex items-center gap-2 font-semibold text-navy transition-colors group-hover:text-brand-blue"
                                    >
                                        Learn more
                                        <ArrowRight size={17} />
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* DESTINATIONS */}
            <section className="bg-white px-5 py-20 sm:py-14">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="section-label">
                                DISCOVER THE WORLD
                            </p>

                            <h2 className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight sm:text-4xl">
                                Where would you like to go?
                            </h2>

                            <p className="mt-4 max-w-2xl leading-7 text-muted">
                                Explore popular international destinations
                                and discover the options available for your
                                goals.
                            </p>
                        </div>

                        <a
                            href="https://wa.me/918000576969"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex shrink-0 items-center gap-2 font-semibold text-brand-blue hover:text-navy"
                        >
                            Ask about a destination
                            <ArrowUpRight size={18} />
                        </a>
                    </div>

                    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
                        {destinations.map((country, index) => (
                            <Link
                                key={country.slug}
                                href={`/countries/${country.slug}`}
                                className={`group overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10 sm:col-span-1 lg:col-span-2 ${index === 3
                                        ? "lg:col-start-2"
                                        : index === 4
                                            ? "lg:col-start-4"
                                            : ""
                                    }`}
                            >
                                <div className="relative h-64 overflow-hidden bg-surface">
                                    <img
                                        src={country.image}
                                        alt={`${country.name} destination`}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        style={{
                                            objectPosition: country.position,
                                        }}
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

                                    <h3 className="absolute bottom-5 left-5 right-3 font-heading text-xl font-bold text-white">
                                        {country.name}
                                    </h3>
                                </div>

                                <div className="p-5">
                                    <p className="min-h-[72px] text-sm leading-6 text-muted">
                                        {country.description}
                                    </p>

                                    <span className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-blue">
                                        Explore destination
                                        <ArrowRight
                                            size={17}
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW WE HELP */}
            <section className="bg-surface px-5 py-20 sm:py-14">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="section-label">
                            YOUR JOURNEY, MADE CLEARER
                        </p>

                        <h2 className="mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                            Guidance that starts with you.
                        </h2>

                        <p className="mt-4 leading-7 text-muted">
                            Understand the process, prepare for the next
                            step, and make decisions with greater clarity.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {supportSteps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <article
                                    key={step.number}
                                    className="rounded-2xl border border-border bg-white p-7 sm:p-8"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-brand-blue">
                                            <Icon size={24} />
                                        </div>

                                        <span className="font-heading text-sm font-bold text-slate-300">
                                            {step.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-6 font-heading text-xl font-bold">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-muted">
                                        {step.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="bg-navy px-5 py-20 text-white sm:py-14">
                <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                    <div className="max-w-2xl">
                        <p className="section-label !text-[#86C33C]">
                            YOUR NEXT STEP STARTS HERE
                        </p>

                        <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
                            Wherever life takes you, start with the right guidance.
                        </h2>

                        <p className="mt-4 leading-7 text-slate-300">
                            Tell us about your plans. Our team can help you
                            understand the relevant services and next steps.
                        </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#86C33C] px-6 py-4 font-bold !text-navy transition-colors hover:bg-white"
                        >
                            Book a Consultation
                            <ArrowRight size={18} />
                        </Link>

                        <a
                            href="https://wa.me/918000576969"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-4 font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
