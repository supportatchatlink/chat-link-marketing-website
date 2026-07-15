import type { Metadata } from "next";
import Link from "next/link";
import { PenLine } from "lucide-react";
import { blogPosts } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News and insight from Chat-Link Communication Limited on wholesale voice, A2P messaging, and connectivity in emerging markets.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Section containerSize="wide">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <Badge>Blog</Badge>
          <h1 className="text-fg text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            News and insight
          </h1>
          <p className="text-fg-muted text-lg leading-relaxed text-pretty">
            Notes on wholesale voice, A2P messaging, and what it actually takes to deliver traffic
            in emerging markets.
          </p>
        </div>

        {/*
          TODO: no blog posts were supplied, so this renders an empty state.
          Wire `blogPosts` in src/lib/content.ts to a CMS or MDX files, or
          remove the Blog entry from `mainNav` in src/lib/site.ts until there
          is something to publish. Shipping an empty blog looks worse than
          having no blog.
        */}
        {blogPosts.length === 0 ? (
          <Reveal className="mt-14 w-full">
            <Card className="flex flex-col items-center gap-4 py-16 text-center">
              <div className="bg-accent/10 text-accent ring-accent/20 flex size-12 items-center justify-center rounded-xl ring-1 ring-inset">
                <PenLine className="size-6" aria-hidden="true" />
              </div>
              <h2 className="text-fg text-xl font-semibold tracking-tight">
                No posts published yet
              </h2>
              <p className="text-fg-muted max-w-md leading-relaxed text-pretty">
                We&apos;re working on the first articles. In the meantime, if you have a question
                about routes or coverage, the fastest answer comes from asking us directly.
              </p>
              <Link
                href="/contact"
                className="text-accent mt-2 text-sm font-medium hover:underline"
              >
                Get in touch
              </Link>
            </Card>
          </Reveal>
        ) : (
          <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 0.06}>
                <Card as="li" interactive className="flex h-full flex-col gap-3">
                  <time className="text-fg-subtle text-xs font-medium" dateTime={post.date}>
                    {post.date}
                  </time>
                  <h2 className="text-fg text-lg font-semibold tracking-tight">{post.title}</h2>
                  <p className="text-fg-muted flex-1 text-sm leading-relaxed text-pretty">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-accent mt-2 text-sm font-medium hover:underline"
                  >
                    Read more
                  </Link>
                </Card>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      <Cta />
    </>
  );
}
