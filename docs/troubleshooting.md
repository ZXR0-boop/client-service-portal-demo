# Troubleshooting Notes

This project went through several rounds of iteration. The issues below capture problems I found by checking application behavior against the underlying implementation.

## Frontend/backend form mismatch

The General Inquiry page submitted:

```text
formType: "general"
```

while the shared email API originally handled only service requests and feedback.

### Effect

The form could render and accept input correctly while still failing at the API layer.

### Resolution

I added a dedicated `general` branch so the frontend form type and server-side handler use the same contract.

### Lesson

A working UI is only one side of an integration. Frontend payloads and backend handlers need to agree on the same data contract.

---

## Obsolete plaintext local-storage authentication helper

An older helper stored email/password data directly in browser `localStorage`.

### Investigation

The active registration and login pages were already using Supabase Auth, which meant the helper was superseded but still present in the source tree.

### Resolution

I removed the obsolete helper and kept Supabase as the active authentication path.

### Lesson

Dead code can still create security risk and make the active architecture harder to understand.

---

## Organization-specific operational links

The original application contained live customer, payment, monitoring, and reporting links tied to the source environment.

### Resolution

I replaced those destinations with generic equivalents because the application workflows can be understood without exposing the original organization's operational endpoints.

### Lesson

Source-code cleanup is not only about passwords and tokens. URLs, branded assets, stale code, and deployment metadata can also reveal more about a live environment than is necessary.

---

## Database authorization boundary

The reminder UI issues user-scoped Supabase queries, but authoritative migration and Row Level Security policy files were not preserved.

### Result

The application demonstrates authentication and reminder data access, while database-enforced row authorization remains a known limitation.

### Lesson

Authentication and authorization are separate concerns. A signed-in user still needs server- or database-enforced controls that determine which records the user is allowed to access.
