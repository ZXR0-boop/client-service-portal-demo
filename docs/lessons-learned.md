# Lessons Learned

## Separate configuration from code

Environment variables kept SMTP and Supabase configuration out of application source. The repository includes an `.env.example` so the required configuration is visible without publishing live values.

## Remove dead security-sensitive code

A superseded file can still create risk or make the active architecture unclear. The old plaintext-`localStorage` authentication prototype was no longer part of the active login flow and did not belong in the public reference implementation.

## Verify both sides of an integration

A form can render correctly and still fail because the backend expects a different payload. Comparing the General Inquiry page with the contact API exposed a frontend/backend mismatch that was corrected in this version.

## Authentication is only one layer

Using Supabase Auth establishes identity and session handling, but it does not by itself prove secure row authorization. Production use would also require tested Row Level Security policies.

## Server-side boundaries matter

SMTP credentials stay on the server side through the contact API route rather than being exposed to browser code. The same principle applies to other secrets and privileged integrations.

## Public source should preserve technical value without exposing the live environment

The repository keeps architecture, application flow, and implementation details while removing organization-specific values that are not needed to understand the code.

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
