# Client Service Portal Demo

A Next.js customer self-service portal featuring Supabase authentication, service request forms, inspection reminders, server-side email submission, and calendar export.

The project originated as a private application built around a real service organization. This public version keeps the technical structure and application logic while replacing organization-specific branding, live operational links, credentials, account identifiers, and deployment details with generic equivalents.

## What this project demonstrates

- Next.js App Router application structure
- React client-side forms and state handling
- Supabase authentication and account-recovery flows
- authenticated reminder data stored through Supabase
- server-side email submission with Nodemailer
- calendar `.ics` generation through an API route
- reusable form components
- loading, error, validation, and success states
- environment-variable based configuration
- troubleshooting across frontend and backend integration points
- security-conscious handling of public source code

## Architecture

```mermaid
flowchart LR
    User["User Browser"] --> Web["Next.js Client Portal"]
    Web --> Auth["Supabase Auth"]
    Web --> Data["Reminder Data"]
    Web --> Contact["Contact API Route"]
    Web --> Calendar["Calendar API Route"]
    Contact --> Mail["SMTP Mail Provider"]
    Auth --> Data

    subgraph Configuration
      Env["Environment Variables"]
    end

    Env --> Auth
    Env --> Contact
```

For a deeper explanation, see [docs/architecture.md](docs/architecture.md).

## Main features

### Authentication

Users can register, sign in, request a password reset, update a recovered password, and sign out through Supabase Auth.

### Service request, inquiry, and feedback forms

The portal contains reusable form flows for service requests, general inquiries, and customer feedback. Submissions are sent to a server-side API route rather than exposing SMTP credentials to the browser.

### Inspection reminders

Authenticated users can save inspection reminders through Supabase, review upcoming and past reminders, delete saved reminders, and generate a portable `.ics` calendar file.

### Calendar generation

The `/api/calendar` route accepts reminder details, escapes calendar text, and returns an `.ics` download suitable for common calendar applications.

## Technology

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19 |
| Styling | Tailwind CSS |
| Authentication | Supabase Auth |
| Data access | Supabase client |
| Email | Nodemailer over SMTP |
| Calendar export | Server-generated iCalendar |
| Configuration | Environment variables |

## Security and public-source boundaries

The public repository excludes live credentials, Supabase project identifiers, SMTP secrets, private customer URLs, organization-specific operational links, internal addresses, and the original private Git history.

The original project also contained an obsolete authentication prototype that stored plaintext credentials in browser `localStorage`. The active authentication pages had already moved to Supabase Auth; the obsolete helper is not included here.

The public version also corrects a General Inquiry frontend/backend mismatch so all documented form types are handled consistently. See [docs/project-scope.md](docs/project-scope.md) for the distinction between original functionality, later cleanup, and features not demonstrated by this repository.

For the security model and remaining production considerations, see [docs/security-considerations.md](docs/security-considerations.md).

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env.local
```

3. Replace the placeholders with credentials for your own test services.

4. Run the development server:

```bash
npm run dev
```

5. Open the local development URL printed by Next.js.

Do not commit `.env.local`.

## Supabase data expectation

The reminder UI expects an `inspection_reminders` table containing at least:

- `id`
- `user_id`
- `site_name`
- `inspection_type`
- `inspection_date`
- `notes`

The original repository did not preserve authoritative database migration or Row Level Security policy files, so this repository documents the expected data model without presenting a complete production schema. See [docs/data-model.md](docs/data-model.md).

## Repository guide

| Document | Purpose |
| --- | --- |
| [Architecture](docs/architecture.md) | Component and data-flow architecture |
| [Authentication](docs/authentication.md) | Supabase authentication flow |
| [Forms and email](docs/forms-and-email.md) | Form submission and SMTP architecture |
| [Calendar reminders](docs/calendar-reminders.md) | Reminder storage and `.ics` export |
| [Data model](docs/data-model.md) | Expected reminder fields and database limitations |
| [Troubleshooting](docs/troubleshooting.md) | Integration issues and fixes found during development/review |
| [Lessons learned](docs/lessons-learned.md) | Technical lessons and future improvements |
| [Project scope](docs/project-scope.md) | Original functionality, later corrections, and project limits |
| [Security considerations](docs/security-considerations.md) | Public-source sanitization and production security boundaries |

## Key skills demonstrated

Next.js · React · API routes · Supabase authentication · environment configuration · form handling · server-side email · calendar generation · troubleshooting · data integration · secure source sanitization · technical documentation

## Scope

This is a technical demonstration, not a production customer portal. It does not claim enterprise authorization, complete threat modeling, production monitoring, PCI-compliant payment processing, high-availability deployment, or a complete customer lifecycle platform.
