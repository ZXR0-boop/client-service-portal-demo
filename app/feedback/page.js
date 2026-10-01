"use client";

import { useState } from "react";
import { FormCard, FormPageShell, SelectField, StatusMessage, SubmitButton, TextAreaField, TextField } from "../components/portal-form-ui";

const ratings = ["5 - Excellent", "4 - Good", "3 - Fair", "2 - Poor", "1 - Very Poor"];

export default function FeedbackPage() {
  const [form, setForm] = useState({ name: "", company: "", subject: "", rating: ratings[0], feedback: "" });
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function set(key, value) { setForm((p) => ({ ...p, [key]: value })); }

  async function submit(e) {
    e.preventDefault(); setLoading(true); setStatus(""); setErrorMsg("");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formType: "feedback", ...form }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setStatus("Feedback submitted.");
    } catch {
      setErrorMsg("Unable to send feedback.");
    } finally { setLoading(false); }
  }

  return (
    <FormPageShell badge="Feedback" title="Share your experience" description="Send a rating and comments about your service experience." activeNav="feedback">
      <FormCard><form onSubmit={submit} className="grid gap-4">
        <TextField label="Name" value={form.name} onChange={(v) => set("name", v)} placeholder="Jane Smith" disabled={loading} />
        <TextField label="Company (Optional)" value={form.company} onChange={(v) => set("company", v)} placeholder="Example Company" required={false} disabled={loading} />
        <TextField label="Subject" value={form.subject} onChange={(v) => set("subject", v)} placeholder="Service feedback" disabled={loading} />
        <SelectField label="Rating" value={form.rating} onChange={(v) => set("rating", v)} options={ratings} disabled={loading} />
        <TextAreaField label="Feedback" value={form.feedback} onChange={(v) => set("feedback", v)} placeholder="Tell us about your experience..." disabled={loading} />
        {status ? <StatusMessage title="Sent">{status}</StatusMessage> : null}
        {errorMsg ? <StatusMessage kind="error" title="Error">{errorMsg}</StatusMessage> : null}
        <SubmitButton loading={loading}>Submit Feedback</SubmitButton>
      </form></FormCard>
    </FormPageShell>
  );
}
