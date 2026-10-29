
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    Phone,
    Mail,
    MapPin,
    Clock,
    MessageCircle,
    GraduationCap,
} from "lucide-react";

const services = [
    "Study Abroad",
    "Visa Guidance",
    "IELTS & PTE Coaching",
    "Spoken English",
    "Other Inquiry",
];

const destinations = [
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Other Destination",
];

const WHATSAPP = "https://wa.me/918000576969";

export default function ContactPage() {
    return (
        <main className="bg-white text-navy">
            {/* HERO */}
            <section className="bg-navy px-5 py-20 text-white sm:px-8 lg:py-22">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#86C33C]">
                        <span className="h-px w-8 bg-[#86C33C]" />
                        Get in touch
                    </div>

                    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                        <div>
                            <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl">
                                Let&apos;s plan your{" "}
                                <span className="text-[#86C33C]">
                                    global journey.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                                Whether you are exploring study destinations, preparing
                                for a visa, or improving your English, our team is here
                                to help you take the next step.
                            </p>
                        </div>

                        <div className="border-l border-white/15 pl-6 lg:ml-auto lg:max-w-sm">
                            <p className="text-sm leading-7 text-slate-300">
                                Have questions about your future? Tell us what you are
                                planning, and let&apos;s discuss your options.
                            </p>
                            <a
                                href={`${WHATSAPP}?text=${encodeURIComponent(
                                    `Hello SKIK International, I would like to discuss my plans for Abroad.`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="whatsapp-cta mt-6 inline-flex items-center gap-2 rounded-lg bg-[#86C33C] px-5 py-3.5 font-bold transition hover:bg-white"
                            >
                                <MessageCircle size={18} />
                                Chat on WhatsApp
                                <ArrowUpRight size={17} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT INFORMATION + FORM */}
            <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:py-14">
                <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

                    {/* LEFT: CONTACT DETAILS */}
                    <div>
                        <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
                            <span className="h-px w-8 bg-[#86C33C]" />
                            Contact information
                        </div>

                        <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
                            We&apos;re here to help you move forward.
                        </h2>

                        <p className="mt-4 leading-7 text-slate-600">
                            Reach out to our team for guidance on study abroad,
                            applications, visas, and language preparation.
                        </p>

                        <div className="mt-9 space-y-4">

                            <a
                                href="tel:+918000576969"
                                className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-blue"
                            >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-brand-blue">
                                    <Phone size={21} />
                                </span>

                                <span>
                                    <span className="block text-sm text-slate-500">
                                        Call us
                                    </span>
                                    <span className="mt-1 block font-bold">
                                        80005 76969
                                    </span>
                                    <span className="mt-1 block text-sm text-brand-blue">
                                        Speak with our team
                                    </span>
                                </span>
                            </a>

                            <a
                                href="mailto:Skikinternational@gmail.com"
                                className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-blue"
                            >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-brand-blue">
                                    <Mail size={21} />
                                </span>

                                <span className="min-w-0">
                                    <span className="block text-sm text-slate-500">
                                        Email us
                                    </span>
                                    <span className="mt-1 block break-all font-bold">
                                        Skikinternational@gmail.com
                                    </span>
                                    <span className="mt-1 block text-sm text-brand-blue">
                                        Send your questions
                                    </span>
                                </span>
                            </a>

                            <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-brand-blue">
                                    <MapPin size={21} />
                                </span>

                                <span>
                                    <span className="block text-sm text-slate-500">
                                        Visit our office
                                    </span>
                                    <span className="mt-1 block font-bold leading-6">
                                        A-302, Pragati IT Park,
                                        Near VIP Circle,
                                        Mota Varachha, Surat, Gujarat.
                                    </span>
                                    <span className="mt-1 block text-sm text-slate-500">
                                        India
                                    </span>
                                </span>
                            </div>

                            <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-brand-blue">
                                    <Clock size={21} />
                                </span>

                                <span>
                                    <span className="block text-sm text-slate-500">
                                        Consultation
                                    </span>
                                    <span className="mt-1 block font-bold">
                                        By appointment
                                    </span>
                                    <span className="mt-1 block text-sm text-slate-500">
                                        Contact us to arrange a suitable time.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: INQUIRY FORM */}
                    <div
                        id="inquiry-form"
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
                    >
                        <div className="mb-8">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-brand-blue">
                                <GraduationCap size={25} />
                            </span>

                            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                                Tell us about your plans.
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Fill in your details and prepare for your next step.
                            </p>
                        </div>

                        <form
                            action="https://formsubmit.co/Skikinternational@gmail.com"
                            method="POST"
                            className="space-y-5"
                        >
                            <input
                                type="hidden"
                                name="_subject"
                                value="New inquiry - SKIK International Website"
                            />

                            <input
                                type="hidden"
                                name="_captcha"
                                value="true"
                            />

                            <input
                                type="hidden"
                                name="_template"
                                value="table"
                            />

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="mb-2 block text-sm font-semibold"
                                    >
                                        Full name *
                                    </label>

                                    <input
                                        id="fullName"
                                        name="Full Name"
                                        type="text"
                                        autoComplete="name"
                                        placeholder="Enter your full name"
                                        required
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-semibold"
                                    >
                                        Phone number *
                                    </label>

                                    <input
                                        id="phone"
                                        name="Phone"
                                        type="tel"
                                        autoComplete="tel"
                                        inputMode="tel"
                                        placeholder="Enter your phone number"
                                        required
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    name="Email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="service"
                                        className="mb-2 block text-sm font-semibold"
                                    >
                                        Service interested in *
                                    </label>

                                    <select
                                        id="service"
                                        name="Service"
                                        required
                                        defaultValue=""
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-blue"
                                    >
                                        <option value="" disabled>
                                            Select a service
                                        </option>

                                        {services.map((service) => (
                                            <option key={service} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="destination"
                                        className="mb-2 block text-sm font-semibold"
                                    >
                                        Preferred destination
                                    </label>

                                    <select
                                        id="destination"
                                        name="Preferred Destination"
                                        defaultValue=""
                                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-brand-blue"
                                    >
                                        <option value="">
                                            Select destination
                                        </option>

                                        {destinations.map((destination) => (
                                            <option key={destination} value={destination}>
                                                {destination}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block text-sm font-semibold"
                                >
                                    Tell us more
                                </label>

                                <textarea
                                    id="message"
                                    name="Message"
                                    rows={4}
                                    placeholder="Share your questions or plans..."
                                    className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                                />
                            </div>

                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-4 font-bold text-white transition hover:bg-brand-blue"
                            >
                                Submit Your Inquiry
                                <ArrowRight size={18} />
                            </button>

                            <p className="text-center text-xs leading-5 text-slate-500">
                                Your details will be used to respond to your inquiry.
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            {/* MAP */}
            <section className="px-5 py-16 sm:px-8 lg:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">
                                <span className="h-px w-8 bg-[#86C33C]" />
                                Find us
                            </div>

                            <h2 className="text-3xl font-bold sm:text-4xl">
                                Visit SKIK International.
                            </h2>

                            <p className="mt-3 text-slate-600">
                                A-302, Pragati IT Park, Near VIP Circle, Surat.
                            </p>
                        </div>

                        <a
                            href="https://maps.app.goo.gl/dRZBhFw6XC8SCYFz6"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-bold text-brand-blue hover:underline"
                        >
                            Open in Google Maps
                            <ArrowUpRight size={18} />
                        </a>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                        <iframe
                            title="SKIK International office location in Surat"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3365.4465651904275!2d72.8711948!3d21.234247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f0528af9cc3%3A0xf45ebb911e70074b!2sSkik%20International%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1792683395261!5m2!1sen!2sin" width="100%"
                            height="400"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="block w-full"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
