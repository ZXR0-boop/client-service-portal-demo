"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { FormCard, StatusMessage, SubmitButton, TextField } from "../components/portal-form-ui";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted && data.session) setReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted && (event === "PASSWORD_RECOVERY" || (event === "SIGNED_IN" && session))) {
        setReady(true);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function submit(e) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("");

    if (password.length < 6) return setErrorMsg("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setErrorMsg("Passwords do not match.");

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setErrorMsg(error.message);
    else setStatus("Password updated.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-md">
        <Link href="/login" className="text-sm text-slate-300">← Back to Login</Link>
        <FormCard className="mt-6">
          <h1 className="mb-5 text-3xl font-bold">Choose a new password</h1>
          {!ready ? <p className="text-sm text-slate-300">Validating recovery session...</p> : (
            <form onSubmit={submit} className="grid gap-4">
              <TextField label="New Password" type="password" value={password} onChange={setPassword} placeholder="New password" disabled={loading} />
              <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirm password" disabled={loading} />
              {status ? <StatusMessage title="Updated">{status}</StatusMessage> : null}
              {errorMsg ? <StatusMessage kind="error" title="Unable to update">{errorMsg}</StatusMessage> : null}
              <SubmitButton loading={loading} loadingText="Updating...">Update Password</SubmitButton>
            </form>
          )}
        </FormCard>
      </section>
    </main>
  );
}
