"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function validate(v: { name: string; email: string; message: string }): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  if (v.message.length > 2000) e.message = "Message should be under 2000 characters.";
  return e;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const v = { name: String(f.get("name") ?? ""), email: String(f.get("email") ?? ""), message: String(f.get("message") ?? "") };
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) return setStatus(null);
    // No backend: hand the message to the visitor's own mail app, pre-filled.
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Hello from ${v.name}`)}&body=${encodeURIComponent(`${v.message}\n\n— ${v.name} (${v.email})`)}`;
    setStatus(`Opening your email app… If nothing happens, write to ${site.email}.`);
  };

  const field = "mt-2 w-full rounded-md border border-border bg-bg px-4 py-3 outline-none transition focus:border-accent aria-[invalid=true]:border-red-500";
  const err = (k: keyof Errors) =>
    errors[k] && (
      <p id={`${k}-err`} className="mt-1.5 text-sm text-red-500">
        {errors[k]}
      </p>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          className={field}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-err" : undefined}
        />
        {err("name")}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={field}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
        />
        {err("email")}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={field}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {err("message")}
      </div>
      <button type="submit" className="bg-accent text-accent-fg rounded-md px-5 py-2.5 font-medium transition hover:opacity-90">
        Send message
      </button>
      <p role="status" className="text-muted text-sm">
        {status}
      </p>
    </form>
  );
}
