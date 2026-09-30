# Troubleshooting Review

The recovered project is useful as a portfolio artifact partly because it shows
real iteration rather than a perfect first draft.

## Issue: frontend/backend form mismatch

The General Inquiry page sent `formType: "general"`, while the shared email API
handled only service and feedback.

### Effect

The UI could report failure even though the visible form looked complete.

### Public-version correction

A dedicated `general` branch was added to the API route.

## Issue: obsolete plaintext local storage helper

An older helper stored email/password data directly in browser `localStorage`.

### Review finding

The active login and registration pages used Supabase instead, meaning the
helper was superseded but still remained in the repository.

### Public-version correction

The file was removed from the public release. Calendar-link construction was
moved into a dedicated non-authentication utility.

## Issue: private operational links in UI

The recovered home page included real organization, payment, monitoring, and
reporting destinations.

### Public-version correction

Those integrations were not required to demonstrate the code architecture, so
the public portfolio copy replaces the home page with generic internal
features only.

## Lesson

A public portfolio review is not only a secret scan. Dead code, live business
URLs, branded assets, stale implementations, and inaccurate README claims can
all create risk or reduce technical credibility.
