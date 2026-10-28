"use client";

import { useState } from "react";

export default function AdminInviteForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setMessage("");
        setError(false);

        try {
            const response = await fetch("/api/admin/admins/invite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Unable to send the invitation."
                );
            }

            setMessage(
                data.message || "Invitation sent successfully."
            );
            setEmail("");
        } catch (err) {
            setError(true);
            setMessage(
                err.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl">
            <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-medium text-[#101d36]"
            >
                Administrator email address
            </label>

            <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                required
                maxLength={254}
                autoComplete="email"
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-[#101d36] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
                type="submit"
                disabled={loading}
                className="mt-4 rounded-lg bg-[#101d36] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1c3157] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? "Sending invitation..." : "Invite Administrator"}
            </button>

            {message && (
                <p
                    role="status"
                    className={`mt - 4 rounded - lg p - 3 text - sm ${error
                            ? "bg-red-50 text-red-700"
                            : "bg-emerald-50 text-emerald-700"
                        } `}
                >
                    {message}
                </p>
            )}
        </form>
    );
}
