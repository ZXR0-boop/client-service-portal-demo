"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { FormCard, StatusMessage, SubmitButton, TextField } from "../components/portal-form-ui";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }
    router.push("/account");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-md">
        <Link href="/" className="text-sm text-slate-300">← Back to Home</Link>
        <FormCard className="mt-6">
          <h1 className="mb-5 text-3xl font-bold">Log In</h1>
          <form onSubmit={submit} className="grid gap-4">
            <TextField label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" disabled={loading} />
            <TextField label="Password" type="password" value={password} onChange={setPassword} placeholder="Enter your password" disabled={loading} />
            <div className="text-right"><Link href="/password-help" className="text-sm text-red-300">Forgot password?</Link></div>
            {errorMsg ? <StatusMessage kind="error" title="Login failed">{errorMsg}</StatusMessage> : null}
            <SubmitButton loading={loading} loadingText="Logging in...">Log In</SubmitButton>
          </form>
        </FormCard>
      </section>
    </main>
  );
}
