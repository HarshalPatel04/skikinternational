"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
    Plus,
    Search,
    Image as ImageIcon,
    Video,
    Pencil,
    Trash2,
    Eye,
    EyeOff,
    LoaderCircle,
    RefreshCw,
    AlertCircle,
    X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [processingId, setProcessingId] = useState(null);
    const [editingPost, setEditingPost] = useState(null);
    const [editCaption, setEditCaption] = useState("");
    const [actionMessage, setActionMessage] = useState("");

    const supabase = createClient();

    const loadPosts = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                setError("Your session has expired. Please sign in again.");
                setPosts([]);
                return;
            }

            const { data: admin, error: adminError } = await supabase
                .from("admin_users")
                .select("user_id")
                .eq("user_id", user.id)
                .maybeSingle();

            if (adminError || !admin) {
                setError("You do not have permission to manage posts.");
                setPosts([]);
                return;
            }

            // RLS currently allows ordinary users to read published posts.
            // Load published posts first; drafts need an authenticated admin
            // read policy, which is added in the next setup step if required.
            const { data, error: postsError } = await supabase
                .from("posts")
                .select("*")
                .order("display_order", { ascending: true })
                .order("created_at", { ascending: false });

            if (postsError) throw postsError;

            setPosts(data || []);
        } catch (err) {
            console.error("Unable to load posts:", err.message);
            setError("Unable to load posts. Please refresh and try again.");
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const filteredPosts = posts.filter((post) => {
        const matchesSearch = (post.caption || "")
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "published" && post.is_published) ||
            (statusFilter === "draft" && !post.is_published);

        return matchesSearch && matchesStatus;
    });

    async function togglePublished(post) {
        const nextPublished = !post.is_published;

        setProcessingId(post.id);
        setActionMessage("");
        setError("");

        try {
            const { error: updateError } = await supabase
                .from("posts")
                .update({
                    is_published: nextPublished,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", post.id);

            if (updateError) throw updateError;

            setPosts((current) =>
                current.map((item) =>
                    item.id === post.id
                        ? { ...item, is_published: nextPublished }
                        : item
                )
            );

            setActionMessage(
                nextPublished
                    ? "Post published successfully."
                    : "Post unpublished successfully."
            );
        } catch (err) {
            console.error("Publish status update failed:", err.message);
            setError(
                "Unable to change publishing status. Check your Supabase permissions."
            );
        } finally {
            setProcessingId(null);
        }
    }

    function openEdit(post) {
        setEditingPost(post);
        setEditCaption(post.caption || "");
        setActionMessage("");
        setError("");
    }

    async function saveCaption(event) {
        event.preventDefault();

        if (!editingPost) return;

        setProcessingId(editingPost.id);
        setError("");
        setActionMessage("");

        try {
            const { error: updateError } = await supabase
                .from("posts")
                .update({
                    caption: editCaption.trim(),
                    updated_at: new Date().toISOString(),
                })
                .eq("id", editingPost.id);

            if (updateError) throw updateError;

            setPosts((current) =>
                current.map((post) =>
                    post.id === editingPost.id
                        ? { ...post, caption: editCaption.trim() }
                        : post
                )
            );

            setEditingPost(null);
            setActionMessage("Caption updated successfully.");
        } catch (err) {
            console.error("Caption update failed:", err.message);
            setError("Unable to update caption. Please try again.");
        } finally {
            setProcessingId(null);
        }
    }

    async function deletePost(post) {
        const confirmed = window.confirm(
            "Delete this post? This action cannot be undone."
        );

        if (!confirmed) return;

        setProcessingId(post.id);
        setError("");
        setActionMessage("");

        try {
            // The secure server endpoint will delete the database record
            // and the associated Cloudinary media.
            const response = await fetch(`/api/admin/posts/${post.id}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Unable to delete post.");
            }

            setPosts((current) =>
                current.filter((item) => item.id !== post.id)
            );

            setActionMessage("Post deleted successfully.");
        } catch (err) {
            console.error("Post deletion failed:", err.message);
            setError(err.message || "Unable to delete post.");
        } finally {
            setProcessingId(null);
        }
    }

    return (
        <div className="min-h-screen bg-[#f5f7fb] px-4 py-6 text-[#17243b] sm:px-6 lg:px-10 lg:py-9">
            <div className="mx-auto max-w-7xl">
                {/* Page heading */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-[#17243b]">
                            All Posts
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Manage your homepage images, videos, and captions.
                        </p>
                    </div>

                    <Link
                        href="/admin/posts/new"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#243d67] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#172b4d]"
                    >
                        <Plus size={18} />
                        Add New Post
                    </Link>
                </div>

                {/* Notifications */}
                {error && (
                    <div
                        role="alert"
                        className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        <AlertCircle size={19} className="mt-0.5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {actionMessage && (
                    <div
                        role="status"
                        className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                    >
                        {actionMessage}
                    </div>
                )}

                {/* Search and filters */}
                <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-md">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search captions..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#385784] focus:bg-white"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#385784]"
                        >
                            <option value="all">All statuses</option>
                            <option value="published">Published</option>
                            <option value="draft">Drafts</option>
                        </select>

                        <button
                            type="button"
                            onClick={loadPosts}
                            disabled={loading}
                            aria-label="Refresh posts"
                            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                            <RefreshCw
                                size={17}
                                className={loading ? "animate-spin" : ""}
                            />
                        </button>
                    </div>
                </div>

                {/* Post count */}
                <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                    <p>
                        {loading
                            ? "Loading posts..."
                            : `${filteredPosts.length} ${filteredPosts.length === 1 ? "post" : "posts"
                            } found`}
                    </p>
                </div>

                {/* Posts grid */}
                {loading ? (
                    <div className="flex min-h-64 items-center justify-center">
                        <LoaderCircle
                            size={30}
                            className="animate-spin text-[#385784]"
                        />
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="mt-5 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8eef8] text-[#243d67]">
                            <ImageIcon size={28} />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-[#17243b]">
                            {search || statusFilter !== "all"
                                ? "No matching posts"
                                : "No posts yet"}
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                            {search || statusFilter !== "all"
                                ? "Try another search or change the status filter."
                                : "Upload your first image or video to start building your homepage carousel."}
                        </p>

                        {!search && statusFilter === "all" && (
                            <Link
                                href="/admin/posts/new"
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#243d67] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#172b4d]"
                            >
                                <Plus size={17} />
                                Add Your First Post
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                            >
                                {/* Media */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                                    {post.media_type === "video" ? (
                                        <video
                                            src={post.media_url}
                                            controls
                                            preload="metadata"
                                            playsInline
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={post.media_url || undefined}
                                            alt={post.caption || "Post image"}
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                        />
                                    )}

                                    <span
                                        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${post.is_published
                                                ? "bg-emerald-100 text-emerald-800"
                                                : "bg-amber-100 text-amber-800"
                                            }`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${post.is_published
                                                    ? "bg-emerald-500"
                                                    : "bg-amber-500"
                                                }`}
                                        />
                                        {post.is_published ? "Published" : "Draft"}
                                    </span>

                                    <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#243d67] shadow-sm">
                                        {post.media_type === "video" ? (
                                            <Video size={17} />
                                        ) : (
                                            <ImageIcon size={17} />
                                        )}
                                    </span>
                                </div>

                                {/* Post details */}
                                <div className="p-5">
                                    <p className="min-h-12 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                                        {post.caption || "No caption"}
                                    </p>

                                    <div className="mt-4 border-t border-slate-100 pt-4">
                                        <p className="text-xs text-slate-400">
                                            Created{" "}
                                            {new Date(post.created_at).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </p>

                                        <div className="mt-4 grid grid-cols-3 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openEdit(post)}
                                                disabled={processingId === post.id}
                                                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                                            >
                                                <Pencil size={14} />
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => togglePublished(post)}
                                                disabled={processingId === post.id}
                                                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-2 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                                            >
                                                {processingId === post.id ? (
                                                    <LoaderCircle size={14} className="animate-spin" />
                                                ) : post.is_published ? (
                                                    <EyeOff size={14} />
                                                ) : (
                                                    <Eye size={14} />
                                                )}
                                                {post.is_published ? "Unpublish" : "Publish"}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => deletePost(post)}
                                                disabled={processingId === post.id}
                                                className="flex items-center justify-center gap-1.5 rounded-lg border border-red-100 px-2 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                            >
                                                <Trash2 size={14} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit caption modal */}
            {editingPost && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget && !processingId) {
                            setEditingPost(null);
                        }
                    }}
                >
                    <form
                        onSubmit={saveCaption}
                        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-[#17243b]">
                                    Edit Caption
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Update the text shown with this post.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setEditingPost(null)}
                                disabled={Boolean(processingId)}
                                aria-label="Close edit dialog"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-50"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <label
                            htmlFor="edit-caption"
                            className="mb-2 mt-6 block text-sm font-semibold text-[#17243b]"
                        >
                            Caption
                        </label>

                        <textarea
                            id="edit-caption"
                            value={editCaption}
                            onChange={(event) => setEditCaption(event.target.value)}
                            maxLength={2000}
                            rows={5}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#385784] focus:ring-2 focus:ring-[#385784]/15"
                        />

                        <div className="mt-2 text-right text-xs text-slate-400">
                            {editCaption.length}/2000
                        </div>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setEditingPost(null)}
                                disabled={Boolean(processingId)}
                                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={Boolean(processingId)}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#243d67] px-5 py-3 text-sm font-semibold text-white hover:bg-[#172b4d] disabled:opacity-60"
                            >
                                {processingId === editingPost.id && (
                                    <LoaderCircle size={17} className="animate-spin" />
                                )}
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}