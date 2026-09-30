# Troubleshooting Notes

This project went through several rounds of iteration. The issues below are useful examples of checking both application behavior and implementation details rather than assuming a finished-looking UI means every path is working correctly.

## Frontend/backend form mismatch

The General Inquiry page submitted:

```text
formType: "general"
```

while the shared email API originally handled only service requests and feedback.

### Effect

The form could render and accept input correctly while still failing at the API layer.

### Resolution

A dedicated `general` branch was added so the frontend form type and server-side handler use the same contract.

### Lesson

A working UI is only one side of an integration. Frontend payloads and backend handlers should be verified together.

---

## Obsolete plaintext local-storage authentication helper

An older helper stored email/password data directly in browser `localStorage`.

### Investigation

The active registration and login pages were already using Supabase Auth, which meant the helper was superseded but still present in the source tree.

### Resolution

The obsolete helper was removed from the public version. Authentication remains handled through Supabase.

### Lesson

Dead code can still create security risk and confuse reviewers about which implementation is actually active.

---

## Private operational links mixed into the UI

The original application contained organization-specific customer, payment, monitoring, and reporting links.

### Resolution

Those live destinations were replaced or removed because they were not required to demonstrate the application architecture.

### Lesson

Public source review involves more than scanning for passwords. Live business URLs, branded assets, stale code, and deployment metadata can expose unnecessary information even when no secret token is present.

---

## Database authorization boundary

The reminder UI issues user-scoped Supabase queries, but the original project did not preserve authoritative migration and Row Level Security policy files.

### Result

The application can demonstrate authentication and reminder data access, but the repository does not present the authorization layer as production-complete.

### Lesson

Authentication and authorization are separate concerns. A user being signed in does not by itself prove that row-level access controls are correctly enforced.
