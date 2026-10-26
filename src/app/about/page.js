
import Link from "next/link";
import {
    ArrowRight,
    Globe2,
    GraduationCap,
    ShieldCheck,
    Users,
} from "lucide-react";

const strengths = [
    {
        icon: GraduationCap,
        title: "Education Guidance",
        description:
            "Support with study destinations, university selection, course options, and admission preparation.",
    },
    {
        icon: Globe2,
        title: "Global Opportunities",
        description:
            "Explore international education pathways across multiple countries and destinations.",
    },
    {
        icon: ShieldCheck,
        title: "Application Support",
        description:
            "Understand application requirements and prepare documentation for your next steps.",
    },
    {
        icon: Users,
        title: "Personalized Assistance",
        description:
            "Guidance tailored to your goals, circumstances, and preferred destination.",
    },
];

export default function AboutPage() {
    return (
        <main>
            {/* HERO */}
            <section className="bg-navy px-5 py-20 text-white sm:py-22">
                <div className="mx-auto max-w-7xl">
                    <p className="section-label !text-[#86C33C]">
                        About SKIK International
                    </p>

                    <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight sm:text-6xl">
                        Your global journey deserves the right guidance.
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                        We help students explore international education
                        opportunities, understand their options, and prepare
                        for the next stage of their academic journey.
                    </p>

                    <Link
                        href="/contact"
                        style={{ color: "#ffffff" }}
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#86C33C] px-6 py-4 font-semibold transition hover:bg-brand-blue"
                    >
                        Talk to Our Team <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            {/* COMPANY INTRODUCTION */}

            {/* 01 — WHO WE ARE */}
            <section className="bg-white px-5 py-20 sm:py-14">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <p className="section-label">Who we are</p>

                        <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl">
                            Every journey abroad starts with the right guidance.
                        </h2>

                        <p className="mt-6 leading-8 text-muted">
                            Everyone has a different reason to explore opportunities
                            abroad. You may want to pursue higher education, reunite
                            with your spouse, or visit family and friends.
                        </p>

                        <p className="mt-4 leading-8 text-muted">
                            At SKIK International, we help you understand your
                            options, prepare for the process, and take your next
                            step with greater clarity and confidence.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-7 inline-flex items-center gap-2 font-semibold text-brand-blue transition-all hover:gap-3"
                        >
                            Talk to Our Team <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="rounded-2xl bg-surface p-3">
                        <img
                            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="People discussing plans together"
                            className="h-[320px] w-full rounded-xl object-cover sm:h-[440px]"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* 02 — VISA GUIDANCE */}
            <section className="bg-surface px-5 py-20 sm:py-14">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 overflow-hidden rounded-2xl bg-white p-3 lg:order-1">
                        <img
                            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="Consultants discussing plans and documents"
                            className="h-[320px] w-full rounded-xl object-cover sm:h-[440px]"
                            loading="lazy"
                        />
                    </div>

                    <div className="order-1 lg:order-2">
                        <p className="section-label">Visa guidance</p>

                        <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl">
                            Different goals. Guidance that fits your journey.
                        </h2>

                        <p className="mt-6 leading-8 text-muted">
                            Choosing the right visa depends on your purpose,
                            circumstances, and destination. We help you understand
                            the relevant process and documentation for your plans.
                        </p>

                        <div className="mt-7 space-y-5">
                            <div className="border-l-2 border-[#86C33C] pl-5">
                                <h3 className="font-heading text-lg font-bold text-navy">
                                    Study Visa
                                </h3>
                                <p className="mt-1 leading-7 text-muted">
                                    Explore education opportunities and student
                                    visa application requirements.
                                </p>
                            </div>

                            <div className="border-l-2 border-[#86C33C] pl-5">
                                <h3 className="font-heading text-lg font-bold text-navy">
                                    Spouse Visa
                                </h3>
                                <p className="mt-1 leading-7 text-muted">
                                    Understand partner-related visa pathways
                                    and supporting documentation.
                                </p>
                            </div>

                            <div className="border-l-2 border-[#86C33C] pl-5">
                                <h3 className="font-heading text-lg font-bold text-navy">
                                    Visitor Visa
                                </h3>
                                <p className="mt-1 leading-7 text-muted">
                                    Prepare for temporary visits to family,
                                    friends, or destinations abroad.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/services"
                            className="mt-8 inline-flex items-center gap-2 font-semibold text-brand-blue transition-all hover:gap-3"
                        >
                            Explore Visa Services <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 03 — LANGUAGE & PREPARATION */}
            <section className="bg-white px-5 py-20 sm:py-14">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <p className="section-label">Language & preparation</p>

                        <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl">
                            Build the skills to move forward with confidence.
                        </h2>

                        <p className="mt-6 leading-8 text-muted">
                            Language skills can play an important role in education,
                            communication, and international opportunities.
                            We offer preparation support to help you work towards
                            your personal goals.
                        </p>

                        <div className="mt-7 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border border-border p-5">
                                <h3 className="font-heading text-lg font-bold text-navy">
                                    IELTS & PTE
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-muted">
                                    Structured language-test preparation and practice.
                                </p>
                            </div>

                            <div className="rounded-xl border border-border p-5">
                                <h3 className="font-heading text-lg font-bold text-navy">
                                    Spoken English
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-muted">
                                    Develop everyday communication and confidence.
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/services"
                            className="mt-7 inline-flex items-center gap-2 font-semibold text-brand-blue transition-all hover:gap-3"
                        >
                            Discover Our Services <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="rounded-2xl bg-surface p-3">
                        <img
                            src="https://images.pexels.com/photos/5428012/pexels-photo-5428012.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="Student learning and preparing for the future"
                            className="h-[320px] w-full rounded-xl object-cover sm:h-[440px]"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* 04 — OUR APPROACH */}
            <section className="bg-navy px-5 py-20 text-white sm:py-14">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="order-2 rounded-2xl bg-white/5 p-3 lg:order-1">
                        <img
                            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="Professionals working together in a consultation"
                            className="h-[320px] w-full rounded-xl object-cover sm:h-[440px]"
                            loading="lazy"
                        />
                    </div>

                    <div className="order-1 lg:order-2">
                        <p className="section-label">Our approach</p>

                        <h2 className="mt-5 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                            Clear information. Personal attention. Better preparation.
                        </h2>

                        <p className="mt-6 leading-8 text-slate-300">
                            International applications can involve many decisions
                            and documents. Our approach is to make the process easier
                            to understand by helping you identify the requirements
                            relevant to your circumstances.
                        </p>

                        <div className="mt-8 space-y-5">
                            <div>
                                <h3 className="font-bold text-white">
                                    Guidance for your goals
                                </h3>
                                <p className="mt-1 leading-7 text-slate-300">
                                    Understand the options that match your purpose
                                    and intended destination.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white">
                                    Documentation support
                                </h3>
                                <p className="mt-1 leading-7 text-slate-300">
                                    Get help understanding relevant documents
                                    and application steps.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-white">
                                    Support throughout the process
                                </h3>
                                <p className="mt-1 leading-7 text-slate-300">
                                    Know what to prepare and which questions
                                    to clarify as you move forward.
                                </p>
                            </div>
                        </div>


                        <Link
                            href="/contact"
                            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#86C33C] px-6 py-4 font-bold !text-navy transition-colors duration-300 hover:bg-white hover:!text-[#86C33C]"                        >
                            Start Your Journey
                            <ArrowRight size={18} />
                        </Link>

                    </div>
                </div>
            </section>


            {/* EXPERIENCE AND FIGURES */}
            <section className="bg-surface px-5 py-16 sm:py-20">
                <div className="mx-auto max-w-7xl">
                    <p className="section-label">Our journey</p>

                    <h2 className="mt-5 font-heading text-3xl font-bold text-navy sm:text-4xl">
                        Experience built around your goals.
                    </h2>

                    <div className="mt-10 grid gap-5 sm:grid-cols-3">
                        {[
                            {
                                value: "8+",
                                label: "Years of Experience",
                            },
                            {
                                value: "1,000+",
                                label: "Visa Approvals*",
                            },
                            {
                                value: "5+",
                                label: "Study Destinations",
                            },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-border bg-white p-8 text-center"
                            >
                                <p className="font-heading text-4xl font-bold text-navy">
                                    {stat.value}
                                </p>
                                <p className="mt-3 text-sm text-muted">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className="mt-4 text-xs leading-6 text-muted">
                        *Figures supplied in the project brief. Confirm and
                        approve all figures before publishing the website.
                    </p>
                </div>
            </section>

            {/* OUR APPROACH */}
            <section className="bg-white px-5 py-20 sm:py-14">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl">
                        <p className="section-label">The SKIK difference</p>

                        <h2 className="mt-5 font-heading text-3xl font-bold text-navy sm:text-4xl">
                            Guidance at every important step.
                        </h2>

                        <p className="mt-4 leading-7 text-muted">
                            Every student's goals are different. We help you
                            understand your choices and the processes involved
                            in planning your international education.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {strengths.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    key={item.title}
                                    className="rounded-2xl border border-border p-6 transition hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-brand-blue">
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="mt-5 font-heading text-lg font-bold text-navy">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-muted">
                                        {item.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section className="bg-surface px-5 py-20 sm:py-14">
                <div className="mx-auto max-w-7xl">
                    <p className="section-label">Meet our leadership</p>

                    <h2 className="mt-5 font-heading text-3xl font-bold text-navy sm:text-4xl">
                        The people behind your journey.
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-muted">
                        Our team helps students navigate education options
                        and application processes with personalized support.
                    </p>


                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        {[
                            {
                                name: "Naresh Khokhar",
                                role: "Director",
                                initials: "NK",
                                number: "01",
                                description:
                                    "Leading Skik International with a commitment to helping people explore global opportunities.",
                            },
                            {
                                name: "Hardik Baraiya",
                                role: "Head of Department",
                                initials: "HB",
                                number: "02",
                                description:
                                    "Coordinating services and supporting clients throughout their international journey.",
                            },
                        ].map((person) => (
                            <div
                                key={person.name}
                                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10"
                            >
                                {/* Decorative background number */}
                                <span className="pointer-events-none absolute right-7 top-5 font-heading text-6xl font-bold text-slate-100 transition-colors duration-300 group-hover:text-blue-50">
                                    {person.number}
                                </span>

                                {/* Initials badge */}
                                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-lg font-bold tracking-wide text-white transition-colors duration-300 group-hover:bg-brand-blue">
                                    {person.initials}
                                </div>

                                {/* Person details */}
                                <div className="relative mt-7">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
                                        {person.role}
                                    </p>

                                    <h3 className="mt-2 font-heading text-2xl font-bold text-navy md:text-3xl">
                                        {person.name}
                                    </h3>

                                    <div className="mt-5 h-1 w-12 rounded-full bg-[#86C33C] transition-all duration-300 group-hover:w-20" />

                                    <p className="mt-5 max-w-lg text-base leading-7 text-muted">
                                        {person.description}
                                    </p>
                                </div>

                                {/* Bottom accent */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-blue transition-all duration-500 group-hover:w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* OUR BRANCHES */}
            <section className="branches-section pt-10 pb-20">
                <div className="branches-container">

                    <div className="branches-heading">
                        <span className="branches-eyebrow">
                            <span></span>
                            OUR PRESENCE
                            <span></span>
                        </span>

                        <h2>
                            Closer to you,
                            <br />
                            <span>wherever you begin.</span>
                        </h2>

                        <p>
                            With branches across Gujarat, SKIK International is here
                            to guide you through your journey towards global opportunities.
                            Connect with our team at a location convenient for you.
                        </p>
                    </div>

                    <div className="branches-grid">

                        {/* SURAT */}
                        <article className="branch-card">
                            <div className="branch-number">01</div>
                            <div className="branch-icon">S</div>
                            <h3>Surat</h3>
                            <p>
                                Connect with our team for personalised guidance
                                on your international journey.
                            </p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=SKIK+International+Surat+Gujarat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="branch-link"
                            >
                                Explore location <span>↗</span>
                            </a>
                        </article>

                        {/* AHMEDABAD */}
                        <article className="branch-card">
                            <div className="branch-number">02</div>
                            <div className="branch-icon">A</div>
                            <h3>Ahmedabad</h3>
                            <p>
                                Get support in exploring suitable courses,
                                destinations, and application requirements.
                            </p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=SKIK+International+Ahmedabad+Gujarat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="branch-link"
                            >
                                Explore location <span>↗</span>
                            </a>
                        </article>

                        {/* BARDOLI */}
                        <article className="branch-card">
                            <div className="branch-number">03</div>
                            <div className="branch-icon">B</div>
                            <h3>Bardoli</h3>
                            <p>
                                Speak with our team about your plans
                                and the next steps towards studying abroad.
                            </p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=SKIK+International+Bardoli+Gujarat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="branch-link"
                            >
                                Explore location <span>↗</span>
                            </a>
                        </article>

                        {/* ANKLESHWAR */}
                        <article className="branch-card">
                            <div className="branch-number">04</div>
                            <div className="branch-icon">A</div>
                            <h3>Ankleshwar</h3>
                            <p>
                                Take the next step towards your global ambitions
                                with guidance from our team.
                            </p>
                            <a
                                href="https://www.google.com/maps/search/?api=1&query=SKIK+International+Ankleshwar+Gujarat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="branch-link"
                            >
                                Explore location <span>↗</span>
                            </a>
                        </article>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-navy px-5 py-16 text-white sm:py-20">
                <div className="mx-auto max-w-7xl">
                    <p className="section-label !text-[#86C33C]">
                        Start your journey
                    </p>

                    <h2 className="mt-5 max-w-3xl font-heading text-3xl font-bold sm:text-4xl">
                        Let's plan your next chapter together.
                    </h2>

                    <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                        Tell us about your education goals and the destinations
                        you are considering.
                    </p>

                    <Link
                        href="/contact"
                        style={{ color: "#ffffff" }}
                        className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-6 py-4 font-semibold transition hover:bg-[#86C33C]"
                    >
                        Contact Us <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

        </main>
    );
}
