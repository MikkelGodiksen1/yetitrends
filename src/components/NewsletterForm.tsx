"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "Tak! Du er nu tilmeldt.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Noget gik galt. Prøv igen.");
      }
    } catch {
      setStatus("error");
      setMessage("Netværksfejl. Prøv igen senere.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="Din e-mailadresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-md bg-white text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 rounded-md bg-primary text-white font-medium hover:bg-primary-light transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Tilmelder..." : "Tilmeld"}
        </button>
      </div>

      {status === "success" && (
        <p className="text-white font-medium text-sm mt-3">{message}</p>
      )}
      {status === "error" && (
        <p className="text-primary-light font-medium text-sm mt-3">{message}</p>
      )}
    </form>
  );
}
