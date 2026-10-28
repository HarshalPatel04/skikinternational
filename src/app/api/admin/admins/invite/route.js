import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/supabase/admin";
import { createServiceClient } from "@/lib/supabase/service";

export const runtime = "nodejs";

export async function POST(request) {
    try {
        // Verify the signed-in administrator.
        const { authorized, user } = await verifyAdmin();

        if (!authorized || !user) {
            return NextResponse.json(
                {
                    error: "Unauthorized. Please sign in as an administrator.",
                },
                { status: 401 }
            );
        }

        // Only the primary administrator may invite other admins.
        const primaryAdminEmail = process.env.ADMIN_EMAIL
            ?.trim()
            .toLowerCase();

        const currentEmail = user.email?.trim().toLowerCase();

        if (!primaryAdminEmail || currentEmail !== primaryAdminEmail) {
            return NextResponse.json(
                {
                    error: "Only the primary administrator can send invitations.",
                },
                { status: 403 }
            );
        }

        // Validate the requested email address.
        const body = await request.json();

        const email =
            typeof body.email === "string"
                ? body.email.trim().toLowerCase()
                : "";

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email) || email.length > 254) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        if (email === primaryAdminEmail) {
            return NextResponse.json(
                {
                    error: "This email belongs to the primary administrator.",
                },
                { status: 400 }
            );
        }

        const serviceClient = createServiceClient();

        // Check whether an account with this email already exists.
        let existingUser = null;
        let page = 1;
        const perPage = 1000;

        while (page <= 20) {
            const { data, error } =
                await serviceClient.auth.admin.listUsers({
                    page,
                    perPage,
                });

            if (error) {
                console.error(
                    "Unable to check existing users:",
                    error.message
                );

                return NextResponse.json(
                    {
                        error: "Unable to verify the account. Please try again.",
                    },
                    { status: 500 }
                );
            }

            existingUser = data.users.find(
                (item) =>
                    item.email?.trim().toLowerCase() === email
            );

            if (existingUser || data.users.length < perPage) {
                break;
            }

            page++;
        }

        if (existingUser) {
            return NextResponse.json(
                {
                    error:
                        "An account with this email already exists. Contact the primary administrator to review it.",
                },
                { status: 409 }
            );
        }

        // Use the configured application URL.
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

        if (!siteUrl) {
            console.error("NEXT_PUBLIC_SITE_URL is not configured.");

            return NextResponse.json(
                {
                    error:
                        "The invitation service is not configured correctly.",
                },
                { status: 500 }
            );
        }

        let redirectTo;

        try {
            const parsedSiteUrl = new URL(siteUrl);

            const isLocalhost = parsedSiteUrl.hostname === "localhost";

            if (
                (parsedSiteUrl.protocol !== "https:" && !isLocalhost) ||
                parsedSiteUrl.username ||
                parsedSiteUrl.password ||
                parsedSiteUrl.search ||
                parsedSiteUrl.hash
            ) {
                throw new Error("Invalid application URL.");
            }

            redirectTo = new URL(
                "/admin/accept-invite",
                parsedSiteUrl.origin
            ).toString();
        } catch {
            console.error("NEXT_PUBLIC_SITE_URL is invalid.");

            return NextResponse.json(
                {
                    error:
                        "The invitation service is not configured correctly.",
                },
                { status: 500 }
            );
        }

        // Send exactly one invitation.
        const {
            data: invitationData,
            error: inviteError,
        } = await serviceClient.auth.admin.inviteUserByEmail(email, {
            redirectTo,
        });

        if (inviteError || !invitationData?.user) {
            console.error(
                "Admin invitation failed:",
                inviteError?.message
            );

            return NextResponse.json(
                {
                    error: "Unable to send the invitation. Please try again.",
                },
                { status: 500 }
            );
        }

        // Record the invitation as pending.
        // Admin privileges are granted only after activation.
        const { error: pendingError } = await serviceClient
            .from("pending_admin_invites")
            .insert({
                user_id: invitationData.user.id,
                email,
            });

        if (pendingError) {
            console.error(
                "Unable to record pending invitation:",
                pendingError.message
            );

            // Remove the newly created Auth account if recording fails.
            const { error: cleanupError } =
                await serviceClient.auth.admin.deleteUser(
                    invitationData.user.id
                );

            if (cleanupError) {
                console.error(
                    "Invitation cleanup failed:",
                    cleanupError.message
                );
            }

            return NextResponse.json(
                {
                    error:
                        "The invitation could not be completed. Please try again.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: `An invitation has been sent to ${email}.`,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(
            "Admin invitation error:",
            error instanceof Error ? error.message : "Unknown error"
        );

        return NextResponse.json(
            {
                error: "Unable to send the invitation. Please try again.",
            },
            { status: 500 }
        );
    }
}
