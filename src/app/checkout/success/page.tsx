import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ordre bekræftet — Yetitrends",
  robots: { index: false, follow: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { session_id } = await searchParams;

  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-8 w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>

      <h1 className="mb-4 font-display text-3xl font-bold">
        Tak for din ordre!
      </h1>

      <p className="mb-2 text-muted">
        Din betaling er gennemf&oslash;rt, og vi g&aring;r i gang med at pakke din ordre.
      </p>
      <p className="mb-8 text-muted">
        Du modtager en bekr&aelig;ftelse p&aring; e-mail inden for kort tid.
      </p>

      {session_id && (
        <p className="mb-8 text-xs text-muted/60">
          Reference: {typeof session_id === "string" ? session_id : session_id[0]}
        </p>
      )}

      <Link
        href="/"
        className="inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
      >
        Tilbage til forsiden
      </Link>
    </section>
  );
}
