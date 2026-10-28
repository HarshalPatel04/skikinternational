import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/supabase/admin";
import AdminInviteForm from "@/components/admin/AdminInviteForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    const { authorized, user } = await verifyAdmin();

    if (!authorized) {
        redirect("/admin/login");
    }

    const primaryAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const isPrimaryAdmin =
        user?.email?.trim().toLowerCase() === primaryAdminEmail;

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

            {isPrimaryAdmin && (
                <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
                    <div>
                        <h2 className="text-xl font-semibold text-[#101d36]">
                            Administrator Management
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Invite another administrator to manage website
                            content. Only the primary administrator can send
                            invitations.
                        </p>
                    </div>

                    <div className="mt-6">
                        <AdminInviteForm />
                    </div>
                </section>
            )}
        </main>
    );
}
