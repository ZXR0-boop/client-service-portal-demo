"use client";

export default function GlobalError({ reset }) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-md rounded-3xl border border-red-400/20 bg-red-500/10 p-6">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-sm text-red-100/90">The portal hit an unexpected error.</p>
        <button onClick={reset} className="mt-5 rounded-2xl bg-red-600 px-4 py-3 font-semibold">Try Again</button>
      </section>
    </main>
  );
}
