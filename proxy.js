import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/supabase/admin";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const { authorized, user } = await verifyAdmin();

    console.log("ADMIN AUTH DIAGNOSTIC:", {
        authorized,
        userEmail: user?.email ?? null,
    });

    if (!authorized) {
        redirect("/admin/login");
    }

    return <AdminDashboard email={user.email} />;
}