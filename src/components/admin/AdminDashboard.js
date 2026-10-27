"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    ImagePlus,
    Images,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";

export default function AdminDashboard({ email }) {
    const router = useRouter();
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const [stats, setStats] = useState({
        total: null,
        published: null,
        drafts: null,
    });
    const [statsError, setStatsError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function loadStats() {
            try {
                const supabase = createClient();

                const [
                    { count: total, error: totalError },
                    { count: published, error: publishedError },
                    { count: drafts, error: draftsError },
                ] = await Promise.all([
                    supabase
                        .from("posts")
                        .select("*", { count: "exact", head: true }),

                    supabase
                        .from("posts")
                        .select("*", { count: "exact", head: true })
                        .eq("is_published", true),

                    supabase
                        .from("posts")
                        .select("*", { count: "exact", head: true })
                        .eq("is_published", false),
                ]);

                if (totalError || publishedError || draftsError) {
                    throw totalError || publishedError || draftsError;
                }

                if (isMounted) {
                    setStats({
                        total: total ?? 0,
                        published: published ?? 0,
                        drafts: drafts ?? 0,
                    });
                    setStatsError(false);
                }
            } catch (error) {
                console.error("Unable to load dashboard statistics:", error);

                if (isMounted) {
                    setStatsError(true);
                }
            }
        }

        loadStats();

        return () => {
            isMounted = false;
        };
    }, []);

    async function handleLogout() {
        setLoggingOut(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();

            if (error) {
                throw error;
            }

            router.replace("/admin/login");
            router.refresh();
        } catch {
            alert("Unable to sign out. Please try again.");
            setLoggingOut(false);
        }
    }

    const menuItems = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/admin",
        },
        {
            label: "All Posts",
            icon: Images,
            href: "/admin/posts",
        },
        {
            label: "Add New Post",
            icon: ImagePlus,
            href: "/admin/posts/new",
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/admin/settings",
        },
    ];

    return (
        <main className="min-h-screen bg-[#f5f6f8] text-slate-800">
            {/* Mobile header */}
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#86C33C]">
                        SKIK International
                    </p>
                    <h1 className="mt-1 text-lg font-semibold text-[#101d36]">
                        Admin Portal
                    </h1>
                </div>

                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    className="rounded-lg p-2 hover:bg-slate-100"
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </header>

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside
                    className={`${menuOpen ? "block" : "hidden"
                        } absolute inset-x-0 top-[81px] z-20 border-b border-slate-200 bg-white p-5 lg:static lg:block lg:min-h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-7`}
                >
                    <div className="mb-10 hidden lg:block">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#86C33C]">
                            SKIK International
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-[#101d36]">
                            Admin Portal
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Website management
                        </p>
                    </div>

                    <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Workspace
                    </p>

                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active
                                        ? "admin-sidebar-link-active bg-[#101d36]"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-[#101d36]"
                                        }`}
                                >
                                    <Icon size={19} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-10 border-t border-slate-100 pt-6">
                        <p className="break-all px-3 text-xs text-slate-500">
                            Signed in as
                        </p>

                        <p className="mt-2 break-all px-3 text-sm font-medium text-[#101d36]">
                            {email}
                        </p>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="mt-5 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                            <LogOut size={19} />
                            {loggingOut ? "Signing out..." : "Sign out"}
                        </button>
                    </div>
                </aside>

                {/* Main content */}
                <section className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-medium text-[#86C33C]">
                                    OVERVIEW
                                </p>

                                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#101d36]">
                                    Welcome back!
                                </h1>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Manage the content displayed on your website.
                                </p>
                            </div>

                            <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                Administrator access
                            </div>
                        </div>

                        {/* Summary cards */}
                        <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Images size={22} />
                                </div>

                                <p className="mt-5 text-sm text-slate-500">
                                    Total Posts
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-[#101d36]">
                                    {stats.total === null ? "..." : statsError ? "—" : stats.total}
                                </p>

                                <p className="mt-2 text-xs text-slate-400">
                                    All uploaded posts
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                    <ImagePlus size={22} />
                                </div>

                                <p className="mt-5 text-sm text-slate-500">
                                    Published Posts
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-[#101d36]">
                                    {stats.published === null ? "..." : statsError ? "—" : stats.published}
                                </p>

                                <p className="mt-2 text-xs text-slate-400">
                                    Posts visible on your website
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:col-span-2 xl:col-span-1">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                    <Settings size={22} />
                                </div>

                                <p className="mt-5 text-sm text-slate-500">
                                    Draft Posts
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-[#101d36]">
                                    {stats.drafts === null ? "..." : statsError ? "—" : stats.drafts}
                                </p>

                                <p className="mt-2 text-xs text-slate-400">
                                    Posts not yet published
                                </p>
                            </div>
                        </div>

                        {/* Getting started */}
                        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#86C33C]">
                                Next step
                            </p>

                            <h2 className="mt-3 text-xl font-semibold text-[#101d36]">
                                Bring your website content to life
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                                Soon, you will be able to upload images and videos,
                                write captions, preview your posts, and control
                                which posts appear in the homepage carousel—all
                                without editing your website code.
                            </p>

                            <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#f5f6f8] p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#86C33C]">
                                    <ImagePlus size={20} />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-[#101d36]">
                                        Post management
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Upload, edit, publish, and organize content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}