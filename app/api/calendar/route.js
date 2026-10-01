function escapeICSText(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatICSDate(dateString, hour = 9, minute = 0) {
  const date = new Date(
    `${dateString}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`
  );

  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const siteName = searchParams.get("siteName") || "Inspection Site";
  const inspectionType = searchParams.get("inspectionType") || "Inspection";
  const inspectionDate = searchParams.get("inspectionDate") || "";
  const notes = searchParams.get("notes") || "";

  if (!inspectionDate) {
    return new Response("Missing inspectionDate.", { status: 400 });
  }

  const start = formatICSDate(inspectionDate, 9, 0);
  const end = formatICSDate(inspectionDate, 10, 0);
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const title = `${inspectionType} Inspection - ${siteName}`;
  const description = [
    `Site: ${siteName}`,
    `Inspection Type: ${inspectionType}`,
    notes ? `Notes: ${notes}` : "",
  ].filter(Boolean).join("\n");

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ClientServicePortal//Inspection Reminder//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${crypto.randomUUID()}
DTSTAMP:${stamp}
DTSTART:${start}
DTEND:${end}
SUMMARY:${escapeICSText(title)}
DESCRIPTION:${escapeICSText(description)}
END:VEVENT
END:VCALENDAR`;

  const safeName = siteName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "site";

  return new Response(ics, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="inspection-${safeName}.ics"`,
      "Cache-Control": "no-store",
    },
  });
}
