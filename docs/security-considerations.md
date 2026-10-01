# Security Considerations

The security model in this project is based on separating browser-accessible configuration from privileged server-side values and limiting how much environment-specific information appears in source.

## Configuration boundary

The repository uses generic placeholders for organization-specific values. Passwords, SMTP credentials, API tokens, private keys, internal addresses, customer URLs, and deployment-specific identifiers remain outside the source tree.

The included `.env.example` shows the configuration shape without containing live values.

## Authentication and authorization

Supabase Auth handles registration, login, password recovery, and authenticated sessions.

The reminder pages issue user-scoped queries, but authentication alone does not guarantee row-level authorization. A production deployment depends on correctly designed and tested Supabase Row Level Security policies.

Authoritative RLS migrations were not preserved with the original project, so database authorization remains an explicit limitation of the demonstrated implementation.

## Email handling

Contact-form submissions are sent through a server-side API route. SMTP credentials are read from server environment variables rather than exposed to browser code.

The route:

- validates supported form types
- validates required values
- escapes user-controlled HTML before constructing email content
- reads SMTP configuration from server-side environment variables

## Superseded authentication prototype

An older helper stored email/password data in browser `localStorage`. The active authentication pages had already moved to Supabase Auth, so that helper was removed during cleanup.

That change reduced ambiguity about which authentication system was actually in use and eliminated an insecure legacy approach from the maintained code.

## Production gaps identified

The current code would need additional work before production use, including:

- verified Supabase RLS policies
- rate limiting and abuse prevention
- hardened SMTP configuration
- deployment security headers
- structured logging
- application monitoring
- domain and TLS configuration
- dependency and secret scanning

I treat those as known engineering gaps rather than implied capabilities of the current project.
