
/**
 * VENTING MACHINE API
 * 
 * Handles prompts retrieval and answers submission for the Venting Machine form.
 * 
 * Expected Google Sheets structure:
 * - Sheet 1: "Prompts" (contains 4 rows with prompts)
 * - Sheet 2: "Responses" (for storing user answers with timestamps)
 * 
 * API Endpoints:
 * GET ?action=prompts&key=API_KEY → { prompts: string[4] }
 * POST ?key=API_KEY body { answers: string[4] } → { ok: true }
 */

// Get configuration from Script Properties (more secure than hardcoding)
function getConfig() {
  try {
    const properties = PropertiesService.getScriptProperties();
    const allProperties = properties.getProperties();
    
    // Debug: log all properties
    console.log('All Script Properties:', Object.keys(allProperties));
    
    const API_KEY = properties.getProperty('API_KEY');
    const SPREADSHEET_ID = properties.getProperty('SPREADSHEET_ID');
    
    console.log('API_KEY retrieved:', API_KEY ? 'Found (' + API_KEY.substring(0, 8) + '...)' : 'Not found');
    console.log('SPREADSHEET_ID retrieved:', SPREADSHEET_ID ? 'Found (' + SPREADSHEET_ID.substring(0, 8) + '...)' : 'Not found');
    
    // Temporary fallback for debugging - REMOVE AFTER TESTING
    const fallbackConfig = {
      API_KEY: API_KEY || '11952ad938bbbd1e806c4c0d82379628d54fc9880489815b9ac21a1efdeab110',
      SPREADSHEET_ID: SPREADSHEET_ID || '1KIqnUsqvbZJbSLSSfPkY7p8ILKLu-B2k6cy1TlCSbo4'
    };
    
    console.log('Using config:', {
      API_KEY: fallbackConfig.API_KEY ? 'SET' : 'NOT_SET',
      SPREADSHEET_ID: fallbackConfig.SPREADSHEET_ID ? 'SET' : 'NOT_SET'
    });
    
    return fallbackConfig;
    
  } catch (error) {
    console.error('Error getting Script Properties:', error);
    return {
      API_KEY: '11952ad938bbbd1e806c4c0d82379628d54fc9880489815b9ac21a1efdeab110',
      SPREADSHEET_ID: '1KIqnUsqvbZJbSLSSfPkY7p8ILKLu-B2k6cy1TlCSbo4'
    };
  }
}

function doGet(e) {
  try {
    const { API_KEY, SPREADSHEET_ID } = getConfig();
    const params = e.parameter || {};
    const providedKey = params.key;
    
    // Check API key
    if (providedKey !== API_KEY) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (params.action === 'prompts') {
      return getPrompts();
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('doGet error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const { API_KEY, SPREADSHEET_ID } = getConfig();
    const params = e.parameter || {};
    const providedKey = params.key;
    
    // Check API key
    if (providedKey !== API_KEY) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Unauthorized' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse request body
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Invalid JSON' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (data.answers && Array.isArray(data.answers)) {
      return submitAnswers(data.answers);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Invalid request body' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('doPost error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getPrompts() {
  try {
    const { SPREADSHEET_ID } = getConfig();
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Prompts');
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Prompts sheet not found' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get first 4 rows from column A
    const range = sheet.getRange('A1:A4');
    const values = range.getValues();
    const prompts = values.map(row => row[0] || '').filter(prompt => prompt.trim());
    
    if (prompts.length < 4) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          error: `Expected 4 prompts, found ${prompts.length}. Please add prompts to rows 1-4 in the Prompts sheet.` 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ prompts: prompts.slice(0, 4) }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('getPrompts error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function submitAnswers(answers) {
  try {
    const { SPREADSHEET_ID } = getConfig();
    
    if (!Array.isArray(answers) || answers.length !== 4) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Expected 4 answers' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('Responses');
    
    // Create Responses sheet if it doesn't exist
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Responses');
      // Add headers
      sheet.getRange('A1:F1').setValues([['Timestamp', 'Answer 1', 'Answer 2', 'Answer 3', 'Answer 4', 'Source']]);
    }
    
    // Add the response
    const timestamp = new Date().toISOString();
    const row = [timestamp, ...answers, 'venting-machine'];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('submitAnswers error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper function to test the setup
function testSetup() {
  console.log('Testing Venting Machine API setup...');
  
  try {
    const { API_KEY, SPREADSHEET_ID } = getConfig();
    console.log('Config loaded - API_KEY:', API_KEY ? 'Set' : 'Not set');
    console.log('Config loaded - SPREADSHEET_ID:', SPREADSHEET_ID ? 'Set' : 'Not set');
    
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log('✓ Spreadsheet accessible');
    
    // Test prompts
    const promptsSheet = spreadsheet.getSheetByName('Prompts');
    if (promptsSheet) {
      const values = promptsSheet.getRange('A1:A4').getValues();
      const prompts = values.map(row => row[0] || '').filter(p => p.trim());
      console.log(`✓ Found ${prompts.length} prompts:`, prompts);
    } else {
      console.log('⚠ Prompts sheet not found - please create it');
    }
    
    // Test responses sheet
    let responsesSheet = spreadsheet.getSheetByName('Responses');
    if (!responsesSheet) {
      console.log('⚠ Responses sheet not found - will be created on first submission');
    } else {
      console.log('✓ Responses sheet exists');
    }
    
  } catch (error) {
    console.error('✗ Setup test failed:', error);
  }
}
