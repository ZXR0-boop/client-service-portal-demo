"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { createCalendarLink } from "../lib/calendar";
import { EmptyStateCard, FormCard, LoadingCard, SectionHeading, StatusMessage, SubmitButton, TextField } from "../components/portal-form-ui";

const inspectionTypes = ["Fire Alarm", "Sprinkler", "Backflow", "Access Control", "CCTV", "Other"];

export default function InspectionRemindersPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState([]);
  const [form, setForm] = useState({ siteName: "", inspectionType: inspectionTypes[0], inspectionDate: "", notes: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!authData.user) {
        router.push("/login");
        return;
      }
      setUser(authData.user);

      const { data, error } = await supabase
        .from("inspection_reminders")
        .select("*")
        .eq("user_id", authData.user.id)
        .order("inspection_date", { ascending: true });

      if (!mounted) return;
      if (error) setErrorMsg("Unable to load saved reminders.");
      else setSaved(data || []);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [router, supabase]);

  const groups = useMemo(() => {
    const today = new Date(); today.setHours(0,0,0,0);
    return saved.reduce((acc, item) => {
      const date = new Date(`${item.inspection_date}T00:00:00`);
      acc[date >= today ? "upcoming" : "past"].push(item);
      return acc;
    }, { upcoming: [], past: [] });
  }, [saved]);

  async function submit(e) {
    e.preventDefault();
    if (!user) return;
    setSaving(true); setStatus(""); setErrorMsg("");

    const { data, error } = await supabase
      .from("inspection_reminders")
      .insert({
        user_id: user.id,
        site_name: form.siteName.trim(),
        inspection_type: form.inspectionType,
        inspection_date: form.inspectionDate,
        notes: form.notes.trim(),
      })
      .select();

    if (error) setErrorMsg("Unable to save reminder.");
    else {
      setSaved((p) => [...(data || []), ...p].sort((a,b) => a.inspection_date.localeCompare(b.inspection_date)));
      setForm({ siteName: "", inspectionType: inspectionTypes[0], inspectionDate: "", notes: "" });
      setStatus("Reminder saved.");
    }
    setSaving(false);
  }

  async function remove(id) {
    const { error } = await supabase.from("inspection_reminders").delete().eq("id", id);
    if (error) setErrorMsg("Unable to delete reminder.");
    else setSaved((p) => p.filter((item) => item.id !== id));
  }

  if (loading) return <main className="min-h-screen bg-slate-950 px-4 py-8 text-white"><section className="mx-auto max-w-md"><LoadingCard title="Loading reminders" message="Checking account and saved reminder data." /></section></main>;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto flex max-w-md flex-col gap-6">
        <Link href="/" className="text-sm text-slate-300">← Back to Home</Link>

        <FormCard>
          <SectionHeading eyebrow="Create" title="Inspection reminder" description="Save a date and optional notes to the authenticated user's reminder list." />
          <form onSubmit={submit} className="mt-5 grid gap-4">
            <TextField label="Site Name" value={form.siteName} onChange={(v) => setForm((p) => ({...p, siteName:v}))} placeholder="Example Site" disabled={saving} />
            <label className="grid gap-2 text-sm">
              <span className="font-medium text-slate-200">Inspection Type</span>
              <select value={form.inspectionType} onChange={(e) => setForm((p) => ({...p, inspectionType:e.target.value}))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3.5">
                {inspectionTypes.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
            <TextField label="Inspection Date" type="date" value={form.inspectionDate} onChange={(v) => setForm((p) => ({...p, inspectionDate:v}))} disabled={saving} />
            <label className="grid gap-2 text-sm">
              <span className="font-medium text-slate-200">Notes</span>
              <textarea rows={4} value={form.notes} onChange={(e) => setForm((p) => ({...p, notes:e.target.value}))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3.5" />
            </label>
            {status ? <StatusMessage title="Success">{status}</StatusMessage> : null}
            {errorMsg ? <StatusMessage kind="error" title="Error">{errorMsg}</StatusMessage> : null}
            <SubmitButton loading={saving} loadingText="Saving...">Save Reminder</SubmitButton>
          </form>
        </FormCard>

        <FormCard>
          <SectionHeading eyebrow="Saved" title="Reminder list" description="Upcoming and past records returned from Supabase." />
          {saved.length === 0 ? <div className="mt-5"><EmptyStateCard title="No reminders" description="Create a reminder above." /></div> : (
            <div className="mt-5 grid gap-5">
              <ReminderGroup title="Upcoming" items={groups.upcoming} onRemove={remove} />
              <ReminderGroup title="Past" items={groups.past} onRemove={remove} />
            </div>
          )}
        </FormCard>
      </section>
    </main>
  );
}

function ReminderGroup({ title, items, onRemove }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{title}</h3>
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <h4 className="font-semibold">{item.site_name}</h4>
            <p className="mt-1 text-sm text-slate-300">{item.inspection_type} · {item.inspection_date}</p>
            {item.notes ? <p className="mt-2 text-sm text-slate-400">{item.notes}</p> : null}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a className="rounded-xl bg-red-600 px-3 py-2 text-center text-sm font-semibold" href={createCalendarLink({
                siteName: item.site_name,
                inspectionType: item.inspection_type,
                inspectionDate: item.inspection_date,
                notes: item.notes,
              })}>Add to Calendar</a>
              <button onClick={() => onRemove(item.id)} className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
