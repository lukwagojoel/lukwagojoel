"use client";

import { useState } from "react";

const fieldClass =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[16px] text-black placeholder:text-black/35 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Project inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Unable to send your message right now.");
      }
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to send your message right now."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-black/10 p-8 text-center"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-black">
          Message sent
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-black/60">
          Thanks, {form.name}. I'll reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", subject: "Project inquiry", message: "" });
          }}
          className="mt-6 text-sm text-black underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-black">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-black">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-black">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Goals, timeline and scope"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="flex h-12 w-full items-center justify-center rounded-full bg-black text-[15px] font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}