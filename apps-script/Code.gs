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
  
  // Check if this is a venting machine submission
  if (data.question && data.answer) {
    return submitVentingResponse(data.question, data.answer);
  }
  
  // Otherwise, handle as table/idea submission
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
  
  // Check if this is a venting machine request
  const params = e.parameter || {};
  const action = (params.action || '').trim();
  
  if (action === 'question') {
    return getVentingQuestion();
  }
  
  if (action === 'test') {
    return testConnection();
  }
  
  // Otherwise, handle as table/idea request
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

// VENTING MACHINE FUNCTIONS

function getVentingQuestion() {
  try {
    // Get venting questions from a different sheet
    const props = PropertiesService.getScriptProperties();
    const ventingSheetId = props.getProperty('VENTING_SHEET_ID') || '1KIqnUsqvbZJbSLSSfPkY7p8ILKLu-B2k6cy1zTlCSbo4';
    
    const ss = SpreadsheetApp.openById(ventingSheetId);
    const promptsSheet = ss.getSheetByName('Prompts');
    
    if (!promptsSheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Prompts sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const lastRow = promptsSheet.getLastRow();
    if (lastRow < 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'No questions found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get a random question
    const randomRow = Math.floor(Math.random() * lastRow) + 1;
    const question = promptsSheet.getRange(randomRow, 1).getValue();
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        question: question,
        totalQuestions: lastRow 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Failed to get question: ' + error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function submitVentingResponse(question, answer) {
  try {
    // Validate word count (max 3 words)
    const wordCount = String(answer).trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 3) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Answer must be 3 words or less' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get venting responses sheet
    const props = PropertiesService.getScriptProperties();
    const ventingSheetId = props.getProperty('VENTING_SHEET_ID') || '1KIqnUsqvbZJbSLSSfPkY7p8ILKLu-B2k6cy1zTlCSbo4';
    
    const ss = SpreadsheetApp.openById(ventingSheetId);
    const responsesSheet = ss.getSheetByName('Responses');
    
    if (!responsesSheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Responses sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Record the response
    responsesSheet.appendRow([
      new Date(),
      question,
      String(answer).trim()
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: 'Response recorded successfully',
        wordCount: wordCount
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Failed to submit response: ' + error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function testConnection() {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Venting Machine API is working!',
      timestamp: new Date().toISOString(),
      config: {
        hasApiKey: !!PropertiesService.getScriptProperties().getProperty('API_KEY'),
        hasSheetId: !!PropertiesService.getScriptProperties().getProperty('SHEET_ID'),
        hasVentingSheetId: !!PropertiesService.getScriptProperties().getProperty('VENTING_SHEET_ID'),
        availableActions: ['question', 'test']
      }
    }))
    .setMimeType(ContentService.MimeType.JSON);
}








