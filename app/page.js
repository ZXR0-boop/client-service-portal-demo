"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "./lib/supabase/client";
import { FormCard, LoadingCard, SectionHeading } from "./components/portal-form-ui";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user ?? null);
        setAuthLoading(false);
      }
    });
    return () => { mounted = false; };
  }, [supabase]);

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <main className="min-h-screen bg-slate-950 pb-16 text-white">
      <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-8 sm:px-6">
        <header className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-red-950 p-6 shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-bold text-red-200">
            CP
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-red-200">Portfolio Demo</p>
          <h1 className="mt-3 text-4xl font-bold">Client Service Portal</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Sanitized demonstration of authentication, service forms, reminder data, and calendar export.
          </p>
        </header>

        {authLoading ? (
          <LoadingCard title="Checking account" message="Loading authentication status." />
        ) : (
          <FormCard>
            <SectionHeading
              eyebrow="Account"
              title={user ? "Signed in" : "Authentication"}
              description={user ? `Authenticated as ${user.email}` : "Register or sign in using the configured Supabase project."}
            />
            <div className="mt-5 grid gap-3">
              {user ? (
                <>
                  <Link className="rounded-2xl bg-red-600 px-4 py-3 text-center font-semibold" href="/account">Open Account</Link>
                  <button onClick={logout} className="rounded-2xl border border-white/10 px-4 py-3 font-semibold">Log Out</button>
                </>
              ) : (
                <>
                  <Link className="rounded-2xl bg-red-600 px-4 py-3 text-center font-semibold" href="/register">Register</Link>
                  <Link className="rounded-2xl border border-white/10 px-4 py-3 text-center font-semibold" href="/login">Log In</Link>
                </>
              )}
            </div>
          </FormCard>
        )}

        <div className="grid gap-4">
          <Feature title="Service Request" body="Submit a categorized support request through a server-side mail route." href="/service-request" />
          <Feature title="General Inquiry" body="Submit a billing or sales-contact inquiry." href="/general-inquiry" />
          <Feature title="Feedback" body="Send a rating and written feedback." href="/feedback" />
          <Feature title="Inspection Reminders" body="Create authenticated reminder records and export calendar files." href="/inspection-reminders" />
        </div>
      </section>
    </main>
  );
}

function Feature({ title, body, href }) {
  return (
    <FormCard>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
      <Link href={href} className="mt-4 inline-flex rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold">
        Open
      </Link>
    </FormCard>
  );
}
