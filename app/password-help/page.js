"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "../lib/supabase/client";
import { FormCard, StatusMessage, SubmitButton, TextField } from "../components/portal-form-ui";

export default function PasswordHelpPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setErrorMsg("");

    const redirectTo = `${window.location.origin}/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });

    if (error) setErrorMsg(error.message);
    else setStatus("Password reset email requested. Check your inbox.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-md">
        <Link href="/login" className="text-sm text-slate-300">← Back to Login</Link>
        <FormCard className="mt-6">
          <h1 className="mb-5 text-3xl font-bold">Reset password</h1>
          <form onSubmit={submit} className="grid gap-4">
            <TextField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" disabled={loading} />
            {status ? <StatusMessage title="Request sent">{status}</StatusMessage> : null}
            {errorMsg ? <StatusMessage kind="error" title="Unable to send reset">{errorMsg}</StatusMessage> : null}
            <SubmitButton loading={loading} loadingText="Sending...">Send Reset Email</SubmitButton>
          </form>
        </FormCard>
      </section>
    </main>
  );
}
