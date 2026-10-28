import { createClient } from "@/lib/supabase/server";

export async function verifyAdmin() {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        console.log("ADMIN CHECK: No authenticated user", {
            error: error?.message ?? null,
            hasUser: Boolean(user),
        });

        return {
            authorized: false,
            user: null,
            supabase,
        };
    }

    console.log("ADMIN CHECK: Authenticated user", {
        email: user.email,
        userId: user.id,
    });

    const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    console.log("ADMIN CHECK: Database result", {
        isAdmin: Boolean(admin),
        error: adminError?.message ?? null,
    });

    return {
        authorized: !adminError && Boolean(admin),
        user: !adminError && admin ? user : null,
        supabase,
    };
}