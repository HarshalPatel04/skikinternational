"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function PostsCarousel() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [visibleCount, setVisibleCount] = useState(4);
    const [playingVideo, setPlayingVideo] = useState(null);

    useEffect(() => {
        const updateVisibleCount = () => {
            if (window.innerWidth < 640) {
                setVisibleCount(1);
            } else if (window.innerWidth < 1024) {
                setVisibleCount(2);
            } else {
                setVisibleCount(4);
            }
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);

        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const loadPosts = useCallback(async () => {
        setLoading(true);

        try {
            const supabase = createClient();

            const { data, error } = await supabase
                .from("posts")
                .select("id, media_type, media_url, thumbnail_url, caption, created_at")
                .eq("is_published", true)
                .order("display_order", { ascending: true })
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Unable to load published posts:", error.message);
                setPosts([]);
            } else {
                setPosts(data || []);
            }
        } catch (error) {
            console.error("Unable to load posts:", error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPosts();
    }, [loadPosts]);

    const effectiveVisibleCount =
        posts.length < 3 ? 1 : visibleCount;

    const totalPages = Math.ceil(posts.length / effectiveVisibleCount);

    useEffect(() => {
        setCurrentPage((page) => Math.min(page, Math.max(0, totalPages - 1)));
    }, [totalPages]);

    useEffect(() => {
        if (totalPages <= 1) return;

        const timer = setInterval(() => {
            setCurrentPage((page) => (page + 1) % totalPages);
        }, 5000);

        return () => clearInterval(timer);
    }, [totalPages]);

    function playVideo(id, videoElement) {
        if (!videoElement) return;

        if (playingVideo === id) {
            videoElement.pause();
            videoElement.currentTime = 0;
            setPlayingVideo(null);
            return;
        }

        document.querySelectorAll(".skik-post-video").forEach((video) => {
            video.pause();
            video.currentTime = 0;
        });

        videoElement.muted = true;
        videoElement.play()
            .then(() => setPlayingVideo(id))
            .catch(() => setPlayingVideo(null));
    }

    function handleVideoHover(id, videoElement, entering) {
        if (!videoElement) return;

        if (entering) {
            videoElement.muted = true;
            videoElement.play()
                .then(() => setPlayingVideo(id))
                .catch(() => { });
        } else {
            videoElement.pause();
            videoElement.currentTime = 0;
            setPlayingVideo((current) => current === id ? null : current);
        }
    }

    if (loading || posts.length === 0) {
        return null;
    }

    const startIndex = currentPage * effectiveVisibleCount;

    const visiblePosts = posts.slice(
        startIndex,
        startIndex + effectiveVisibleCount
    );

    const useCarousel = posts.length < 3;

    return (
        <section className="mt-20 overflow-hidden bg-white">
            <div className="container-width">
                <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <span className="section-label">Life at SKIK</span>

                        <h2 className="mt-4 max-w-2xl font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl">
                            Moments, milestones
                            <br />
                            <span className="text-brand-blue">and new beginnings.</span>
                        </h2>

                        <p className="mt-4 max-w-xl leading-7 text-muted">
                            Explore our latest updates, student moments, and experiences
                            from the SKIK International community.
                        </p>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex shrink-0 items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setCurrentPage((page) =>
                                    page === 0 ? totalPages - 1 : page - 1
                                )}
                                aria-label="Previous posts"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-navy transition hover:border-navy hover:bg-navy hover:!text-white"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <button
                                type="button"
                                onClick={() => setCurrentPage((page) =>
                                    (page + 1) % totalPages
                                )}
                                aria-label="Next posts"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-navy transition hover:border-navy hover:bg-navy hover:!text-white"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>

                <div
                    key={currentPage}
                    className={
                        useCarousel
                            ? "skik-carousel-page mx-auto grid w-full max-w-md grid-cols-1 gap-9"
                            : "skik-carousel-page grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                    }
                >
                    {visiblePosts.map((post) => (
                        <article
                            key={post.id}
                            className="group min-w-0 overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div
                                className="relative aspect-[4/5] overflow-hidden bg-slate-100"
                                onMouseEnter={(event) => {
                                    if (post.media_type === "video") {
                                        handleVideoHover(
                                            post.id,
                                            event.currentTarget.querySelector("video"),
                                            true
                                        );
                                    }
                                }}
                                onMouseLeave={(event) => {
                                    if (post.media_type === "video") {
                                        handleVideoHover(
                                            post.id,
                                            event.currentTarget.querySelector("video"),
                                            false
                                        );
                                    }
                                }}
                            >
                                {post.media_type === "video" ? (
                                    <>
                                        <video
                                            className="skik-post-video h-full w-full object-cover"
                                            src={post.media_url}
                                            poster={post.thumbnail_url || undefined}
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                playVideo(post.id, event.currentTarget);
                                            }}
                                        />

                                        {playingVideo !== post.id && (
                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    playVideo(
                                                        post.id,
                                                        event.currentTarget.parentElement.querySelector("video")
                                                    );
                                                }}
                                                aria-label="Play video"
                                                className="absolute inset-0 flex items-center justify-center bg-navy/10 transition group-hover:bg-navy/20"
                                            >
                                                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-navy/70 text-white shadow-lg backdrop-blur-sm transition group-hover:scale-110">
                                                    <Play size={23} fill="currentColor" />
                                                </span>
                                            </button>
                                        )}

                                        <span className="absolute right-3 top-3 rounded-full bg-navy/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                            Video
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={post.media_url}
                                            alt={post.caption || "SKIK International update"}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy/75 text-white backdrop-blur-sm">
                                            <ImageIcon size={17} />
                                        </span>
                                    </>
                                )}
                            </div>

                            {post.caption?.trim() && (
                                <div className="p-4">
                                    <p className="whitespace-pre-line break-words text-sm leading-6 text-slate-700">
                                        {post.caption}
                                    </p>
                                </div>
                            )}
                        </article>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="mt-7 flex justify-center gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setCurrentPage(index)}
                                aria-label={`Show post group ${index + 1}`}
                                className={`h-2 rounded-full transition-all ${currentPage === index
                                    ? "w-7 bg-navy"
                                    : "w-2 bg-slate-300 hover:bg-slate-500"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}