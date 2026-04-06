import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import JsonLd from "@/components/JsonLd";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);
  return post ?? null;
}

export async function generateStaticParams() {
  const posts = await db.select({ slug: blogPosts.slug }).from(blogPosts);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Indlæg ikke fundet — Yetitrends" };
  }

  return {
    title: `${post.title} — Yetitrends Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      ...(post.imageUrl ? { images: [post.imageUrl] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt.toISOString(),
    ...(post.imageUrl ? { image: post.imageUrl } : {}),
    author: {
      "@type": "Organization",
      name: "Yetitrends",
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <JsonLd data={jsonLd} />

      <Link
        href="/blog"
        className="text-sm text-muted hover:text-primary transition-colors"
      >
        ← Tilbage til blog
      </Link>

      <article className="mt-8">
        <time className="text-sm text-muted">
          {new Date(post.publishedAt).toLocaleDateString("da-DK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>

        <h1 className="mt-3 font-display text-3xl font-bold text-text sm:text-4xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-lg text-muted leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {post.imageUrl && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="mt-10 prose prose-lg max-w-none text-text [&_p]:text-muted [&_p]:leading-relaxed [&_h2]:font-display [&_h2]:text-text [&_h2]:mt-10 [&_h2]:mb-4 [&_a]:text-primary [&_a]:underline [&_ul]:text-muted [&_li]:text-muted"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </article>

      {/* CTA */}
      <section className="mt-16 rounded-xl bg-accent p-8 text-center text-white">
        <h2 className="font-display text-2xl font-bold">
          Udforsk vores kollektion
        </h2>
        <p className="mt-2 text-white/80">
          Se vores håndlavede afrikanske kjoler, kimono-jakker og two-piece sæt.
        </p>
        <Link
          href="/katalog"
          className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary-light"
        >
          Se katalog
        </Link>
      </section>
    </main>
  );
}
