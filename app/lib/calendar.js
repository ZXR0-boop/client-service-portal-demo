export function createCalendarLink(inspection) {
  const params = new URLSearchParams({
    siteName: inspection.siteName || "",
    inspectionType: inspection.inspectionType || "",
    inspectionDate: inspection.inspectionDate || "",
    notes: inspection.notes || "",
  });

  return `/api/calendar?${params.toString()}`;
}
