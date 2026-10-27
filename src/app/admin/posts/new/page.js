import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/supabase/admin";
import AdminNewPost from "@/components/admin/AdminNewPost";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
    const { authorized } = await verifyAdmin();

    if (!authorized) {
        redirect("/admin/login");
    }

    return <AdminNewPost />;
}