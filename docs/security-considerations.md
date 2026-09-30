# Security Considerations

The public repository intentionally separates application architecture from private deployment details.

## Information excluded or generalized

- passwords and authentication secrets
- API tokens
- SMTP credentials
- live Supabase project identifiers
- private customer and operational URLs
- organization-specific branding and contact details
- personal email addresses
- internal IP addresses
- private filesystem paths
- deployment metadata and raw deployment output
- original private Git history

The included `.env.example` contains variable names and placeholders only.

## Authentication and authorization

Supabase Auth handles registration, login, password recovery, and authenticated sessions.

Authentication alone does not guarantee secure row-level authorization. The reminder pages issue user-scoped queries, so a production deployment also depends on correctly designed and tested Supabase Row Level Security policies. Authoritative RLS migrations were not preserved with the original project and are not invented here.

## Email handling

Contact-form submissions are sent through a server-side API route so SMTP credentials are not exposed to the browser.

The public version:

- validates supported form types
- validates required values
- escapes user-controlled HTML before constructing email content
- reads SMTP configuration from server-side environment variables

A production deployment would still need abuse controls such as rate limiting, logging, and monitoring.

## Superseded prototype code

An older helper stored email/password data in browser `localStorage`. The active authentication pages had already moved to Supabase Auth, and that obsolete helper was removed from this public version.

## Production considerations

Before production use, this sample would still need independent review of:

- Supabase RLS policies
- rate limiting and abuse prevention
- SMTP configuration
- deployment security headers
- structured logging
- monitoring
- domain and TLS configuration
- dependency and secret scanning

This repository is a source example and project demonstration, not a security certification.
