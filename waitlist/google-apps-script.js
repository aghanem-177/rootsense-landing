// RootSense waitlist. Paste this into the waitlist Google Sheet: Extensions → Apps Script.
// Setup steps are in HANDOVER.md. The secret is stored in Project Settings → Script properties
// as WAITLIST_SECRET, never in this file.

const SHEET_NAME = 'Waitlist'
const HEADERS = ['Date and time', 'Name', 'Email', 'Model', 'Colour', 'Lock or button', 'Add-ons selected', 'Price shown (EGP)', 'Test row']

function doPost(e) {
  const secret = PropertiesService.getScriptProperties().getProperty('WAITLIST_SECRET')
  let data
  try {
    data = JSON.parse(e.postData.contents)
  } catch (err) {
    return reply(false)
  }
  if (!secret || data.secret !== secret) return reply(false)

  // One writer at a time, so two people submitting together each get their own row.
  const lock = LockService.getScriptLock()
  lock.waitLock(20000)
  try {
    getSheet().appendRow([
      new Date(data.submittedAt),
      safe(data.name),
      safe(data.email),
      safe(data.model),
      safe(data.colour || '—'),
      safe(data.closing || '—'),
      safe(data.addOns || 'None offered'),
      Number(data.price),
      data.test ? 'TEST' : '',
    ])
    SpreadsheetApp.flush()
  } finally {
    lock.releaseLock()
  }
  return reply(true)
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    book.setSpreadsheetTimeZone('Africa/Cairo')
    sheet.appendRow(HEADERS)
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm')
    sheet.getRange('H:H').setNumberFormat('#,##0')
  }
  return sheet
}

// Stops a name like "=HYPERLINK(...)" from running as a formula in the sheet.
function safe(value) {
  const text = value == null ? '' : String(value)
  return /^[=+\-@]/.test(text) ? "'" + text : text
}

function reply(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok })).setMimeType(ContentService.MimeType.JSON)
}
