"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
    LockKeyhole,
    Mail,
    ArrowRight,
    LoaderCircle,
} from "lucide-react";

export default function AcceptInvitePage() {
    const router = useRouter();

    const [supabase] = useState(() => createClient());
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checking, setChecking] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        let active = true;

        async function checkInvitationSession() {
            try {
                // Read the invitation session tokens from the URL fragment.
                const hash = window.location.hash.substring(1);
                const params = new URLSearchParams(hash);

                const accessToken = params.get("access_token");
                const refreshToken = params.get("refresh_token");
                const type = params.get("type");

                if (type === "invite" && accessToken && refreshToken) {
                    const { error: sessionError } =
                        await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        });

                    if (sessionError) {
                        throw sessionError;
                    }

                    // Remove sensitive tokens from the visible URL.
                    window.history.replaceState(
                        null,
                        "",
                        window.location.pathname
                    );
                }

                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (!active) return;

                if (userError || !user) {
                    setError(
                        "Your invitation session is missing or expired. Please open the invitation email again."
                    );
                    setChecking(false);
                    return;
                }

                setEmail(user.email || "");
                setChecking(false);
            } catch (error) {
                console.error(
                    "Invitation session error:",
                    error instanceof Error ? error.message : "Unknown error"
                );

                if (!active) return;

                setError(
                    "Unable to verify your invitation. Please open the invitation email again."
                );
                setChecking(false);
            }
        }

        checkInvitationSession();

        return () => {
            active = false;
        };
    }, [supabase]);

    async function handleSubmit(event) {
        event.preventDefault();

        setError("");
        setMessage("");

        if (password.length < 8) {
            setError("Your password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("The passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            // Set the password for the invited account.
            const { error: passwordError } =
                await supabase.auth.updateUser({ password });

            if (passwordError) {
                setError(passwordError.message);
                return;
            }

            // Activate administrator access only after the password is set.
            const response = await fetch(
                "/api/admin/admins/activate",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const result = await response.json();

            if (!response.ok) {
                setError(
                    result.error ||
                    "Unable to activate your administrator account."
                );
                return;
            }

            setMessage(
                "Your administrator account is ready. Redirecting to the dashboard..."
            );

            router.replace("/admin");
            router.refresh();
        } catch {
            setError(
                "Something went wrong. Please try again."
            );
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
                        Accept Invitation
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        Set a secure password to activate your administrator account.
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 sm:p-9">
                    {checking ? (
                        <div className="flex items-center justify-center gap-3 py-8 text-sm text-slate-500">
                            <LoaderCircle
                                size={20}
                                className="animate-spin"
                            />
                            Verifying invitation...
                        </div>
                    ) : (
                        <>
                            {email && (
                                <div className="mb-6 rounded-xl bg-slate-50 p-4">
                                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                                        Invited email
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-medium text-[#101d36]">
                                        <Mail
                                            size={17}
                                            className="shrink-0 text-slate-400"
                                        />
                                        <span className="break-all">
                                            {email}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Create password
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="At least 8 characters"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-[#b28b45] focus:ring-2 focus:ring-[#b28b45]/20"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        Confirm password
                                    </label>

                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        minLength={8}
                                        value={confirmPassword}
                                        onChange={(event) =>
                                            setConfirmPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Re-enter your password"
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-[#b28b45] focus:ring-2 focus:ring-[#b28b45]/20"
                                    />
                                </div>

                                {error && (
                                    <div
                                        role="alert"
                                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                                    >
                                        {error}
                                    </div>
                                )}

                                {message && (
                                    <div
                                        role="status"
                                        className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700"
                                    >
                                        {message}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        !email ||
                                        checking
                                    }
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#101d36] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#1a2d4d] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <LoaderCircle
                                                size={18}
                                                className="animate-spin"
                                            />
                                            Activating account...
                                        </>
                                    ) : (
                                        <>
                                            Set password & continue
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Restricted access · Authorized administrators only
                </p>
            </div>
        </main>
    );
}