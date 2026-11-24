
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function getServiceClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}

// GET: Fetch all inquiries for the admin panel.
export async function GET() {
    try {
        const { authorized, supabase } = await verifyAdmin();

        if (!authorized) {
            return NextResponse.json(
                { error: "Unauthorized access." },
                { status: 401 }
            );
        }

        const serviceClient = getServiceClient();

        const { data, error } = await serviceClient
            .from("inquiries")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Fetch inquiries error:", error);

            return NextResponse.json(
                { error: "Unable to fetch inquiries." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            inquiries: data || [],
        });
    } catch (error) {
        console.error("GET inquiries error:", error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}

// POST: Receive contact form submissions.
export async function POST(request) {
    try {
        const body = await request.json();

        const {
            fullName,
            phone,
            email,
            service,
            destination,
            message,
            website,
        } = body;

        // Honeypot field: silently reject automated spam.
        if (website) {
            return NextResponse.json({ success: true });
        }

        // Validate required fields.
        if (
            typeof fullName !== "string" ||
            typeof phone !== "string" ||
            typeof service !== "string" ||
            !fullName.trim() ||
            !phone.trim() ||
            !service.trim()
        ) {
            return NextResponse.json(
                { error: "Please fill in all required fields." },
                { status: 400 }
            );
        }

        if (
            fullName.length > 150 ||
            phone.length > 30 ||
            service.length > 100 ||
            (email && (typeof email !== "string" || email.length > 254)) ||
            (destination && (typeof destination !== "string" || destination.length > 100)) ||
            (message && (typeof message !== "string" || message.length > 5000))
        ) {
            return NextResponse.json(
                { error: "Some submitted information is too long." },
                { status: 400 }
            );
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            return NextResponse.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }

        const serviceClient = getServiceClient();

        const { error } = await serviceClient
            .from("inquiries")
            .insert({
                full_name: fullName.trim(),
                phone: phone.trim(),
                email: email?.trim() || null,
                service: service.trim(),
                destination: destination?.trim() || null,
                message: message?.trim() || null,
            });

        if (error) {
            console.error("Inquiry insert error:", error);

            return NextResponse.json(
                { error: "Your inquiry could not be submitted. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Your inquiry has been submitted successfully.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Inquiry API error:", error);

        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}


export async function PATCH(request) {
    try {
        const { authorized, supabase } = await verifyAdmin();

        if (!authorized) {
            return NextResponse.json(
                { error: "Unauthorized access." },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { id, is_reviewed, admin_note } = body;

        const uuidPattern =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!uuidPattern.test(id || "")) {
            return NextResponse.json(
                { error: "Invalid inquiry ID." },
                { status: 400 }
            );
        }

        const updates = {};

        if (typeof is_reviewed === "boolean") {
            updates.is_reviewed = is_reviewed;
        }

        if (typeof admin_note === "string") {
            if (admin_note.length > 5000) {
                return NextResponse.json(
                    { error: "Notes must be 5000 characters or fewer." },
                    { status: 400 }
                );
            }

            updates.admin_note = admin_note;
        }

        if (Object.keys(updates).length === 0) {
            return NextResponse.json(
                { error: "No valid changes provided." },
                { status: 400 }
            );
        }

        const serviceClient = getServiceClient();

        const { data, error } = await serviceClient
            .from("inquiries")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Inquiry update error:", error);

            return NextResponse.json(
                { error: "Unable to update inquiry." },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            inquiry: data,
        });
    } catch (error) {
        console.error("Inquiry PATCH error:", error);

        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}
