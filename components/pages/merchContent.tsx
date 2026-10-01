"use client";

import { useState } from "react";

export function MerchNotify() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      // Reuses the existing contact endpoint so the signup lands in your inbox.
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Merch waitlist",
          email,
          subject: "Merch waitlist",
          message: "Please notify me when the merch drop goes live.",
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Something went wrong.");
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="text-[15px] text-black">
        You're on the list. I'll email you when it drops.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <label htmlFor="notify-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="notify-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 min-w-0 flex-1 rounded-full border border-black/15 bg-white px-4 text-[16px] text-black placeholder:text-black/35 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-11 shrink-0 rounded-full bg-black px-5 text-[15px] font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Notify me"}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}