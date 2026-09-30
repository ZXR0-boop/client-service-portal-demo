"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { FormCard, LoadingCard, SectionHeading } from "../components/portal-form-ui";

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [router, supabase]);

  if (loading) {
    return <main className="min-h-screen bg-slate-950 px-4 py-8 text-white"><section className="mx-auto max-w-md"><LoadingCard title="Loading account" message="Checking authentication status." /></section></main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-md">
        <Link href="/" className="text-sm text-slate-300">← Back to Home</Link>
        <FormCard className="mt-6">
          <SectionHeading eyebrow="Account" title="Authenticated account" description={`Signed in as ${user?.email}`} />
          <Link href="/inspection-reminders" className="mt-5 inline-flex rounded-2xl bg-red-600 px-4 py-3 font-semibold">
            Manage Inspection Reminders
          </Link>
        </FormCard>
      </section>
    </main>
  );
}
