# Public Repository Security Review

## Objective

Prepare a portfolio-safe release without exposing credentials, private
infrastructure, personal contact details, or organization/customer operational
information.

## Release strategy

The public repository should **not** be created by changing the visibility of
the recovered private repository.

Instead:

1. recover the current source from the private repository;
2. sanitize the release tree;
3. omit private Git history;
4. create a new public repository;
5. commit only the reviewed release.

## Removed or withheld

The public version intentionally omits:

- `.env` and `.env.local`
- API keys and tokens
- SMTP credentials
- Supabase project identifiers and live endpoint values
- real destination email addresses
- private app/deployment URLs
- company customer portal URLs
- payment and monitoring URLs
- company phone numbers
- organization logos and branded image assets
- personal filesystem paths
- private IP addresses
- raw deployment output
- Vercel project metadata
- Git history from the source repository
- obsolete plaintext-password prototype storage

## Included placeholders

`.env.example` contains variable names and obvious placeholders only.

## Source-code review notes

The public contact API:

- reads credentials only from server-side environment variables;
- validates required environment configuration;
- validates service-request email addresses;
- escapes user-controlled HTML before constructing email bodies;
- supports service, inquiry, and feedback form types;
- rejects unsupported form types.

## Remaining limitations

This review is a source-disclosure review, not a penetration test.

The public sample still requires the person deploying it to configure:

- Supabase authentication settings
- database policies
- SMTP security
- rate limiting / abuse protection
- production logging
- deployment headers
- monitoring
- domain configuration

Do not deploy this sample to production without an independent security review.

## Public release status

The generated release tree was scanned for common disclosure patterns,
including:

- email-address formats
- IPv4 literals
- URL literals
- common secret/token assignments
- PEM/private-key headers
- environment files
- obvious organization-specific identifiers

Expected documentation placeholders and standard package references are allowed.
No source-environment credentials are intentionally present.
