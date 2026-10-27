"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AcceptInvitePage() {
    const router = useRouter();

    const [supabase] = useState(() => createClient());
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [validInvite, setValidInvite] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function verifyInvitation() {
            try {
                const url = new URL(window.location.href);
                const hashParams = new URLSearchParams(
                    url.hash.replace(/^#/, "")
                );

                // Supabase may return an authentication error in the URL.
                const authError =
                    url.searchParams.get("error_description") ||
                    hashParams.get("error_description");

                if (authError) {
                    throw new Error(
                        "This invitation link is invalid or expired. Ask the primary administrator to send a new invitation."
                    );
                }

                const accessToken = hashParams.get("access_token");
                const refreshToken = hashParams.get("refresh_token");
                const tokenType = hashParams.get("type");

                if (accessToken && refreshToken) {
                    if (tokenType !== "invite") {
                        throw new Error(
                            "This link is not a valid administrator invitation."
                        );
                    }

                    const { error: sessionError } =
                        await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        });

                    if (sessionError) {
                        throw sessionError;
                    }
                } else {
                    throw new Error(
                        "No valid invitation session was found. Open the original invitation email or request a new invitation."
                    );
                }

                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError || !user || !user.email) {
                    throw new Error(
                        "Unable to verify your account. Please request a new invitation."
                    );
                }

                if (!active) return;

                setEmail(user.email);
                setValidInvite(true);

                // Remove sensitive tokens from the visible URL.
                window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname
                );
            } catch (err) {
                if (!active) return;

                setError(
                    err.message ||
                    "Unable to verify your invitation."
                );
            } finally {
                if (active) setLoading(false);
            }
        }

        verifyInvitation();

        return () => {
            active = false;
        };
    }, [supabase]);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (password.length < 8) {
            setError("Your password must contain at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("The passwords do not match.");
            return;
        }

        setSaving(true);

        try {
            // Set the password for the invited account.
            const { error: passwordError } =
                await supabase.auth.updateUser({ password });

            if (passwordError) {
                throw passwordError;
            }

            // Ask the server to verify the pending invitation
            // and activate this authenticated account.
            const response = await fetch(
                "/api/admin/admins/activate",
                {
                    method: "POST",
                    credentials: "same-origin",
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error ||
                    "Unable to activate your administrator account."
                );
            }

            router.replace("/admin");
        } catch (err) {
            setError(
                err.message ||
                "Unable to complete setup. Please try again."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-5 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-5 text-center text-3xl font-semibold text-[#102747]">
                    SKIK International
                </div>

                <h1 className="mb-2 text-center text-2xl font-semibold text-[#102747]">
                    Set Up Your Admin Account
                </h1>

                <p className="mb-7 text-center text-sm text-gray-600">
                    {loading
                        ? "Verifying your invitation..."
                        : validInvite
                            ? `Invitation verified for ${email}`
                            : "We couldn't verify your invitation."}
                </p>

                {loading && (
                    <p className="text-center text-sm text-gray-500">
                        Please wait...
                    </p>
                )}

                {validInvite && !loading && (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Create password
                            </label>

                            <input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#102747] focus:ring-1 focus:ring-[#102747]"
                                placeholder="At least 8 characters"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Confirm password
                            </label>

                            <input
                                id="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                minLength={8}
                                required
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-[#102747] focus:ring-1 focus:ring-[#102747]"
                                placeholder="Enter password again"
                            />
                        </div>

                        {error && (
                            <div
                                role="alert"
                                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-lg bg-[#102747] px-5 py-3 font-medium text-white transition hover:bg-[#193b66] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving
                                ? "Setting up account..."
                                : "Set Password & Activate Account"}
                        </button>
                    </form>
                )}

                {!loading && !validInvite && (
                    <div>
                        {error && (
                            <div
                                role="alert"
                                className="rounded-lg bg-red-50 p-4 text-sm text-red-700"
                            >
                                {error}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={() => router.replace("/admin/login")}
                            className="mt-5 w-full rounded-lg bg-[#102747] px-5 py-3 font-medium text-white"
                        >
                            Go to Admin Login
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
