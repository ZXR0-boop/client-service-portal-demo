# Authentication

The active authentication flow uses Supabase Auth.

## Registration

The registration page calls `supabase.auth.signUp()` with:

- email
- password
- optional account-reference metadata

The account-reference field is generic in this repository because the original organization-specific identifier is not needed to explain the authentication flow.

## Login

The login page uses `supabase.auth.signInWithPassword()`.

## Password recovery

The recovery page calls `resetPasswordForEmail()` and redirects the user back to the application's reset route.

The reset page listens for a valid recovery/sign-in session and then calls `supabase.auth.updateUser()` with the new password.

## Session checks

Protected reminder and account pages call `supabase.auth.getUser()` and redirect unauthenticated users to the login page.

## Authorization boundary

Authentication establishes who the user is; it does not by itself control which database rows that user may access.

The reminder workflow relies on Supabase Row Level Security for row-level authorization. Authoritative RLS migrations were not preserved with the original project, so that part of the authorization model remains outside the demonstrated implementation.
