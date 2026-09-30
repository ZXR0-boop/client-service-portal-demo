# Calendar and Reminder Flow

## Reminder data

Authenticated users can create, read, and delete inspection reminders.

Expected fields in the recovered UI:

- `id`
- `user_id`
- `site_name`
- `inspection_type`
- `inspection_date`
- `notes`

## Calendar export

Each saved reminder can generate a local calendar file through
`/api/calendar`.

The route outputs standard iCalendar text with:

- summary
- start/end time
- description
- generated UID
- download headers

This avoids requiring a Google Calendar or Microsoft Graph token.

## Security note

The calendar route contains reminder text in the URL query string. For a
production application containing sensitive notes, a POST-based or server-side
identifier-based export flow would reduce exposure through browser history and
logs.
