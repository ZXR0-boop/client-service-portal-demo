# Data Model Notes

The private source repository did not include authoritative database migrations.

The recovered reminder UI referenced an `inspection_reminders` table with these
fields:

| Field | Purpose |
| --- | --- |
| `id` | Reminder identifier |
| `user_id` | Owner's authentication user ID |
| `site_name` | Human-readable site name |
| `inspection_type` | Reminder category |
| `inspection_date` | Date of inspection |
| `notes` | Optional notes |

This document intentionally stops at the interface demonstrated by the source.
It does not invent production schema constraints or Row Level Security policies.

For a real deployment, RLS should enforce that authenticated users can operate
only on rows whose `user_id` matches their authenticated identity.
