import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    const { authorized, user } = await verifyAdmin();

    if (!authorized) {
        redirect("/admin/login");
    }

    return (
        <main className="min-h-screen bg-[#f5f6f8] p-8">
            <h1 className="text-3xl font-semibold text-[#101d36]">
                Settings
            </h1>

            <p className="mt-3 text-slate-500">
                Administrator settings
            </p>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">
                    Signed in as
                </p>

                <p className="mt-2 font-medium text-[#101d36]">
                    {user?.email}
                </p>
            </div>
        </main>
    );
}