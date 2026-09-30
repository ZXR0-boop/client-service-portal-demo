# Project Scope

This repository is a sanitized demonstration derived from a private customer-facing application. The goal is to show the implementation accurately while separating original functionality, later cleanup, and production features that are not demonstrated here.

## Implemented in the original application

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

## Corrected or cleaned up in this public version

- removed organization-specific branding, live operational links, and deployment details
- removed an obsolete browser `localStorage` authentication prototype that stored plaintext credentials
- added handling for the General Inquiry form type so the frontend and email API agree
- added HTML escaping for user-controlled values included in email output
- replaced live organization-specific values with generic placeholders

These changes improve the public reference implementation, but they are not presented as if they were always part of the original private application.

## Not demonstrated

This repository does not demonstrate:

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

The application expects an `inspection_reminders` table, but the original project did not preserve authoritative database migration or Row Level Security policy files. The public repository therefore documents the expected data model without inventing a production schema.

## Why the distinction matters

The project is more useful when its limits are visible. Features that were implemented are documented as implemented, later fixes are identified as later fixes, and production controls that are not evidenced are left as future work.
