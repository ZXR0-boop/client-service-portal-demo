"use client";

import { useState } from "react";
import { FormCard, FormPageShell, SelectField, StatusMessage, SubmitButton, TextAreaField, TextField } from "../components/portal-form-ui";

const types = ["Fire Alarm", "Access Control", "CCTV"];

export default function ServiceRequestPage() {
  const [form, setForm] = useState({ company: "", contact: "", email: "", subject: "", requestType: types[0], details: "" });
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function set(key, value) { setForm((p) => ({ ...p, [key]: value })); }

  async function submit(e) {
    e.preventDefault(); setLoading(true); setStatus(""); setErrorMsg("");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formType: "service", ...form }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setStatus("Service request submitted.");
    } catch {
      setErrorMsg("Unable to send the request.");
    } finally { setLoading(false); }
  }

  return (
    <FormPageShell badge="Service" title="Submit a service request" description="Demonstrates a categorized support request workflow." activeNav="service">
      <FormCard><form onSubmit={submit} className="grid gap-4">
        <TextField label="Company" value={form.company} onChange={(v) => set("company", v)} placeholder="Example Company" disabled={loading} />
        <TextField label="Contact" value={form.contact} onChange={(v) => set("contact", v)} placeholder="Jane Smith" disabled={loading} />
        <TextField label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="jane@example.com" disabled={loading} />
        <TextField label="Subject" value={form.subject} onChange={(v) => set("subject", v)} placeholder="System trouble" disabled={loading} />
        <SelectField label="Type" value={form.requestType} onChange={(v) => set("requestType", v)} options={types} disabled={loading} />
        <TextAreaField label="Details" value={form.details} onChange={(v) => set("details", v)} placeholder="Describe the issue..." disabled={loading} />
        {status ? <StatusMessage title="Sent">{status}</StatusMessage> : null}
        {errorMsg ? <StatusMessage kind="error" title="Error">{errorMsg}</StatusMessage> : null}
        <SubmitButton loading={loading}>Submit Service Request</SubmitButton>
      </form></FormCard>
    </FormPageShell>
  );
}
