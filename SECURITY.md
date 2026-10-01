# Security Design Notes

Security decisions in this project focus on keeping privileged values out of browser code and separating application behavior from environment-specific configuration.

## Credential handling

SMTP credentials, API tokens, private keys, destination addresses, and other privileged values are supplied through environment configuration rather than committed to the source tree.

The local development environment file is excluded through `.gitignore`. The repository includes `.env.example` only to document the configuration shape expected by the application.

## Supabase client configuration

The browser-side Supabase client uses the public project URL and anonymous client key expected by Supabase. Those values identify the project but do not replace authorization controls.

Access to reminder records depends on database Row Level Security. The original project did not preserve authoritative RLS migration files, so the repository treats that layer as an explicit production gap rather than implying it is complete.

## Server-side email boundary

Contact forms submit to a Next.js API route. SMTP credentials remain on the server side, and user-controlled values are escaped before being inserted into HTML email content.

## Sensitive data boundary

Organization-specific URLs, customer information, deployment details, and live infrastructure identifiers are not required to explain the application architecture, so they are not part of this repository.

These choices keep the code reviewable while preserving the separation between application logic and private operational data.
