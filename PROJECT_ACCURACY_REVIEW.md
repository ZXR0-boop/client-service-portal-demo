# Project Accuracy Review

Review purpose: describe exactly what the recovered private source demonstrated,
what was changed for public release, and what this portfolio should **not**
claim.

## Verified in the recovered source

The recovered private repository contained working source for:

- Next.js App Router pages
- React form components and state handling
- Supabase browser-client configuration through environment variables
- Supabase email/password registration
- Supabase password login
- Supabase password reset request flow
- Supabase recovered-password update flow
- authenticated account/reminder pages
- reads, inserts, and deletes against an `inspection_reminders` table
- a server-side Nodemailer SMTP route
- service-request form submission
- feedback form submission
- calendar `.ics` generation
- reusable portal form UI components
- loading and global error states

## Verified configuration approach

The recovered source referenced sensitive deployment values through environment
variables, including Supabase and SMTP settings. The checked-in `.gitignore`
excluded `.env*`.

No real environment values are copied into this public repository.

## Portfolio-release changes

The following changes were made while preparing this public version:

1. Organization names, logos, phone numbers, customer portals, payment portals,
   monitoring portals, and other live operational links were removed.
2. A generic portfolio identity replaced organization-specific branding.
3. The obsolete `localData.js` authentication prototype was removed.
4. The General Inquiry submission path was fixed so the API route handles the
   documented `general` form type.
5. HTML escaping was added to email output to reduce unsafe rendering of
   user-controlled form values.
6. Documentation, security review material, and architecture diagrams were
   added specifically for portfolio use.
7. The public release is intended to begin with fresh Git history.

## Superseded prototype code

The recovered private source included an older browser `localStorage` helper
that stored user email/password data directly in client-side storage.

That code was not used by the recovered login/register pages, which used
Supabase Auth. Because plaintext password storage is inappropriate for a public
reference implementation, the obsolete helper was excluded.

This exclusion is a security cleanup, not an attempt to hide project history.

## Identified inconsistency in recovered source

The recovered General Inquiry page submitted:

`formType: "general"`

while the recovered contact API explicitly handled only `service` and
`feedback`.

The public version adds a `general` branch. Therefore:

- it is accurate to say the original project contained a General Inquiry UI;
- it is **not** accurate to claim the recovered backend handled that path
  correctly before portfolio cleanup.

## Claims this project supports

Reasonable portfolio statements include:

- Built a responsive Next.js customer portal prototype.
- Integrated Supabase email/password authentication and account recovery.
- Built API routes for email submission and calendar-file generation.
- Used environment variables to separate application code from credentials.
- Implemented authenticated reminder create/read/delete flows with Supabase.
- Troubleshot inconsistencies between frontend form behavior and backend
  handlers.
- Sanitized a private application for safe public portfolio review.

## Claims this project does not support

Do not represent this repository as proof of:

- production security certification
- enterprise IAM design
- penetration testing
- SOC / SIEM implementation
- PCI-compliant payment processing
- production monitoring architecture
- full customer database ownership
- high-availability deployment
- mobile-native application development
- complete DevSecOps pipeline
- a production-ready authorization model

## Confidence

The accuracy review is based on the recovered default branch of the private
GitHub repository and the source files directly inspected during portfolio
preparation. No claim is made that every historical private commit was free of
sensitive data; this is why the public release should use fresh Git history.
