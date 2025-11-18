"use client";
import React from "react";
import { notFound, useRouter } from "next/navigation";
import { newsletterposts } from "@/data/newsletter";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useSubscription } from "@/hooks/useSubscription";

export default function NewsletterPage({ params }: { params: { id: string } }) {
    const postid = Number(params.id);
    const post = newsletterposts.find((p) => p.id === postid);
    const { isPaidUser } = useSubscription();
      const router = useRouter();

    if (!post) return notFound();
    if(!isPaidUser) {
        router.push('/pricing');
        return null;
    }

    function addLazyLoading(content: string) {
        return content.replace(/<img/g, '<img loading="lazy" ')
    }

    return (
        <main className="min-h-screen bg-background text-foreground px-6 py-12 flex justify-center">
            <div className="w-full max-w-3xl">
                <div className="flex items-center gap-2 mb-4">
                    <Link href="/dashboard/newsletter" className="text-white">
                        <ArrowLeftIcon className="size-6" />
                    </Link>
                    <h1 className="text-xl md:text-3xl font-bold text-foreground">
                        {post.title}
                    </h1>
                </div>
                <p className="text-muted-foreground mb-6">
                    {new Date(post.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-muted text-muted-foreground border border-border-primary px-3 py-1 text-sm rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <article
                    className="rich-text"
                    dangerouslySetInnerHTML={{ __html: addLazyLoading(post.content) }}
                />
            </div>
        </main>
    );
}
