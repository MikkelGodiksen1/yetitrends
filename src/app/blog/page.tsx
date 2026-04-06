import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Blog — Yetitrends | Afrikansk mode og inspiration",
  description:
    "Læs om afrikanske kjoler, ankara-stoffer, styling-tips og bæredygtig afrikansk mode. Inspiration til din garderobe fra Yetitrends.",
  keywords: [
    "afrikanske kjoler",
    "afrikansk mode",
    "ankara stof",
    "afrikansk print tøj",
    "bæredygtig mode",
  ],
};

export default async function BlogPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.publishedAt));

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold text-text mb-4">Blog</h1>
      <p className="text-muted mb-12 max-w-2xl">
        Inspiration, guides og historier om afrikansk mode, ankara-stoffer og
        bæredygtigt håndværk.
      </p>

      {posts.length === 0 ? (
        <p className="text-muted">Ingen blogindlæg endnu.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-xl border border-surface bg-card transition-shadow hover:shadow-md"
            >
              {post.imageUrl && (
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5">
                <time className="text-xs text-muted">
                  {new Date(post.publishedAt).toLocaleDateString("da-DK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 font-display text-lg font-bold text-text group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-primary">
                  Læs mere →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
