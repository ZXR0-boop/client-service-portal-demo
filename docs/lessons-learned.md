# Lessons Learned

## Separate configuration from code

Environment variables kept SMTP and Supabase configuration out of application
source. A public repository still needs an explicit `.env.example` and strong
ignore rules.

## Remove dead security-sensitive code

A superseded file can still create risk or confuse reviewers. The old
plaintext-local-storage authentication prototype did not belong in a modern
public reference repository even though the active pages used Supabase.

## Verify both sides of an integration

A form can render correctly and still fail because the backend expects a
different payload. Reviewing the frontend and API route together exposed the
General Inquiry mismatch.

## Authentication is only one layer

Using Supabase Auth does not by itself prove secure row authorization. Row
Level Security must be designed and verified separately.

## Public repositories need a disclosure model

A portfolio copy should answer:

- What is real?
- What was changed for publication?
- What is intentionally withheld?
- What should not be claimed?

That is why this repository includes both an accuracy review and a security
review.

## Future improvements

- add automated tests for API form types
- add rate limiting and abuse controls
- add schema migrations and verified RLS policies
- add CI secret scanning
- add form schema validation
- add server-side structured logging
- add accessibility testing
- add deployment security headers
