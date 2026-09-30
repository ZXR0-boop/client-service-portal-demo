"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "../lib/supabase/client";
import { FormCard, StatusMessage, SubmitButton, TextField } from "../components/portal-form-ui";

export default function RegisterPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountReference, setAccountReference] = useState("");
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setErrorMsg("");

    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { account_reference: accountReference.trim() || null } },
    });

    if (error) setErrorMsg(error.message);
    else setStatus("Account created. Check your email if confirmation is enabled.");

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-md">
        <Link href="/" className="text-sm text-slate-300">← Back to Home</Link>
        <FormCard className="mt-6">
          <h1 className="mb-5 text-3xl font-bold">Create an account</h1>
          <form onSubmit={submit} className="grid gap-4">
            <TextField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" disabled={loading} />
            <TextField label="Password" type="password" value={password} onChange={setPassword} placeholder="Create a password" disabled={loading} />
            <TextField label="Account Reference (Optional)" value={accountReference} onChange={setAccountReference} placeholder="Optional reference" required={false} disabled={loading} />
            {status ? <StatusMessage title="Account created">{status}</StatusMessage> : null}
            {errorMsg ? <StatusMessage kind="error" title="Registration failed">{errorMsg}</StatusMessage> : null}
            <SubmitButton loading={loading} loadingText="Creating account...">Register</SubmitButton>
          </form>
        </FormCard>
      </section>
    </main>
  );
}
