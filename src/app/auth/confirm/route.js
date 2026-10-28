import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
    const requestUrl = new URL(request.url);

    const tokenHash = requestUrl.searchParams.get("token_hash");
    const type = requestUrl.searchParams.get("type");

    if (!tokenHash || type !== "invite") {
        return NextResponse.redirect(
            new URL(
                "/admin/login?error=invalid_invitation",
                requestUrl.origin
            )
        );
    }

    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: "invite",
        });

        if (error) {
            console.error(
                "Invitation verification failed:",
                error.message
            );

            return NextResponse.redirect(
                new URL(
                    "/admin/login?error=invitation_verification_failed",
                    requestUrl.origin
                )
            );
        }

        // Successful verification establishes the session in cookies.
        return NextResponse.redirect(
            new URL("/admin/accept-invite", requestUrl.origin)
        );
    } catch (error) {
        console.error(
            "Invitation callback error:",
            error instanceof Error ? error.message : "Unknown error"
        );

        return NextResponse.redirect(
            new URL(
                "/admin/login?error=invitation_verification_failed",
                requestUrl.origin
            )
        );
    }
}
