# Calendar and Reminder Flow

## Reminder data

Authenticated users can create, read, and delete inspection reminders.

The reminder workflow uses these fields:

- `id`
- `user_id`
- `site_name`
- `inspection_type`
- `inspection_date`
- `notes`

## Calendar export

Each saved reminder can generate a local calendar file through `/api/calendar`.

The route outputs standard iCalendar text with:

- summary
- start/end time
- description
- generated UID
- download headers

This avoids requiring a Google Calendar or Microsoft Graph token.

## Security consideration

The current calendar route passes reminder text in the URL query string. That keeps the implementation simple, but it also means reminder details can appear in browser history or logs.

For a production version containing sensitive notes, I would move the export to a POST-based flow or pass only a server-side reminder identifier and load the details on the server.
