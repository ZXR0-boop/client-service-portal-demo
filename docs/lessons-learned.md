# Lessons Learned

## Separate configuration from code

Environment variables kept SMTP and Supabase configuration out of application source. The repository includes an `.env.example` so the required configuration is visible without exposing live values.

## Remove dead security-sensitive code

A superseded file can still create risk or make the active architecture unclear. The old plaintext-`localStorage` authentication prototype was no longer part of the active login flow and was removed in favor of the Supabase-based path already used by the application.

## Verify both sides of an integration

A form can render correctly and still fail because the backend expects a different payload. Comparing the General Inquiry page with the contact API exposed a frontend/backend mismatch that I corrected.

## Authentication is only one layer

Using Supabase Auth establishes identity and session handling, but it does not by itself prove secure row authorization. Row Level Security is a separate layer that needs its own design and verification.

## Server-side boundaries matter

SMTP credentials stay on the server side through the contact API route rather than being exposed to browser code. The same separation is useful for any privileged integration.

## Preserve the technical value, not the live environment

The application architecture, troubleshooting process, and implementation choices are useful to review. Organization-specific URLs, credentials, and deployment identifiers are not necessary to understand those decisions.

## Future improvements

- add automated tests for all API form types
- add rate limiting and abuse controls
- add schema migrations and verified RLS policies
- add CI secret scanning
- add schema-based form validation
- add server-side structured logging
- add accessibility testing
- add deployment security headers
- add dependency/security scanning
