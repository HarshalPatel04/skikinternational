import { createClient } from "@/lib/supabase/server";

export async function verifyAdmin() {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        return {
            authorized: false,
            user: null,
            supabase,
        };
    }

    const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    return {
        authorized: !adminError && Boolean(admin),
        user: !adminError && admin ? user : null,
        supabase,
    };
}