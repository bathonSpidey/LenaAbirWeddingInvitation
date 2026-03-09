export const downloadICS = () => {
  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "DTSTART:20261204T133000Z",
    "DTEND:20261204T220000Z",
    "SUMMARY:Wedding Reception: Abir & Lena",
    "DESCRIPTION:Celebrating the marriage of Abir and Lena at Royal Park.",
    "LOCATION:Royal Park, Jorhat, Assam, India",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

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
