# Security Policy

This repository is a sanitized portfolio demonstration.

Do not submit real customer information, passwords, production credentials, or
live infrastructure details when testing the project.

## Secrets

Use local environment variables only. Never commit:

- `.env.local`
- SMTP passwords
- Supabase service-role keys
- API tokens
- private keys
- production destination email addresses

The sample uses a Supabase **anon** key variable because browser applications
require a public client credential. Database Row Level Security remains
essential and is outside the recovered source repository.

## Reporting

If you discover a secret or sensitive value accidentally committed to this
public portfolio repository, rotate or revoke the value first, then remove it
from Git history rather than only deleting it from the latest commit.
