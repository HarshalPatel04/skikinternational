"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Upload,
    ImagePlus,
    Video,
    X,
    LoaderCircle,
    CheckCircle2,
    AlertCircle,
    Eye,
} from "lucide-react";

export default function AdminNewPost() {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [isPublished, setIsPublished] = useState(true);
    const [previewUrl, setPreviewUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState(null);

    const isVideo = file?.type.startsWith("video/");

    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);

    function handleFileChange(event) {
        const selectedFile = event.target.files?.[0];

        // Allow selecting the same file again after removing it.
        event.target.value = "";

        if (!selectedFile) return;

        const validImage = selectedFile.type.startsWith("image/");
        const validVideo = selectedFile.type.startsWith("video/");

        if (!validImage && !validVideo) {
            setMessage({
                type: "error",
                text: "Please select an image or video file.",
            });
            return;
        }

        if (selectedFile.size > 100 * 1024 * 1024) {
            setMessage({
                type: "error",
                text: "The maximum file size is 100 MB.",
            });
            return;
        }

        setFile(selectedFile);
        setMessage(null);
    }

    function removeFile() {
        setFile(null);
        setMessage(null);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage(null);

        if (!file) {
            setMessage({
                type: "error",
                text: "Please select an image or video first.",
            });
            return;
        }

        if (caption.length > 2000) {
            setMessage({
                type: "error",
                text: "Caption must be 2000 characters or fewer.",
            });
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();

            formData.append("file", file);
            formData.append("caption", caption);
            formData.append("is_published", String(isPublished));

            const response = await fetch("/api/admin/posts/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Unable to upload the post.");
            }

            setMessage({
                type: "success",
                text: isPublished
                    ? "Post uploaded and published successfully!"
                    : "Post uploaded successfully as a draft.",
            });

            setFile(null);
            setCaption("");
            setIsPublished(true);
        } catch (error) {
            setMessage({
                type: "error",
                text: error.message || "Something went wrong. Please try again.",
            });
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-[#17243b] sm:px-6 lg:px-10 lg:py-9">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/admin/posts"
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                        >
                            <ArrowLeft size={17} />
                            Back to All Posts
                        </Link>

                        <h1 className="text-3xl font-bold tracking-tight text-[#17243b]">
                            Add New Post
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Upload photos or videos for the SKIK International homepage.
                        </p>
                    </div>

                    <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-[#e8eef8] text-[#243d67] sm:flex">
                        <ImagePlus size={24} />
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        {/* Left: Media upload */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                            <div className="mb-5">
                                <h2 className="text-lg font-semibold text-[#17243b]">
                                    Media
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Choose an image or video to upload.
                                </p>
                            </div>

                            {!file ? (
                                <label
                                    htmlFor="post-media"
                                    className="flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center transition hover:border-[#385784] hover:bg-[#f4f7fc]"
                                >
                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8eef8] text-[#243d67]">
                                        <Upload size={29} />
                                    </div>

                                    <p className="text-base font-semibold text-[#17243b]">
                                        Click to select media
                                    </p>

                                    <p className="mt-2 max-w-xs text-sm text-slate-500">
                                        Select an image or video from your computer.
                                    </p>

                                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                                        <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                                            <ImagePlus size={14} />
                                            Images
                                        </span>

                                        <span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                                            <Video size={14} />
                                            Videos
                                        </span>
                                    </div>

                                    <p className="mt-4 text-xs text-slate-400">
                                        Maximum file size: 100 MB
                                    </p>
                                </label>
                            ) : (
                                <div>
                                    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-black">
                                        {isVideo ? (
                                            <video
                                                key={previewUrl}
                                                src={previewUrl || undefined}
                                                controls
                                                playsInline
                                                preload="metadata"
                                                className="max-h-[420px] min-h-[260px] w-full object-contain"
                                            />
                                        ) : (
                                            <img
                                                src={previewUrl || undefined}
                                                alt="Selected post preview"
                                                className="max-h-[420px] min-h-[260px] w-full object-contain"
                                            />
                                        )}

                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            aria-label="Remove selected media"
                                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-600"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>

                                    <div className="mt-4 flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                                        {isVideo ? (
                                            <Video size={19} className="mt-0.5 shrink-0 text-[#385784]" />
                                        ) : (
                                            <ImagePlus size={19} className="mt-0.5 shrink-0 text-[#385784]" />
                                        )}

                                        <div className="min-w-0 flex-1">
                                            <p className="break-all text-sm font-medium text-[#17243b]">
                                                {file.name}
                                            </p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                                                {" · "}
                                                {isVideo ? "Video" : "Image"}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={removeFile}
                                            className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <label
                                        htmlFor="post-media"
                                        className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#385784] hover:text-[#17243b]"
                                    >
                                        <Upload size={16} />
                                        Choose a different file
                                    </label>
                                </div>
                            )}

                            <input
                                id="post-media"
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                className="sr-only"
                            />
                        </section>

                        {/* Right: Post details */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                            <h2 className="text-lg font-semibold text-[#17243b]">
                                Post Details
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Add a caption and select the publishing status.
                            </p>

                            <div className="mt-7">
                                <label
                                    htmlFor="caption"
                                    className="mb-2 block text-sm font-semibold text-[#17243b]"
                                >
                                    Caption
                                </label>

                                <textarea
                                    id="caption"
                                    value={caption}
                                    onChange={(event) => setCaption(event.target.value)}
                                    maxLength={2000}
                                    rows={6}
                                    placeholder="Write a caption for this post..."
                                    className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#385784] focus:ring-2 focus:ring-[#385784]/15"
                                />

                                <div className="mt-2 flex justify-between gap-3 text-xs text-slate-400">
                                    <span>Keep your caption clear and engaging.</span>
                                    <span>{caption.length}/2000</span>
                                </div>
                            </div>

                            <div className="mt-7 rounded-xl border border-slate-200 p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold text-[#17243b]">
                                            Publish post
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Published posts can appear in the homepage carousel.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={isPublished}
                                        aria-label="Publish post immediately"
                                        onClick={() => setIsPublished((value) => !value)}
                                        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition ${isPublished ? "bg-[#243d67]" : "bg-slate-300"
                                            }`}
                                    >
                                        <span
                                            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${isPublished ? "left-6" : "left-1"
                                                }`}
                                        />
                                    </button>
                                </div>

                                <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm">
                                    <span
                                        className={`h-2 w-2 rounded-full ${isPublished ? "bg-emerald-500" : "bg-amber-500"
                                            }`}
                                    />

                                    <span className="font-medium text-slate-700">
                                        {isPublished ? "Will be published" : "Will be saved as a draft"}
                                    </span>
                                </div>
                            </div>

                            {message && (
                                <div
                                    role="status"
                                    aria-live="polite"
                                    className={`mt-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${message.type === "success"
                                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                        : "border-red-200 bg-red-50 text-red-700"
                                        }`}
                                >
                                    {message.type === "success" ? (
                                        <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                                    ) : (
                                        <AlertCircle size={19} className="mt-0.5 shrink-0" />
                                    )}

                                    <p>{message.text}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isUploading}
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#243d67] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#172b4d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isUploading ? (
                                    <>
                                        <LoaderCircle size={18} className="animate-spin" />
                                        Uploading post...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={18} />
                                        {isPublished ? "Upload & Publish" : "Upload as Draft"}
                                    </>
                                )}
                            </button>

                            <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                                Your media will be uploaded to Cloudinary and post details
                                will be saved in Supabase.
                            </p>
                        </section>
                    </div>

                    {/* Preview link */}
                    <div className="mt-5 flex justify-center">
                        <Link
                            href="/admin/posts"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#243d67]"
                        >
                            <Eye size={16} />
                            View all posts
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}