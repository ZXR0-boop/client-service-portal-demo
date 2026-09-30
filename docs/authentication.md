# Authentication

The recovered application used Supabase Auth for the active authentication
pages.

## Registration

The registration page calls `supabase.auth.signUp()` with:

- email
- password
- optional monitoring/account metadata

The public portfolio copy keeps the optional field generic.

## Login

The login page uses `supabase.auth.signInWithPassword()`.

## Password recovery

The recovery page calls `resetPasswordForEmail()` and redirects the user back
to the application's reset route.

The reset page listens for a valid recovery/sign-in session and then calls
`supabase.auth.updateUser()` with the new password.

## Session checks

Protected reminder/account pages call `supabase.auth.getUser()` and redirect
unauthenticated users to the login page.

## Important boundary

Authentication does not automatically equal authorization.

Production use would require verified Row Level Security policies that prevent
one authenticated user from reading or modifying another user's reminder rows.
Those policies were not present in the recovered repository and are therefore
not fabricated here.
