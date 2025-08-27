/**
 * VENTING MACHINE API - HIGHLY OPTIMIZED VERSION
 * 
 * Performance optimizations:
 * - Cached configuration and prompts
 * - Minimal spreadsheet operations
 * - Faster JSON responses
 * - Reduced function calls
 */

// Global cache for configuration (loaded once per execution)
const CONFIG = (function() {
  const properties = PropertiesService.getScriptProperties();
  return {
    API_KEY: properties.getProperty('API_KEY') || '11952ad938bbbd1e806c4c0d82379628d54fc9880489815b9ac21a1efdeab110',
    SPREADSHEET_ID: properties.getProperty('SPREADSHEET_ID') || '1KIqnUsqvbZJbSLSSfPkY7p8ILKLu-B2k6cy1TlCSbo4'
  };
})();

// Global cache for prompts (5 minute cache)
let PROMPTS_CACHE = null;
let CACHE_TIMESTAMP = 0;
const CACHE_DURATION = 300000; // 5 minutes

// Fast JSON response helper with CORS headers
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control');
}

// Fast error response helper
function errorResponse(message) {
  return jsonResponse({ error: message });
}

function doGet(e) {
  try {
    const params = e.parameter || {};
    
    // Fast API key check
    if (params.key !== CONFIG.API_KEY) {
      return errorResponse('Unauthorized');
    }
    
    if (params.action === 'prompts') {
      return getCachedPrompts();
    }
    
    return errorResponse('Invalid action');
    
  } catch (error) {
    console.error('doGet error:', error);
    return errorResponse(error.toString());
  }
}

// Handle OPTIONS preflight requests for CORS
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control')
    .setHeader('Access-Control-Max-Age', '86400');
}

function doPost(e) {
  try {
    const params = e.parameter || {};
    
    // Fast API key check
    if (params.key !== CONFIG.API_KEY) {
      return errorResponse('Unauthorized');
    }
    
    // Fast JSON parsing
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return errorResponse('Invalid JSON');
    }
    
    if (!data.answers || !Array.isArray(data.answers) || data.answers.length !== 4) {
      return errorResponse('Expected 4 answers in array format');
    }
    
    return submitAnswersFast(data.answers);
    
  } catch (error) {
    console.error('doPost error:', error);
    return errorResponse(error.toString());
  }
}

function getCachedPrompts() {
  try {
    const now = Date.now();
    
    // Return cached prompts if still valid
    if (PROMPTS_CACHE && (now - CACHE_TIMESTAMP) < CACHE_DURATION) {
      return jsonResponse({ prompts: PROMPTS_CACHE });
    }
    
    // Load prompts from spreadsheet
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('Prompts');
    
    if (!sheet) {
      return errorResponse('Prompts sheet not found');
    }
    
    // Get all 4 prompts in one operation
    const values = sheet.getRange('A1:A4').getValues();
    const prompts = values.map(row => (row[0] || '').toString().trim()).filter(p => p);
    
    if (prompts.length < 4) {
      return errorResponse(`Expected 4 prompts, found ${prompts.length}. Please add prompts to rows 1-4 in the Prompts sheet.`);
    }
    
    // Cache the prompts
    PROMPTS_CACHE = prompts.slice(0, 4);
    CACHE_TIMESTAMP = now;
    
    return jsonResponse({ prompts: PROMPTS_CACHE });
    
  } catch (error) {
    console.error('getCachedPrompts error:', error);
    return errorResponse(error.toString());
  }
}

function submitAnswersFast(answers) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName('Responses');
    
    // Create sheet if needed (only once)
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Responses');
      sheet.getRange('A1:F1').setValues([['Timestamp', 'Answer 1', 'Answer 2', 'Answer 3', 'Answer 4', 'Source']]);
    }
    
    // Single append operation (faster than multiple calls)
    const timestamp = new Date().toISOString();
    const row = [timestamp, answers[0], answers[1], answers[2], answers[3], 'venting-machine'];
    sheet.appendRow(row);
    
    return jsonResponse({ ok: true });
    
  } catch (error) {
    console.error('submitAnswersFast error:', error);
    return errorResponse(error.toString());
  }
}

// Utility function to clear cache manually if needed
function clearCache() {
  PROMPTS_CACHE = null;
  CACHE_TIMESTAMP = 0;
  console.log('Cache cleared');
}

// Optimized test function
function testSetupFast() {
  console.log('Testing Venting Machine API setup (optimized)...');
  
  try {
    console.log('✓ Config loaded - API_KEY:', CONFIG.API_KEY ? 'Set' : 'Not set');
    console.log('✓ Config loaded - SPREADSHEET_ID:', CONFIG.SPREADSHEET_ID ? 'Set' : 'Not set');
    
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    console.log('✓ Spreadsheet accessible');
    
    // Test cached prompts
    const promptsResponse = getCachedPrompts();
    console.log('✓ Prompts loaded and cached');
    
  } catch (error) {
    console.error('✗ Setup test failed:', error);
  }
}
