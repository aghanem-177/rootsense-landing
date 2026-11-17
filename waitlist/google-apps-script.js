// Paste this into the waitlist Google Sheet: Extensions → Apps Script.
// Then: Project Settings → Script properties → add WAITLIST_SECRET (same value as in Vercel).
// Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
// Copy the web app URL into Vercel as WAITLIST_SHEET_URL.

const HEADERS = ['Submitted at', 'Name', 'Email', 'Model', 'Colour', 'Lock or button', 'Price shown (EGP)']

function doPost(e) {
  const secret = PropertiesService.getScriptProperties().getProperty('WAITLIST_SECRET')
  let data
  try {
    data = JSON.parse(e.postData.contents)
  } catch (err) {
    return reply(false)
  }
  if (!secret || data.secret !== secret) return reply(false)

  const book = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = book.getSheetByName('Waitlist') || book.insertSheet('Waitlist')
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS)
  sheet.appendRow([data.submittedAt, data.name, data.email, data.model, data.colour, data.closing, data.price].map(safe))
  return reply(true)
}

// Stops a name like "=HYPERLINK(...)" from running as a formula in the sheet.
function safe(value) {
  const text = value == null ? '' : String(value)
  return /^[=+\-@]/.test(text) ? "'" + text : text
}

function reply(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok })).setMimeType(ContentService.MimeType.JSON)
}
