"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LockKeyhole, Mail, ArrowRight, LoaderCircle } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const supabase = createClient();

            const { data, error: loginError } =
                await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password,
                });

            if (loginError) {
                console.error("Supabase login error:", loginError.message);
                setError(loginError.message);
                return;
            }

            console.log("Login successful:", data.user?.email);
            console.log("Session received:", Boolean(data.session));

            if (data.session) {
                window.location.href = "/admin";
            } else {
                setError("Login completed, but no session was created.");
            }
        } catch {
            setError("Unable to sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f5f6f8] px-5 py-12">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#101d36] text-[#86C33C] shadow-lg">
                        <LockKeyhole size={29} />
                    </div>

                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#86C33C]">
                        SKIK International
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight text-[#101d36]">
                        Admin Portal
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Sign in to manage your website content.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-9">
                    <h2 className="text-xl font-semibold text-[#101d36]">
                        Welcome back
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Enter your administrator credentials.
                    </p>

                    <form onSubmit={handleLogin} className="mt-7 space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="username"
                                    required
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="admin@example.com"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#b28b45] focus:ring-2 focus:ring-[#b28b45]/20"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#b28b45] focus:ring-2 focus:ring-[#b28b45]/20"
                                />
                            </div>
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101d36] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1a2d4d] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-7 border-t border-slate-100 pt-5 text-center">
                        <p className="text-xs text-slate-400">
                            Restricted access · Authorized administrators only
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    © {new Date().getFullYear()} SKIK International
                </p>
            </div>
        </main>
    );
}