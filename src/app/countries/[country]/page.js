
import Link from "next/link";
import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    CheckCircle2,
    ChevronRight,
    FileCheck2,
    Globe2,
    GraduationCap,
    HeartHandshake,
    Languages,
    MessageCircle,
    Plane,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

const WHATSAPP = "https://wa.me/918000576969";

const countries = {
    usa: {
        name: "United States",
        shortName: "USA",
        eyebrow: "DISCOVER YOUR POSSIBILITIES",
        headline: ["Dream beyond", "the ordinary."],
        description:
            "Explore study opportunities in the United States with personalised guidance for choosing your next step, preparing documents, and understanding the application journey.",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2400&q=90",
        imageAlt: "New York City skyline at dusk",
        location: "NORTH AMERICA",
        highlights: [
            "University and course guidance",
            "Student visa application support",
            "Document preparation assistance",
        ],
        intro:
            "Build your next chapter with a clearer understanding of education opportunities in the United States.",
        details: [
            {
                number: "01",
                title: "Explore universities",
                text: "Understand course options, university requirements, and the application process.",
            },
            {
                number: "02",
                title: "Prepare your application",
                text: "Organise the required documents and prepare for the relevant application stages.",
            },
            {
                number: "03",
                title: "Understand visa steps",
                text: "Get guidance on student visa requirements and the next steps for your circumstances.",
            },
        ],
        universities: [
            {
                name: "Massachusetts Institute of Technology",
                shortName: "MIT",
                city: "Cambridge, Massachusetts",
                description:
                    "Globally renowned for science, engineering, technology, and innovative research.",
                website: "https://www.mit.edu/",
            },
            {
                name: "Stanford University",
                shortName: "Stanford",
                city: "Stanford, California",
                description:
                    "Known for entrepreneurship, engineering, computer science, and interdisciplinary research.",
                website: "https://www.stanford.edu/",
            },
            {
                name: "Harvard University",
                shortName: "Harvard",
                city: "Cambridge, Massachusetts",
                description:
                    "A historic university offering a broad range of programs across multiple academic disciplines.",
                website: "https://www.harvard.edu/",
            },
        ],
    },
    canada: {
        name: "Canada",
        shortName: "Canada",
        eyebrow: "YOUR NEXT CHAPTER STARTS HERE",
        headline: ["A new place.", "A bigger future."],
        description:
            "Discover education opportunities in Canada with practical guidance on course selection, application preparation, and understanding the student visa process.",
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2400&q=90",
        imageAlt: "Toronto skyline with the CN Tower",
        location: "NORTH AMERICA",
        highlights: [
            "Course and institution guidance",
            "Application document support",
            "Student visa process guidance",
        ],
        intro:
            "From exploring institutions to preparing your application, make your plans with a better understanding of the journey ahead.",
        details: [
            {
                number: "01",
                title: "Find your direction",
                text: "Explore suitable courses and institutions based on your education and goals.",
            },
            {
                number: "02",
                title: "Get application ready",
                text: "Understand application requirements and prepare your supporting documents.",
            },
            {
                number: "03",
                title: "Plan your next steps",
                text: "Learn about the applicable study permit and visa application requirements.",
            },
        ],
        universities: [
            {
                name: "University of Toronto",
                shortName: "U of T",
                city: "Toronto, Ontario",
                description:
                    "A leading research university offering a broad range of undergraduate and graduate programs.",
                website: "https://www.utoronto.ca/",
            },
            {
                name: "McGill University",
                shortName: "McGill",
                city: "Montreal, Quebec",
                description:
                    "An internationally recognised university with diverse academic and research opportunities.",
                website: "https://www.mcgill.ca/",
            },
            {
                name: "University of British Columbia",
                shortName: "UBC",
                city: "Vancouver, British Columbia",
                description:
                    "Known for research, interdisciplinary learning, and its international academic community.",
                website: "https://www.ubc.ca/",
            },
        ],
    },
    uk: {
        name: "United Kingdom",
        shortName: "UK",
        eyebrow: "YOUR AMBITION, YOUR JOURNEY",
        headline: ["Think bigger.", "Go further."],
        description:
            "Explore UK education pathways with guidance on university options, application preparation, English-language requirements, and the student visa journey.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=90",
        imageAlt: "London cityscape featuring the River Thames",
        location: "EUROPE",
        highlights: [
            "University and course exploration",
            "Application preparation support",
            "English test and visa guidance",
        ],
        intro:
            "Explore a range of UK study options and understand the steps involved in preparing an international education application.",
        details: [
            {
                number: "01",
                title: "Explore study options",
                text: "Review courses and institutions that align with your academic interests.",
            },
            {
                number: "02",
                title: "Prepare your documents",
                text: "Understand the documents and application requirements relevant to your chosen course.",
            },
            {
                number: "03",
                title: "Understand the process",
                text: "Get guidance on English-language requirements and the applicable student visa process.",
            },
        ],
        universities: [
            {
                name: "University of Oxford",
                shortName: "Oxford",
                city: "Oxford, England",
                description:
                    "A historic university known for its academic breadth, research, and tutorial-based teaching.",
                website: "https://www.ox.ac.uk/",
            },
            {
                name: "University of Cambridge",
                shortName: "Cambridge",
                city: "Cambridge, England",
                description:
                    "An internationally recognised institution with a wide range of academic and research programs.",
                website: "https://www.cam.ac.uk/",
            },
            {
                name: "Imperial College London",
                shortName: "Imperial",
                city: "London, England",
                description:
                    "Specialises in science, engineering, medicine, and business-related education and research.",
                website: "https://www.imperial.ac.uk/",
            },
        ],
    },
    australia: {
        name: "Australia",
        shortName: "Australia",
        eyebrow: "MAKE ROOM FOR WHAT'S NEXT",
        headline: ["Your ambition.", "A world of options."],
        description:
            "Plan your Australian education journey with support understanding courses, institutions, application documents, and relevant student visa requirements.",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=90",
        imageAlt: "Sydney Harbour and the Sydney Opera House",
        location: "OCEANIA",
        highlights: [
            "Course and institution guidance",
            "Application document preparation",
            "Student visa process assistance",
        ],
        intro:
            "Turn an idea into a considered plan with practical guidance on education options and the steps involved in applying to study in Australia.",
        details: [
            {
                number: "01",
                title: "Explore your options",
                text: "Learn about courses and institutions that match your interests and qualifications.",
            },
            {
                number: "02",
                title: "Prepare to apply",
                text: "Understand admission requirements and prepare the supporting documents.",
            },
            {
                number: "03",
                title: "Move forward informed",
                text: "Understand the relevant student visa requirements and application stages.",
            },
        ],
        universities: [
            {
                name: "The University of Melbourne",
                shortName: "Melbourne",
                city: "Melbourne, Victoria",
                description:
                    "A major research university offering a wide selection of programs across multiple disciplines.",
                website: "https://www.unimelb.edu.au/",
            },
            {
                name: "The University of Sydney",
                shortName: "Sydney",
                city: "Sydney, New South Wales",
                description:
                    "A historic institution known for its broad academic offerings and research community.",
                website: "https://www.sydney.edu.au/",
            },
            {
                name: "The University of New South Wales",
                shortName: "UNSW Sydney",
                city: "Sydney, New South Wales",
                description:
                    "Known for its programs in engineering, technology, business, and research.",
                website: "https://www.unsw.edu.au/",
            },
        ],
    },
    dubai: {
        name: "Dubai",
        shortName: "Dubai",
        eyebrow: "EXPLORE GLOBAL OPPORTUNITIES",
        headline: ["Build your future.", "Discover Dubai."],
        description:
            "Explore education opportunities in Dubai, understand available courses and institutions, and learn about the relevant admission and UAE student residence requirements.",
        image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=90",
        imageAlt: "Dubai skyline with modern skyscrapers",
        location: "UNITED ARAB EMIRATES",

        highlights: [
            "Institution and course guidance",
            "Application document preparation",
            "Student residence process guidance",
        ],

        intro:
            "Explore Dubai as an international education destination and learn about institutions, programs, and the steps involved in planning your studies.",

        details: [
            {
                number: "01",
                title: "Explore institutions",
                text: "Research available universities, campuses, and programs that suit your academic interests.",
            },
            {
                number: "02",
                title: "Prepare your application",
                text: "Review institution-specific entry requirements and organise your supporting documents.",
            },
            {
                number: "03",
                title: "Understand the process",
                text: "Learn about applicable student residence requirements and the next steps for your chosen institution.",
            },
        ],

        universities: [
            {
                name: "University of Dubai",
                shortName: "UD",
                city: "Dubai, UAE",
                description:
                    "Offers programs in business, information technology, law, and related fields.",
                website: "https://ud.ac.ae/",
            },
            {
                name: "American University in Dubai",
                shortName: "AUD",
                city: "Dubai, UAE",
                description:
                    "An international university offering programs across business, engineering, architecture, communication, and other disciplines.",
                website: "https://www.aud.edu/",
            },
            {
                name: "Heriot-Watt University Dubai",
                shortName: "Heriot-Watt",
                city: "Dubai, UAE",
                description:
                    "A Dubai campus of the UK university, offering programs in business, engineering, computing, and related areas.",
                website: "https://www.hw.ac.uk/dubai",
            },
        ],
    },
};

const services = [
    {
        icon: GraduationCap,
        number: "01",
        title: "Study Visa",
        description:
            "Explore international education options and get guidance on admission and visa application preparation.",
    },
    {
        icon: HeartHandshake,
        number: "02",
        title: "Spouse Visa",
        description:
            "Understand the relevant partner or spouse visa route, eligibility considerations, and supporting documents.",
    },
    {
        icon: Plane,
        number: "03",
        title: "Visitor Visa",
        description:
            "Prepare for a visit to family, friends, or a destination abroad with guidance on application requirements.",
    },
    {
        icon: Languages,
        number: "04",
        title: "IELTS & PTE",
        description:
            "Build your English-language skills with preparation support for IELTS, PTE, and your wider goals.",
    },
];

const process = [
    {
        number: "01",
        title: "Tell us your goals",
        text: "Share your destination, plans, education background, or travel purpose.",
    },
    {
        number: "02",
        title: "Understand your options",
        text: "Discuss relevant pathways and the requirements that may apply to your situation.",
    },
    {
        number: "03",
        title: "Prepare with guidance",
        text: "Get help understanding documents, application steps, and preparation needs.",
    },
    {
        number: "04",
        title: "Take your next step",
        text: "Move forward with a clearer plan and an understanding of what comes next.",
    },
];

export async function generateMetadata({ params }) {
    const { country } = await params;
    const destination = countries[country];

    if (!destination) {
        return {
            title: "Explore Destinations | SKIK International",
        };
    }

    return {
        title: `${destination.name} Visa & Study Guidance`,
        description: `Explore ${destination.name} study opportunities, visa guidance, IELTS and PTE support with SKIK International in Surat, Gujarat.`,
    };
}

export default async function CountryPage({ params }) {
    const { country } = await params;
    const destination = countries[country];

    if (!destination) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-navy px-5 py-14 text-white">
                <div className="max-w-xl text-center">
                    <Globe2
                        size={42}
                        className="mx-auto text-[#86C33C]"
                    />
                    <h1 className="mt-6 text-4xl font-bold">
                        Destination not found
                    </h1>
                    <p className="mt-4 leading-7 text-slate-300">
                        Explore our destinations or speak with our team to
                        understand your available options.
                    </p>
                    <Link
                        href="/countries"
                        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-blue px-6 py-3 font-bold !text-navy"
                    >
                        Explore destinations
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="overflow-hidden bg-white text-navy">

            {/* =====================================================
                CINEMATIC DESTINATION HERO
            ===================================================== */}
            <section className="relative isolate min-h-[650px] overflow-hidden bg-navy sm:min-h-[740px] lg:min-h-[800px]">
                <img
                    src={destination.image}
                    alt={destination.imageAlt}
                    fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/20" />

                <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-brand-blue/20 blur-[120px]" />

                <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-5 py-14 sm:min-h-[740px] sm:px-8 lg:min-h-[800px] lg:px-10">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 text-xs font-bold tracking-[0.24em] text-[#86C33C] sm:text-sm">
                            <span className="h-px w-10 bg-[#86C33C]" />
                            {destination.eyebrow}
                        </div>

                        <div className="mt-7 flex items-center gap-3 text-sm font-medium text-white/75">
                            <Globe2
                                size={17}
                                className="text-[#86C33C]"
                            />
                            {destination.location}
                            <span className="h-1 w-1 rounded-full bg-[#86C33C]" />
                            DESTINATION GUIDE
                        </div>

                        <h1 className="mt-7 font-heading text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-8xl">
                            {destination.headline[0]}
                            <br />
                            <span className="text-[#86C33C]">
                                {destination.headline[1]}
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg sm:leading-9">
                            {destination.description}
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <a
                                href={`${WHATSAPP}?text=${encodeURIComponent(
                                    `Hello SKIK International, I would like to know more about studying in ${destination.name} and the available visa guidance.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-[#86C33C] px-6 py-4 font-bold !text-navy transition hover:bg-white sm:px-7"
                            >
                                Discuss Your Plans
                                <ArrowUpRight size={19} />
                            </a>

                            <a
                                href="#pathways"
                                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-white/35 bg-white/5 px-6 py-4 font-semibold !text-white backdrop-blur-sm transition hover:!text-white hover:bg-white/15"                            >
                                Explore Services
                                <ArrowDown size={18} />
                            </a>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 border-t border-white/20 pt-6 text-sm text-white/85">
                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={17}
                                    className="text-[#86C33C]"
                                />
                                Personalised guidance
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={17}
                                    className="text-[#86C33C]"
                                />
                                Document support
                            </span>
                            <span className="flex items-center gap-2">
                                <CheckCircle2
                                    size={17}
                                    className="text-[#86C33C]"
                                />
                                Clear next steps
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 right-0 hidden w-52 border-l border-t border-white/20 bg-navy/70 p-6 backdrop-blur-md md:block lg:w-64 lg:p-8">
                    <Sparkles
                        size={22}
                        className="text-[#86C33C]"
                    />
                    <p className="mt-4 text-xs font-bold tracking-[0.2em] text-[#86C33C]">
                        SKIK INTERNATIONAL
                    </p>
                    <p className="mt-2 text-lg font-semibold leading-7 text-white">
                        Your global journey, guided with care.
                    </p>
                </div>
            </section>

            {/* =====================================================
                INTRODUCTION / DESTINATION SNAPSHOT
            ===================================================== */}
            <section className="px-5 py-20 sm:px-8 sm:py-22 lg:px-10">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                    <div>
                        <p className="section-label">
                            <span className="h-px w-7 bg-[#86C33C]" />
                            YOUR DESTINATION
                        </p>

                        <h2 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                            Your journey to{" "}
                            <span className="text-brand-blue">
                                {destination.shortName}.
                            </span>
                        </h2>
                    </div>

                    <div>
                        <p className="text-lg leading-9 text-slate-600">
                            {destination.intro}
                        </p>

                        <div className="mt-8 space-y-4">
                            {destination.highlights.map((highlight) => (
                                <div
                                    key={highlight}
                                    className="flex items-start gap-3"
                                >
                                    <CheckCircle2
                                        size={20}
                                        className="mt-1 shrink-0 text-[#86C33C]"
                                    />
                                    <p className="font-medium text-navy">
                                        {highlight}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/contact"
                            className="mt-9 inline-flex items-center gap-2 font-bold text-navy transition hover:text-brand-blue"
                        >
                            Talk to our team
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* =====================================================
                APPLICATION JOURNEY
            ===================================================== */}
            <section className="bg-surface px-5 py-20 sm:px-8 sm:py-22 lg:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div className="max-w-2xl">
                            <p className="section-label">
                                <span className="h-px w-7 bg-[#86C33C]" />
                                A CLEARER PATH FORWARD
                            </p>

                            <h2 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                                One step at a time.
                                <br />
                                <span className="text-brand-blue">
                                    With the right guidance.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-md leading-7 text-slate-600">
                            Every application is different. We help you
                            understand the relevant steps and prepare
                            according to your individual circumstances.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {destination.details.map((item, index) => (
                            <article
                                key={item.number}
                                className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9 ${index === 0
                                    ? "lg:col-span-1"
                                    : ""
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <span className="font-heading text-5xl font-bold text-slate-200 transition group-hover:text-[#86C33C]/50">
                                        {item.number}
                                    </span>

                                    <div className="rounded-xl bg-surface p-3 text-brand-blue">
                                        {index === 0 && (
                                            <Globe2 size={23} />
                                        )}
                                        {index === 1 && (
                                            <FileCheck2 size={23} />
                                        )}
                                        {index === 2 && (
                                            <ShieldCheck size={23} />
                                        )}
                                    </div>
                                </div>

                                <h3 className="mt-8 text-xl font-bold text-navy">
                                    {item.title}
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    {item.text}
                                </p>
                            </article>
                        ))}

                    </div>

                    <article className="flex justify-between mt-15 rounded-2xl bg-navy p-7 text-white sm:p-9 lg:col-start-2">
                        <div>
                            <Sparkles
                                size={28}
                                className="text-[#86C33C]"
                            />
                            <h3 className="mt-7 text-2xl font-bold">
                                Not sure where to start?
                            </h3>
                            <p className="mt-3 leading-7 text-slate-300">
                                Start with a conversation about your
                                goals and circumstances.
                            </p>
                        </div>

                        <a
                            href={`${WHATSAPP}?text=${encodeURIComponent(
                                `Hello SKIK International, I would like guidance about ${destination.name}.`
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="talk-link mt-8 inline-flex items-center gap-2 font-semibold text-[#86C33C] "
                        >
                            Let's talk
                            <ArrowRight size={18} />
                        </a>

                    </article>
                </div>
            </section>


            {/* =====================================================
                  FEATURED UNIVERSITIES
            ===================================================== */}


            <section className="overflow-hidden bg-white px-5 py-5 sm:px-8 sm:py-22 lg:px-10">
                <div className="mx-auto max-w-7xl">

                    {/* SECTION HEADER */}
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                            <p className="section-label">
                                <span className="h-px w-7 bg-[#86C33C]" />
                                EXPLORE YOUR OPTIONS
                            </p>

                            <h2 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                                Discover leading
                                <br />
                                <span className="text-brand-blue">
                                    universities in {destination.name}.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-md leading-7 text-slate-600">
                            Explore a selection of recognised institutions and learn
                            more about their programs, academic strengths, and admission
                            requirements.
                        </p>
                    </div>

                    {/* UNIVERSITY CARDS */}
                    <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {(destination.universities || []).map((university, index) => (
                            <article
                                key={university.name}
                                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#86C33C]/70 hover:shadow-xl"
                            >
                                {/* TOP ACCENT */}
                                <div className="h-1.5 w-full bg-gradient-to-r from-navy via-brand-blue to-[#86C33C]" />

                                <div className="flex flex-1 flex-col p-7 sm:p-8">

                                    {/* UNIVERSITY NUMBER AND LOCATION */}
                                    <div className="flex items-start justify-between gap-4">
                                        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy font-heading text-xl font-bold text-[#86C33C]">
                                            {university.shortName
                                                .split(" ")
                                                .map((word) => word[0])
                                                .join("")
                                                .slice(0, 3)}
                                        </span>

                                        <span className="rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-slate-600">
                                            {destination.shortName}
                                        </span>
                                    </div>

                                    <p className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
                                        <Globe2 size={14} />
                                        {university.city}
                                    </p>

                                    <h3 className="mt-3 text-xl font-bold leading-snug text-navy sm:text-2xl">
                                        {university.name}
                                    </h3>

                                    <p className="mt-4 flex-1 text-sm leading-7 text-slate-600">
                                        {university.description}
                                    </p>

                                    {/* LINKS */}
                                    <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
                                        <a
                                            href={university.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 font-semibold text-navy transition hover:text-brand-blue"
                                        >
                                            Official website
                                            <ArrowUpRight size={16} />
                                        </a>

                                        <Link
                                            href={`/contact?destination=${country}&university=${encodeURIComponent(university.name)}`}
                                            className="inline-flex items-center gap-2 font-semibold text-brand-blue transition hover:text-navy"
                                        >
                                            Enquire
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* BOTTOM NOTE */}
                    <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-surface p-5 sm:p-6">
                        <GraduationCap
                            size={22}
                            className="mt-0.5 shrink-0 text-brand-blue"
                        />

                        <p className="text-sm leading-7 text-slate-600">
                            <strong className="text-navy">
                                Choosing the right university:
                            </strong>{" "}
                            Admission requirements, tuition fees, available programs,
                            and eligibility vary by institution and course. These
                            universities are examples to explore, not a guarantee of
                            admission or a recommendation that one institution is
                            suitable for every student.
                        </p>
                    </div>

                </div>
            </section>



            {/* =====================================================
                ALL VISA AND LANGUAGE SERVICES
            ===================================================== */}
            <section
                id="pathways"
                className="px-5 sm:px-8 sm:pb-20 lg:px-10"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-3xl text-center">
                        <p className="section-label justify-center">
                            <span className="h-px w-7 bg-[#86C33C]" />
                            HOW WE CAN HELP
                            <span className="h-px w-7 bg-[#86C33C]" />
                        </p>

                        <h2 className="mt-6 font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                            More than a destination.
                            <br />
                            <span className="text-brand-blue">
                                Support for your journey.
                            </span>
                        </h2>

                        <p className="mt-5 leading-8 text-slate-600">
                            Whether you plan to study, reunite with family,
                            visit someone abroad, or improve your English,
                            explore the support available through SKIK
                            International.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map((service) => {
                            const Icon = service.icon;

                            return (
                                <article
                                    key={service.number}
                                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#86C33C]/70 hover:shadow-xl sm:p-7"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-brand-blue transition group-hover:bg-navy group-hover:text-[#86C33C]">
                                            <Icon size={23} />
                                        </div>

                                        <span className="text-sm font-bold text-slate-300">
                                            {service.number}
                                        </span>
                                    </div>

                                    <h3 className="mt-7 text-xl font-bold text-navy">
                                        {service.title}
                                    </h3>

                                    <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                                        {service.description}
                                    </p>

                                    <Link
                                        href="/contact"
                                        className="mt-7 inline-flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-bold text-navy transition hover:text-brand-blue"
                                    >
                                        Enquire now
                                        <ChevronRight size={17} />
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* =====================================================
                HOW SKIK SUPPORTS YOU
            ===================================================== */}
            <section className="relative overflow-hidden bg-navy px-5 py-20 text-white sm:px-8 sm:py-22 lg:px-10">
                <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-brand-blue/20 blur-[100px]" />

                <div className="relative mx-auto max-w-7xl">
                    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                        <div>
                            <p className="section-label !text-[#86C33C]">
                                <span className="h-px w-7 bg-[#86C33C]" />
                                THE SKIK APPROACH
                            </p>

                            <h2 className="mt-6 font-heading text-4xl font-bold leading-tight sm:text-5xl">
                                Good guidance.
                                <br />
                                <span className="text-[#86C33C]">
                                    Clear next steps.
                                </span>
                            </h2>

                            <p className="mt-6 leading-8 text-slate-300">
                                Your plans deserve individual attention.
                                We help you understand the process, prepare
                                thoughtfully, and make informed decisions
                                about your next step.
                            </p>

                            <a
                                href={`${WHATSAPP}?text=${encodeURIComponent(
                                    `Hello SKIK International, I would like to discuss my plans for ${destination.name}.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#86C33C] px-6 py-4 font-bold !text-navy transition hover:bg-white"
                            >
                                Start a Conversation
                                <ArrowUpRight size={18} />
                            </a>
                        </div>

                        <div className="divide-y divide-white/15 border-y border-white/15">
                            {process.map((item) => (
                                <div
                                    key={item.number}
                                    className="grid gap-3 py-6 sm:grid-cols-[70px_1fr] sm:gap-6 sm:py-8"
                                >
                                    <span className="font-heading text-3xl font-bold text-[#86C33C]">
                                        {item.number}
                                    </span>

                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 leading-7 text-slate-300">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                FINAL CONTACT CTA
            ===================================================== */}
            <section className="px-5 py-20 sm:px-8 sm:py-22 lg:px-10">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-surface px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
                    <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[#86C33C]/30" />
                    <div className="pointer-events-none absolute -right-4 -top-12 h-52 w-52 rounded-full border border-[#86C33C]/20" />

                    <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                        <div className="max-w-3xl">
                            <p className="section-label">
                                <span className="h-px w-7 bg-[#86C33C]" />
                                YOUR JOURNEY STARTS WITH A CONVERSATION
                            </p>

                            <h2 className="mt-6 font-heading text-4xl font-bold leading-tight sm:text-5xl">
                                Let's talk about
                                <br />
                                <span className="text-brand-blue">
                                    your plans for {destination.name}.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-2xl leading-8 text-slate-600">
                                Tell us what you hope to achieve. Our team
                                can help you understand the relevant options
                                and the next steps to consider.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                            <a
                                href={`${WHATSAPP}?text=${encodeURIComponent(
                                    `Hello SKIK International, I am interested in ${destination.name}. Please guide me on the available options.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="navy-cta inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-navy px-6 py-4 font-bold transition hover:bg-brand-blue"
                            >
                                <MessageCircle size={19} />
                                WhatsApp Us
                            </a>

                            <Link
                                href="/contact"
                                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-4 font-bold text-navy transition hover:border-[#86C33C]"
                            >
                                Contact Details
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* VISA GUIDANCE DISCLAIMER */}
            <div className="border-t border-slate-100 px-5 py-6 text-center text-xs leading-6 text-slate-500 sm:px-8">
                Visa requirements, eligibility, processing times, and
                decisions depend on the relevant authorities and individual
                circumstances. SKIK International provides guidance and
                application support; visa approval is not guaranteed.
            </div>

        </main>
    );
}
