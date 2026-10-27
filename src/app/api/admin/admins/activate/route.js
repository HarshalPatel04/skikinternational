import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

export async function POST() {
    try {
        // Verify the user's actual Supabase session.
        const supabase = await createClient();

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser();

        if (authError || !user || !user.email) {
            return NextResponse.json(
                { error: "Please accept your invitation and sign in first." },
                { status: 401 }
            );
        }

        const serviceClient = createServiceClient();

        // Confirm the account exists and its email has been verified.
        const {
            data: { user: verifiedUser },
            error: verifiedUserError,
        } = await serviceClient.auth.admin.getUserById(user.id);

        if (
            verifiedUserError ||
            !verifiedUser ||
            !verifiedUser.email_confirmed_at ||
            verifiedUser.email?.trim().toLowerCase() !==
            user.email.trim().toLowerCase()
        ) {
            return NextResponse.json(
                {
                    error:
                        "Your email must be verified before administrator access can be activated.",
                },
                { status: 403 }
            );
        }

        // The invitation must belong to this authenticated account.
        const { data: pendingInvite, error: pendingError } =
            await serviceClient
                .from("pending_admin_invites")
                .select("user_id, email")
                .eq("user_id", user.id)
                .maybeSingle();

        if (pendingError) {
            console.error(
                "Unable to check pending invitation:",
                pendingError.message
            );

            return NextResponse.json(
                { error: "Unable to verify your invitation. Please try again." },
                { status: 500 }
            );
        }

        if (
            !pendingInvite ||
            pendingInvite.email.trim().toLowerCase() !==
            user.email.trim().toLowerCase()
        ) {
            return NextResponse.json(
                {
                    error:
                        "No valid pending invitation was found for this account.",
                },
                { status: 403 }
            );
        }

        // Grant administrator access only to the authenticated invitee.
        const { error: insertError } = await serviceClient
            .from("admin_users")
            .upsert(
                { user_id: user.id },
                { onConflict: "user_id", ignoreDuplicates: true }
            );

        if (insertError) {
            console.error(
                "Unable to activate administrator:",
                insertError.message
            );

            return NextResponse.json(
                { error: "Unable to activate your account. Please try again." },
                { status: 500 }
            );
        }

        // Remove the pending invitation after activation.
        const { error: deleteError } = await serviceClient
            .from("pending_admin_invites")
            .delete()
            .eq("user_id", user.id);

        if (deleteError) {
            // Access is already granted. Log cleanup failure without
            // incorrectly reporting that activation failed.
            console.error(
                "Unable to remove pending invitation:",
                deleteError.message
            );
        }

        return NextResponse.json(
            { message: "Your administrator account has been activated." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Admin activation error:", error.message);

        return NextResponse.json(
            { error: "Unable to activate your account. Please try again." },
            { status: 500 }
        );
    }
}
