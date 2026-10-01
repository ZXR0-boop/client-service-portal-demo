# Project Scope

This project began as a private customer-facing application built around a real service organization. The repository preserves the technical workflows while replacing organization-specific details that are not needed to understand the code.

## Original functionality

- Next.js App Router pages
- React form components and client-side state handling
- Supabase email/password registration and login
- password-reset request and recovered-password update flows
- authenticated account and reminder pages
- create/read/delete interactions with an `inspection_reminders` table
- server-side email submission with Nodemailer
- service-request and feedback form handling
- calendar `.ics` generation
- reusable form components
- loading, error, validation, and success states
- environment-variable based configuration

## Later corrections and cleanup

While reviewing the project, I made several changes that improve the current implementation:

- removed organization-specific branding, live operational links, and deployment details
- removed an obsolete browser `localStorage` authentication prototype that stored plaintext credentials
- added handling for the General Inquiry form type so the frontend and email API use the same contract
- added HTML escaping for user-controlled values included in email output
- replaced live organization-specific values with generic equivalents

These changes are part of the project's evolution and are documented separately from the features that were already present.

## Current limitations

The preserved implementation does not include evidence of:

- enterprise IAM architecture
- production Row Level Security policy design
- penetration testing
- PCI-compliant payment processing
- high-availability deployment
- production monitoring or SIEM integration
- complete customer lifecycle management
- full DevSecOps automation
- a production-ready authorization model

## Database limitation

The application expects an `inspection_reminders` table, but authoritative database migration and Row Level Security policy files were not preserved.

Because of that, the repository documents the application's expected data contract while treating database authorization as a known production gap.

## Why I document the limits

The useful part of this project is not just the feature list. It also shows where the implementation is complete, where I found and corrected inconsistencies, and where additional work would be required before treating the application as production-ready.
