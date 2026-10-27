import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/supabase/admin";
import AdminPosts from "@/components/admin/AdminPosts";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
    const { authorized } = await verifyAdmin();

    if (!authorized) {
        redirect("/admin/login");
    }

    return <AdminPosts />;
}