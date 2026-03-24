function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('BuiltWith Tools')
    .addItem('Explode multivalue columns', 'explodeCols')
    .addItem('Build Joined table', 'buildJoined')
    .addToUi();
}

// ── data access ──────────────────────────────────────────────────────────────

function getSheetData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = ss.getActiveSheet().getDataRange().getValues();
  return { ss, headers: data[1], rows: data.slice(2) };
}

// ── entry point helper ───────────────────────────────────────────────────────

// Shared logic for workflows that need column selection dialog
function showColumnSelectionDialog(options = {}) {
  const { headers, rows } = getSheetData();

  // Optional domain column validation
  if (options.validateDomain) {
    if (headers.indexOf('Domain') === -1) {
      SpreadsheetApp.getUi().alert('No "Domain" column found. Make sure your sheet has a Domain column.');
      return;
    }
  }

  const multivalCols = detectCols(headers, rows);
  if (multivalCols.length === 0) {
    SpreadsheetApp.getUi().alert('No multivalue columns detected.');
    return;
  }

  // Store for later callback access
  PropertiesService.getScriptProperties().setProperty('multivalCols', JSON.stringify(multivalCols));

  const dialog = buildDialog(multivalCols, {
    title: options.dialogTitle,
    callback: options.callbackFn,
    buttonText: options.buttonText
  });
  SpreadsheetApp.getUi().showModalDialog(dialog, options.dialogTitle);
}