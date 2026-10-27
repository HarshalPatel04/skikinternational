import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verifyAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

export async function POST(request) {
    try {
        // 1. Verify that the user is an authenticated admin.
        const { authorized, supabase } = await verifyAdmin();

        if (!authorized) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in as an admin." },
                { status: 401 }
            );
        }

        // 2. Read the submitted form.
        const formData = await request.formData();

        const file = formData.get("file");
        const caption = formData.get("caption");
        const publishValue = formData.get("is_published");

        if (!file || typeof file === "string" || file.size === 0) {
            return NextResponse.json(
                { error: "Please select an image or video." },
                { status: 400 }
            );
        }

        if (typeof caption !== "string" || caption.length > 2000) {
            return NextResponse.json(
                { error: "Caption must be 2000 characters or fewer." },
                { status: 400 }
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: "File size must not exceed 100 MB." },
                { status: 400 }
            );
        }

        const isImage = file.type.startsWith("image/");
        const isVideo = file.type.startsWith("video/");

        if (!isImage && !isVideo) {
            return NextResponse.json(
                { error: "Only image and video files are supported." },
                { status: 400 }
            );
        }

        // 3. Upload the media to Cloudinary.
        const bytes = Buffer.from(await file.arrayBuffer());

        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "skik-international/posts",
                    resource_type: isVideo ? "video" : "image",
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(bytes);
        });

        // 4. Save the post details in Supabase.
        const { data: existingPosts, error: countError } = await supabase
            .from("posts")
            .select("display_order")
            .order("display_order", { ascending: false })
            .limit(1);

        if (countError) {
            console.error("Post order lookup failed:", countError.message);

            return NextResponse.json(
                {
                    error:
                        "Media uploaded, but the post could not be saved. Please contact the administrator.",
                },
                { status: 500 }
            );
        }

        const nextOrder = (existingPosts?.[0]?.display_order ?? -1) + 1;

        const { data: post, error: insertError } = await supabase
            .from("posts")
            .insert({
                media_type: isVideo ? "video" : "image",
                media_url: uploadResult.secure_url,
                caption: caption.trim(),
                is_published: publishValue === "true",
                display_order: nextOrder,
            })
            .select()
            .single();

        if (insertError) {
            console.error("Post save failed:", insertError.message);

            return NextResponse.json(
                {
                    error:
                        "Media uploaded, but the post could not be saved. Please contact the administrator.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: "Post uploaded successfully.",
                post,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Post upload failed:", error.message);

        return NextResponse.json(
            { error: "Upload failed. Please try again." },
            { status: 500 }
        );
    }
}