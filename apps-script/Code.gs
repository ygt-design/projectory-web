function _checkKey(e) {
  if (!e) return;  // allow manual runs
  const key = (e.parameter && e.parameter.key) || (e.headers && e.headers['x-api-key']);
  const stored = PropertiesService.getScriptProperties().getProperty('API_KEY');
  if (key !== stored) throw new Error('Unauthorized');
}

function doPost(e) {
  // Guard: ensure we have POST data
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'No POST data received' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  _checkKey(e);
  const data = JSON.parse(e.postData.contents);
  const props = PropertiesService.getScriptProperties();
  const sheet = SpreadsheetApp
    .openById(props.getProperty('SHEET_ID'))
    .getSheetByName('Sheet1');
  sheet.appendRow([
    new Date(),
    data.table,
    data.idea,
    data.impact,
    data.effort
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  _checkKey(e);
  const props = PropertiesService.getScriptProperties();
  const ss = SpreadsheetApp.openById(props.getProperty('SHEET_ID'));
  // Use the first sheet in the spreadsheet
  const sheet = ss.getSheets()[0];
  const rows = sheet.getDataRange().getValues();
  const json = rows.map(r => ({
    timestamp: r[0],
    table:     r[1],
    idea:      r[2],
    impact:    r[3],
    effort:    r[4],
  }));
  return ContentService
    .createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON);
}








