"use client";

import Link from "next/link";

export function FormPageShell({
  backHref = "/",
  backLabel = "Back to Home",
  badge,
  title,
  description,
  children,
  activeNav,
}) {
  return (
    <main className="min-h-screen bg-slate-950 pb-28 text-white">
      <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pb-8 pt-8 sm:px-6">
        <Link href={backHref} className="w-fit text-sm text-slate-300 hover:text-white">
          ← {backLabel}
        </Link>
        <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950 p-5 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">{badge}</p>
          <h1 className="mt-3 text-3xl font-bold">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
        </div>
        {children}
      </section>
      <BottomNav active={activeNav} />
    </main>
  );
}

export function FormCard({ children, className = "" }) {
  return (
    <div className={`rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-5 shadow-xl ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{eyebrow}</p> : null}
      <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
      {description ? <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p> : null}
    </div>
  );
}

export function TextField({ label, value, onChange, placeholder, type = "text", required = true, disabled = false }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-slate-200">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="min-h-[3.35rem] rounded-2xl border border-white/10 bg-slate-950 px-4 py-3.5 text-white outline-none focus:border-red-500 disabled:opacity-60"
      />
    </label>
  );
}

export function SelectField({ label, value, onChange, options, disabled = false }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-slate-200">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="min-h-[3.35rem] rounded-2xl border border-white/10 bg-slate-950 px-4 py-3.5 text-white outline-none focus:border-red-500 disabled:opacity-60"
      >
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function TextAreaField({ label, value, onChange, placeholder, disabled = false }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium text-slate-200">{label}</span>
      <textarea
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        disabled={disabled}
        className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none focus:border-red-500 disabled:opacity-60"
      />
    </label>
  );
}

export function StatusMessage({ kind = "success", title, children }) {
  const cls = kind === "error"
    ? "border-red-400/20 bg-red-500/10 text-red-100"
    : "border-emerald-400/20 bg-emerald-500/10 text-emerald-100";
  return (
    <div className={`rounded-2xl border p-4 text-sm leading-6 ${cls}`} role="status">
      {title ? <p className="font-semibold">{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}

export function SubmitButton({ children, loading = false, loadingText = "Sending..." }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="min-h-[3.35rem] w-full rounded-2xl bg-red-600 px-5 py-3.5 font-semibold text-white hover:bg-red-500 disabled:opacity-60"
    >
      {loading ? loadingText : children}
    </button>
  );
}

export function LoadingCard({ title = "Loading", message = "Please wait." }) {
  return (
    <FormCard>
      <h2 className="font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">{message}</p>
    </FormCard>
  );
}

export function EmptyStateCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
    </div>
  );
}

function BottomNav({ active }) {
  const items = [
    ["/", "Home", "home"],
    ["/service-request", "Service", "service"],
    ["/general-inquiry", "Inquiry", "inquiry"],
    ["/feedback", "Feedback", "feedback"],
    ["/account", "Account", "account"],
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/95">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-2 px-4 py-3">
        {items.map(([href, label, key]) => (
          <Link
            key={key}
            href={href}
            className={`rounded-2xl px-2 py-3 text-center text-xs ${active === key ? "bg-white/10 text-white" : "text-slate-400"}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
