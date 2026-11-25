
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Inbox,
    Search,
    RefreshCw,
    CheckCircle2,
    Clock3,
    Save,
    UserRound,
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Loader2,
} from "lucide-react";

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [saving, setSaving] = useState({});
    const [notes, setNotes] = useState({});

    const loadInquiries = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/inquiries", {
                cache: "no-store",
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Unable to load inquiries.");
            }

            setInquiries(result.inquiries || []);

            const savedNotes = {};
            (result.inquiries || []).forEach((item) => {
                savedNotes[item.id] = item.admin_note || "";
            });

            setNotes(savedNotes);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadInquiries();
    }, [loadInquiries]);

    async function updateInquiry(id, changes) {
        setSaving((previous) => ({ ...previous, [id]: true }));

        try {
            const response = await fetch("/api/admin/inquiries", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, ...changes }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Unable to update inquiry.");
            }

            setInquiries((previous) =>
                previous.map((item) =>
                    item.id === id ? result.inquiry : item
                )
            );

            setNotes((previous) => ({
                ...previous,
                [id]: result.inquiry.admin_note || "",
            }));

            return true;
        } catch (err) {
            alert(err.message || "Unable to update inquiry.");
            return false;
        } finally {
            setSaving((previous) => ({ ...previous, [id]: false }));
        }
    }

    const filteredInquiries = useMemo(() => {
        return inquiries.filter((item) => {
            const matchesFilter =
                filter === "all" ||
                (filter === "new" && !item.is_reviewed) ||
                (filter === "reviewed" && item.is_reviewed);

            const query = search.toLowerCase();

            const matchesSearch = [
                item.full_name,
                item.email,
                item.phone,
                item.service,
                item.destination,
                item.message,
            ]
                .filter(Boolean)
                .some((value) => value.toLowerCase().includes(query));

            return matchesFilter && matchesSearch;
        });
    }, [inquiries, filter, search]);

    const newCount = inquiries.filter((item) => !item.is_reviewed).length;
    const reviewedCount = inquiries.filter((item) => item.is_reviewed).length;

    function formatDate(value) {
        return new Date(value).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    return (
        <main className="min-h-screen bg-[#f5f6f8] px-5 py-8 text-slate-800 sm:px-8 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-6xl">

                {/* HEADER */}
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-medium text-[#86C33C]">
                            ADMINISTRATION
                        </p>

                        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#101d36]">
                            Inquiries
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Manage and follow up on website inquiries.
                        </p>
                    </div>

                    <button
                        onClick={loadInquiries}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>

                {/* SUMMARY */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <Inbox size={21} />
                        </div>
                        <p className="mt-4 text-sm text-slate-500">Total inquiries</p>
                        <p className="mt-1 text-2xl font-semibold text-[#101d36]">
                            {loading ? "..." : inquiries.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-700">
                            <Clock3 size={21} />
                        </div>
                        <p className="mt-4 text-sm text-emerald-800">New inquiries</p>
                        <p className="mt-1 text-2xl font-semibold text-emerald-900">
                            {loading ? "..." : newCount}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <CheckCircle2 size={21} />
                        </div>
                        <p className="mt-4 text-sm text-slate-500">Reviewed</p>
                        <p className="mt-1 text-2xl font-semibold text-[#101d36]">
                            {loading ? "..." : reviewedCount}
                        </p>
                    </div>
                </div>

                {/* SEARCH AND FILTERS */}
                <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-sm">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search name, email, phone..."
                            className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#86C33C] focus:ring-2 focus:ring-[#86C33C]/15"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {[
                            { value: "all", label: "All" },
                            { value: "new", label: "New" },
                            { value: "reviewed", label: "Reviewed" },
                        ].map((item) => (
                            <button
                                key={item.value}
                                onClick={() => setFilter(item.value)}
                                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${filter === item.value
                                    ? "bg-[#101d36] text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                        <button
                            onClick={loadInquiries}
                            className="ml-2 font-semibold underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* INQUIRY CARDS */}
                <div className="mt-6 space-y-4">
                    {loading ? (
                        <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-slate-500">
                            <Loader2 size={22} className="mr-3 animate-spin" />
                            Loading inquiries...
                        </div>
                    ) : filteredInquiries.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-20 text-center">
                            <Inbox size={38} className="mx-auto text-slate-300" />
                            <h3 className="mt-4 text-lg font-semibold text-[#101d36]">
                                No inquiries found
                            </h3>
                            <p className="mt-2 text-sm text-slate-500">
                                {search
                                    ? "Try another search term."
                                    : "New contact form submissions will appear here."}
                            </p>
                        </div>
                    ) : (
                        filteredInquiries.map((item) => (
                            <article
                                key={item.id}
                                className={`rounded-2xl border p-5 transition-colors sm:p-6 ${!item.is_reviewed
                                    ? "border-emerald-200 bg-[#effaf1]"
                                    : "border-slate-200 bg-white"
                                    }`}
                            >
                                {/* CARD HEADER */}
                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-lg font-semibold text-[#101d36]">
                                                {item.full_name}
                                            </h2>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${item.is_reviewed
                                                    ? "bg-slate-100 text-slate-600"
                                                    : "bg-emerald-100 text-emerald-800"
                                                    }`}
                                            >
                                                {item.is_reviewed ? "Reviewed" : "New inquiry"}
                                            </span>
                                        </div>

                                        <p className="mt-2 text-xs text-slate-500">
                                            Received {formatDate(item.created_at)}
                                        </p>
                                    </div>

                                    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
                                        <input
                                            type="checkbox"
                                            checked={!!item.is_reviewed}
                                            disabled={!!saving[item.id]}
                                            onChange={(event) =>
                                                updateInquiry(item.id, {
                                                    is_reviewed: event.target.checked,
                                                })
                                            }
                                            className="h-4 w-4 accent-[#86C33C]"
                                        />
                                        Mark as reviewed
                                    </label>
                                </div>

                                {/* CONTACT DETAILS */}
                                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                                    <a
                                        href={`https://wa.me/${String(item.phone || "").replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-sm text-slate-600"
                                    >
                                        <Phone size={16} className="shrink-0 text-slate-400" />
                                        <h1>Phone :</h1>
                                        {item.phone || "No phone provided"}
                                    </a>

                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Mail size={16} className="shrink-0 text-slate-400" />
                                        <h1>Email :</h1>
                                        <span className="break-all">
                                            {item.email || "No email provided"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <UserRound size={16} className="shrink-0 text-slate-400" />
                                        <h1>Service :</h1>
                                        {item.service || "No service specified"}
                                    </div>

                                    {item.destination && (
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <MapPin size={16} className="shrink-0 text-slate-400" />
                                            <h1>Preferred destination :</h1>
                                            {item.destination}
                                        </div>
                                    )}
                                </div>

                                {/* MESSAGE */}
                                {
                                    item.message && (
                                        <div className="mt-5 rounded-xl border border-slate-200/70 bg-white/70 p-4">
                                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                <MessageSquare size={15} />
                                                Message
                                            </div>
                                            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                                                {item.message}
                                            </p>
                                        </div>
                                    )
                                }

                                {/* ADMIN NOTES */}
                                < div className="mt-5 border-t border-slate-200/70 pt-5" >
                                    <label
                                        htmlFor={`note-${item.id}`}
                                        className="text-sm font-semibold text-[#101d36]"
                                    >
                                        Internal admin note
                                    </label>

                                    <textarea
                                        id={`note-${item.id}`}
                                        value={notes[item.id] ?? ""}
                                        onChange={(event) =>
                                            setNotes((previous) => ({
                                                ...previous,
                                                [item.id]: event.target.value,
                                            }))
                                        }
                                        maxLength={5000}
                                        rows={3}
                                        placeholder="Write follow-up details, call status, next steps..."
                                        className="mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#86C33C] focus:ring-2 focus:ring-[#86C33C]/15"
                                    />

                                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                        <p className="text-xs text-slate-400">
                                            Internal only · {notes[item.id]?.length || 0}/5000
                                        </p>

                                        <button
                                            onClick={() =>
                                                updateInquiry(item.id, {
                                                    admin_note: notes[item.id] ?? "",
                                                })
                                            }
                                            disabled={!!saving[item.id]}
                                            className="inline-flex items-center gap-2 rounded-xl bg-[#101d36] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1a2e50] disabled:opacity-50"
                                        >
                                            {saving[item.id] ? (
                                                <Loader2 size={16} className="animate-spin" />
                                            ) : (
                                                <Save size={16} />
                                            )}
                                            Save note
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                {
                    !loading && filteredInquiries.length > 0 && (
                        <p className="mt-5 text-center text-xs text-slate-400">
                            Showing {filteredInquiries.length} of {inquiries.length} inquiries
                        </p>
                    )
                }
            </div >
        </main >
    );
}
