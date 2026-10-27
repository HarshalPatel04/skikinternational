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
                { error: "Unauthorized. Please sign in as an administrator." },
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
                    error:
                        "Only the primary administrator can send invitations.",
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
                    error:
                        "This email belongs to the primary administrator.",
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
                        error:
                            "Unable to verify the account. Please try again.",
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

        // Use the configured application URL rather than trusting
        // the incoming request's Host header.
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

        const redirectTo = new URL(
            "/admin/accept-invite",
            siteUrl
        ).toString();

        // Send the invitation. Do not grant admin privileges here.
        const { data, error } =
            await serviceClient.auth.admin.inviteUserByEmail(email, {
                redirectTo,
            });

        // Send the invitation email.
        const { data, error } =
            await serviceClient.auth.admin.inviteUserByEmail(email, {
                redirectTo,
            });

        if (error || !data.user) {
            console.error(
                "Admin invitation failed:",
                error?.message
            );

            return NextResponse.json(
                {
                    error:
                        "Unable to send the invitation. Please try again.",
                },
                { status: 500 }
            );
        }

        // Record the invitation as pending.
        // Do not grant admin privileges yet.
        const { error: pendingError } = await serviceClient
            .from("pending_admin_invites")
            .insert({
                user_id: data.user.id,
                email,
            });

        if (pendingError) {
            console.error(
                "Unable to record pending invitation:",
                pendingError.message
            );

            // Clean up the newly created Auth account if recording
            // the invitation failed.
            const { error: cleanupError } =
                await serviceClient.auth.admin.deleteUser(data.user.id);

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
        console.error("Admin invitation error:", error.message);

        return NextResponse.json(
            {
                error:
                    "Unable to send the invitation. Please try again.",
            },
            { status: 500 }
        );
    }
}