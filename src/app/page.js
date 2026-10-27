
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Globe2,
  BookOpen,
  FileCheck2,
  CheckCircle2,
  MessageCircle,
  Star,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PostsCarousel from "@/components/home/PostsCarousel";

const destinations = [
  {
    name: "United Kingdom",
    detail: "World-renowned universities",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=85",
    code: "uk",
  },
  {
    name: "United States",
    detail: "Discover global opportunities",

    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=900&q=85",
    code: "usa",
  },
  {
    name: "Canada",
    detail: "Education and new beginnings",
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=900&q=85",
    code: "ca",
  },
  {
    name: "Australia",
    detail: "Study, explore, and grow",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=900&q=85",
    code: "au",
  },
];

const services = [
  {
    number: "01",
    title: "Visa & Immigration",
    description:
      "Get guidance for study, spouse, and visitor visas to explore opportunities and travel abroad.",
    icon: GraduationCap,
    href: "/services",
  },
  {
    icon: FileCheck2,
    number: "02",
    title: "Visa Guidance",
    description:
      "Get guidance with student, spouse, and visitor visa applications and documentation.",
  },
  {
    icon: BookOpen,
    number: "03",
    title: "IELTS & PTE Coaching",
    description:
      "Prepare for your English language tests with structured learning and practice.",
  },
  {
    icon: Globe2,
    number: "04",
    title: "Spoken English",
    description:
      "Build your communication skills and confidence for your international journey.",
  },
];

const stats = [
  { value: "8+", label: "Years of Experience" },
  { value: "1,000+", label: "Visa Approvals* " },
  { value: "5+", label: "Study Destinations" },
];

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(60,103,158,0.35),transparent_55%)]" />

        <div className="container-width relative grid min-h-[620px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-blue-100">
              <span className="h-2 w-2 rounded-full bg-[#86C33C]" />
              YOUR JOURNEY. YOUR FUTURE. YOUR WORLD.
            </div>

            <h1 className="font-heading text-4xl font-extrabold leading-[1.13] tracking-tight sm:text-5xl lg:text-6xl">
              Your Global
              <br />
              Dreams Begin
              <br />
              <span className="text-[#86C33C]">Right Here.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-300 sm:text-lg">
              Take the next step towards your international education goals
              with personalized guidance for study destinations, visa
              applications, and English language preparation.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-[#86C33C] px-6 py-4 font-bold text-navy transition-colors duration-300 hover:bg-white hover:!text-navy"
              >
                Start Your Journey
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#86C33C]" />
                Personalized Guidance
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-[#86C33C]" />
                Application Support
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute -inset-5 rounded-[35px] bg-brand-blue/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-2">
              <div className="relative h-[370px] overflow-hidden rounded-xl sm:h-[450px]">
                <Image
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=90" alt="University students on campus"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#86C33C]">
                    Your next chapter
                  </p>
                  <h2 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                    The world is waiting.
                  </h2>
                  <p className="mt-2 text-sm text-slate-200">
                    Let's find the right path for you.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-12 -left-3 flex items-center gap-3 rounded-xl border border-border bg-white p-4 text-navy shadow-xl sm:-left-8">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface">
                <GraduationCap size={24} className="text-brand-blue" />
              </div>
              <div>
                <p className="font-heading text-lg font-extrabold">Since 2016</p>
                <p className="text-xs text-muted">Supporting global ambitions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#86C33C] to-transparent opacity-70" />
      </section>

      {/* STATISTICS */}
      <section className="border-b border-border bg-white">
        <div className="container-width grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-5 py-7 text-center">
              <p className="font-heading text-3xl font-extrabold text-navy">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="container-width pb-3 text-right text-[10px] text-muted">
          *Visa approval figure supplied in project notes; confirm before launch.
        </p>
      </section>

      {/* DESTINATIONS */}
      <section className="section-padding bg-surface">
        <div className="container-width">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="section-label">Explore the world</span>
              <h2 className="mt-4 max-w-xl font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
                Find your destination.
                <br />
                <span className="text-brand-blue">Shape your future.</span>
              </h2>
            </div>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 self-start font-bold text-navy transition hover:text-brand-blue sm:self-auto"
            >
              View all destinations
              <ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination) => (
              <Link
                key={destination.code}
                href={`/countries/${destination.code}`}
                className="group overflow-hidden rounded-xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 font-heading text-xl font-bold text-white">
                    {destination.name}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <span className="text-sm text-muted">{destination.detail}</span>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-brand-blue transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POSTS CAROUSEL */}
      <PostsCarousel />

      {/* SERVICES */}
      <section className="section-padding bg-white">
        <div className="container-width">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">How we help</span>
            <h2 className="mt-4 font-heading text-3xl font-extrabold text-navy sm:text-4xl">
              Guidance for every step
              <br className="hidden sm:block" /> of your journey.
            </h2>
            <p className="mt-4 leading-7 text-muted">
              From choosing a destination to preparing your application, get
              support at every important stage.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.number}
                  className="group rounded-xl border border-border bg-white p-6 transition duration-300 hover:border-navy/20 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-brand-blue transition group-hover:bg-navy group-hover:text-white">
                      <Icon size={24} />
                    </div>
                    <span className="font-heading text-sm font-bold text-slate-300">
                      {service.number}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-bold text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-3 min-h-[84px] text-sm leading-6 text-muted">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-navy transition group-hover:text-brand-blue"
                  >
                    Learn more <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY SKIK */}
      <section className="section-padding overflow-hidden bg-navy text-white">
        <div className="container-width grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="section-label !text-[#86C33C]">
              The Skik difference
            </span>
            <h2 className="mt-5 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
              Your ambitions deserve
              <br />
              <span className="text-[#86C33C]">the right guidance.</span>
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              Every student's journey is different. We help you understand
              your options, prepare your documents, and take informed steps
              towards your international education goals.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: Users,
                  title: "Personalized Support",
                  text: "Guidance tailored to your goals.",
                },
                {
                  icon: ShieldCheck,
                  title: "Application Guidance",
                  text: "Help understanding documentation and processes.",
                },
                {
                  icon: GraduationCap,
                  title: "Education Planning",
                  text: "Explore suitable courses and destinations.",
                },
                {
                  icon: MessageCircle,
                  title: "Friendly Assistance",
                  text: "Get answers to your questions along the way.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#86C33C]">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/about"
              className="mt-9 inline-flex items-center gap-2 font-bold text-[#86C33C] hover:text-white"
            >
              More about Skik International <ArrowRight size={17} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-brand-blue/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <div className="relative h-[430px]">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85"
                  alt="Students collaborating on their education goals"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/15 bg-navy/70 p-5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <Plane size={26} className="text-[#86C33C]" />
                    <div>
                      <p className="font-heading text-lg font-bold">
                        Your future has no borders.
                      </p>
                      <p className="mt-1 text-sm text-slate-300">
                        Start planning your next chapter today.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface">
        <div className="container-width">
          <div className="relative overflow-hidden rounded-2xl bg-white px-6 py-12 shadow-sm sm:px-12 sm:py-14 lg:px-16">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <span className="section-label">Your next step starts here</span>
                <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
                  Let's turn your global
                  <br className="hidden sm:block" /> ambitions into a plan.
                </h2>
                <p className="mt-4 leading-7 text-muted">
                  Talk to our team about your education goals, visa guidance,
                  or English language preparation.
                </p>
              </div>
              <div className="relative flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">

                <Link
                  href="/contact"
                  style={{ color: "#ffffff" }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-4 font-bold transition hover:bg-brand-blue"
                >
                  Book a Consultation
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="https://wa.me/918000576969"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-4 font-bold text-navy transition hover:bg-surface"
                >
                  <MessageCircle size={18} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
