// ── shared utilities ────────────────────────────────────────────────────────────

// Parse semicolon or newline separated values from a cell
function parseMultivalueCell(cellVal) {
  if (!cellVal || cellVal.trim() === '') return [];
  return cellVal.split(/;|\n/).map(v => v.trim()).filter(v => v !== '');
}

// Delete a sheet if it exists, then create a new one with the given name
function recreateSheet(ss, sheetName) {
  const existing = ss.getSheetByName(sheetName);
  if (existing) ss.deleteSheet(existing);
  return ss.insertSheet(sheetName);
}

// Format output sheet: bold headers and resize columns
function formatSheetOutput(sheet, headerRow, numCols) {
  sheet.getRange(headerRow, 1, 1, numCols).setFontWeight('bold');
  sheet.autoResizeColumns(1, numCols);
}
