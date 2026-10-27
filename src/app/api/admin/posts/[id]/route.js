import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { verifyAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request, { params }) {
    try {
        // 1. Verify administrator access.
        const { authorized, supabase } = await verifyAdmin();

        if (!authorized) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in as an admin." },
                { status: 401 }
            );
        }

        // 2. Validate the post ID.
        const { id } = await params;

        const uuidPattern =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (!uuidPattern.test(id)) {
            return NextResponse.json(
                { error: "Invalid post ID." },
                { status: 400 }
            );
        }

        // 3. Fetch the post using the authenticated Supabase client.
        const { data: post, error: fetchError } = await supabase
            .from("posts")
            .select("id, media_type, media_url")
            .eq("id", id)
            .maybeSingle();

        if (fetchError) {
            console.error("Post lookup failed:", fetchError.message);

            return NextResponse.json(
                { error: "Unable to retrieve the post." },
                { status: 500 }
            );
        }

        if (!post) {
            return NextResponse.json(
                { error: "Post not found." },
                { status: 404 }
            );
        }

        // 4. Verify the stored media URL belongs to our Cloudinary folder.
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

        if (!cloudName) {
            return NextResponse.json(
                { error: "Cloudinary is not configured." },
                { status: 500 }
            );
        }

        let mediaUrl;

        try {
            mediaUrl = new URL(post.media_url);
        } catch {
            return NextResponse.json(
                { error: "The stored media URL is invalid." },
                { status: 400 }
            );
        }

        if (
            mediaUrl.protocol !== "https:" ||
            mediaUrl.hostname !== "res.cloudinary.com"
        ) {
            return NextResponse.json(
                { error: "The stored media URL is not a valid Cloudinary URL." },
                { status: 400 }
            );
        }

        const pathParts = mediaUrl.pathname
            .split("/")
            .filter(Boolean);

        if (
            pathParts.length < 4 ||
            pathParts[0] !== cloudName ||
            pathParts[1] !== (post.media_type === "video" ? "video" : "image") ||
            pathParts[2] !== "upload"
        ) {
            return NextResponse.json(
                { error: "The stored media URL is not valid for this post." },
                { status: 400 }
            );
        }

        // Cloudinary URLs can include version numbers and transformations.
        // Remove transformation segments and the version to recover the public ID.
        let uploadParts = pathParts.slice(3);

        while (
            uploadParts.length > 0 &&
            /^(?:c_[^/]+|w_[^/]+|h_[^/]+|q_[^/]+|f_[^/]+|e_[^/]+|a_[^/]+|g_[^/]+|ar_[^/]+|so_[^/]+|du_[^/]+|vc_[^/]+|br_[^/]+|ac_[^/]+|fl_[^/]+|t_[^/]+)$/.test(
                uploadParts[0]
            )
        ) {
            uploadParts = uploadParts.slice(1);
        }

        if (uploadParts[0] && /^v\d+$/.test(uploadParts[0])) {
            uploadParts = uploadParts.slice(1);
        }

        const lastPart = uploadParts[uploadParts.length - 1];

        if (!lastPart) {
            return NextResponse.json(
                { error: "Unable to identify the media asset." },
                { status: 400 }
            );
        }

        // Uploaded assets should be in skik-international/posts.
        const fileName = lastPart.replace(/\.[^.]+$/, "");
        const publicId = [...uploadParts.slice(0, -1), fileName].join("/");

        if (
            !publicId.startsWith("skik-international/posts/") ||
            publicId.includes("..")
        ) {
            return NextResponse.json(
                { error: "The media asset is outside the permitted folder." },
                { status: 400 }
            );
        }

        // 5. Delete the Cloudinary asset.
        const resourceType = post.media_type === "video" ? "video" : "image";

        const cloudinaryResult = await cloudinary.uploader.destroy(
            publicId,
            { resource_type: resourceType }
        );

        if (
            cloudinaryResult.result !== "ok" &&
            cloudinaryResult.result !== "not found"
        ) {
            console.error("Cloudinary deletion failed:", cloudinaryResult);

            return NextResponse.json(
                {
                    error:
                        "Cloudinary could not delete the media. The post was not deleted.",
                },
                { status: 502 }
            );
        }

        // 6. Delete the database record.
        const { error: deleteError } = await supabase
            .from("posts")
            .delete()
            .eq("id", post.id);

        if (deleteError) {
            console.error("Database deletion failed:", deleteError.message);

            return NextResponse.json(
                {
                    error:
                        "Media deletion was attempted, but the database record could not be deleted. Please check the post before retrying.",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: "Post and media deleted successfully.",
        });
    } catch (error) {
        console.error("Post deletion failed:", error.message);

        return NextResponse.json(
            { error: "Unable to delete the post. Please try again." },
            { status: 500 }
        );
    }
}