"use client";

import { useState } from "react";
import { FormCard, FormPageShell, SelectField, StatusMessage, SubmitButton, TextAreaField, TextField } from "../components/portal-form-ui";

const types = ["Billing", "Sales Contact", "Other"];

export default function GeneralInquiryPage() {
  const [form, setForm] = useState({ company: "", contact: "", email: "", subject: "", inquiryType: types[0], message: "" });
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function set(key, value) { setForm((p) => ({ ...p, [key]: value })); }

  async function submit(e) {
    e.preventDefault(); setLoading(true); setStatus(""); setErrorMsg("");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ formType: "general", ...form }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setStatus("Inquiry submitted.");
    } catch {
      setErrorMsg("Unable to send the inquiry.");
    } finally { setLoading(false); }
  }

  return (
    <FormPageShell badge="Inquiry" title="Submit a general inquiry" description="Send a billing, sales, or general customer question." activeNav="inquiry">
      <FormCard><form onSubmit={submit} className="grid gap-4">
        <TextField label="Company" value={form.company} onChange={(v) => set("company", v)} placeholder="Example Company" disabled={loading} />
        <TextField label="Contact" value={form.contact} onChange={(v) => set("contact", v)} placeholder="Jane Smith" disabled={loading} />
        <TextField label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="jane@example.com" disabled={loading} />
        <TextField label="Subject" value={form.subject} onChange={(v) => set("subject", v)} placeholder="Question" disabled={loading} />
        <SelectField label="Type" value={form.inquiryType} onChange={(v) => set("inquiryType", v)} options={types} disabled={loading} />
        <TextAreaField label="Message" value={form.message} onChange={(v) => set("message", v)} placeholder="How can we help?" disabled={loading} />
        {status ? <StatusMessage title="Sent">{status}</StatusMessage> : null}
        {errorMsg ? <StatusMessage kind="error" title="Error">{errorMsg}</StatusMessage> : null}
        <SubmitButton loading={loading}>Submit Inquiry</SubmitButton>
      </form></FormCard>
    </FormPageShell>
  );
}
