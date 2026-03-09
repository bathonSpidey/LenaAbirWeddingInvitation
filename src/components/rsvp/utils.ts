export const downloadICS = () => {
  // RFC 5545 requires CRLF line endings
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Abir & Lena Wedding//EN",
    "BEGIN:VEVENT",
    "DTSTART:20261206T073000Z",
    "DTEND:20261206T163000Z",
    "SUMMARY:Wedding Reception: Abir & Lena",
    "DESCRIPTION:Celebrating the marriage of Abir and Lena at Royal Park.",
    "LOCATION:Royal Park, Jorhat, Assam, India",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = window.URL.createObjectURL(
    new Blob([content], { type: "text/calendar;charset=utf-8" }),
  );
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: "Abir_Lena_Wedding.ics",
  });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
