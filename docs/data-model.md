# Data Model Notes

The reminder workflow expects an `inspection_reminders` table with these fields:

| Field | Purpose |
| --- | --- |
| `id` | Reminder identifier |
| `user_id` | Owner's authentication user ID |
| `site_name` | Human-readable site name |
| `inspection_type` | Reminder category |
| `inspection_date` | Date of inspection |
| `notes` | Optional notes |

The original project did not preserve authoritative database migrations, so the repository documents the data contract used by the application rather than a full production schema.

## Authorization expectation

Reminder queries are scoped by `user_id` in the application. A production deployment would also enforce the same ownership rule at the database layer with Supabase Row Level Security so one authenticated user cannot read or modify another user's reminder records.

That RLS definition is a known gap in the preserved project artifacts.
