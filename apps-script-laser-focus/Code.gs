// LaserFocus Google Apps Script
// This handles form submissions and serves configuration

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return json({ error: 'No POST data received' });
  }

  const data = JSON.parse(e.postData.contents);
  const props = PropertiesService.getScriptProperties();
  const sheet = SpreadsheetApp
    .openById(props.getProperty('SHEET_ID'))
    .getSheetByName('Output');
  
  sheet.appendRow([
    new Date(),
    data.table,
    data.idea,
    data.impact,
    data.effort
  ]);
  
  return json({ success: true });
}

function doGet(e) {
  const params = (e && e.parameter) || {};
  const action = (params.action || '').trim();
  
  // Handle config request
  if (action === 'config') {
    return getFormConfig();
  }
  
  // Get all data from Output
  const props = PropertiesService.getScriptProperties();
  const ss = SpreadsheetApp.openById(props.getProperty('SHEET_ID'));
  const sheet = ss.getSheetByName('Output');
  const rows = sheet.getDataRange().getValues();
  
  // Skip header row and map to objects
  const allData = rows.slice(1).map(r => ({
    Timestamp: r[0],
    table:     r[1],
    idea:      r[2],
    impact:    r[3],
    effort:    r[4],
  }));
  
  // Handle different query parameters
  if (params.meta === '1') {
    return json({ lastRow: allData.length });
  }
  
  if (params.sinceRow) {
    const sinceRow = parseInt(params.sinceRow) || 0;
    const limit = parseInt(params.limit) || 500;
    const sliced = allData.slice(sinceRow - 1, sinceRow - 1 + limit);
    return json({ rows: sliced, lastRow: allData.length });
  }
  
  if (params.format === 'obj') {
    return json({ rows: allData, lastRow: allData.length });
  }
  
  // Default: return array
  return json(allData);
}

function getFormConfig() {
  try {
    const props = PropertiesService.getScriptProperties();
    const sheetId = props.getProperty('SHEET_ID');
    
    if (!sheetId) {
      return json({ error: 'SHEET_ID not configured in Script Properties' });
    }
    
    const ss = SpreadsheetApp.openById(sheetId);
    const inputSheet = ss.getSheetByName('Input');
    
    if (!inputSheet) {
      const sheetNames = ss.getSheets().map(s => s.getName());
      return json({ 
        error: 'Input sheet not found. Available sheets: ' + sheetNames.join(', ')
      });
    }
    
    // Read configuration from Input sheet
    // B1=question, B3=xAxisTitle, B4=yAxisTitle
    // B6, C6, D6 = X-axis labels (3 measures)
    // B7, C7, D7 = Y-axis labels (3 measures)
    const values = inputSheet.getRange('B1:D7').getValues();
    
    const config = {
      question: String(values[0][0] || '').trim(),
      xAxisTitle: String(values[2][0] || '').trim(),
      yAxisTitle: String(values[3][0] || '').trim(),
      xAxisLabel1: String(values[5][0] || '').trim(),  // B6
      xAxisLabel2: String(values[5][1] || '').trim(),  // C6
      xAxisLabel3: String(values[5][2] || '').trim(),  // D6
      yAxisLabel1: String(values[6][0] || '').trim(),  // B7
      yAxisLabel2: String(values[6][1] || '').trim(),  // C7
      yAxisLabel3: String(values[6][2] || '').trim()   // D7
    };
    
    return json(config);
    
  } catch (error) {
    return json({ error: 'Failed to get config: ' + error.toString() });
  }
}

// Helper function to return JSON
function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

