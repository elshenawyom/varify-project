// ── summary sheet ─────────────────────────────────────────────────────────────

function writeSummarySheet(ss, summaryData) {
  const sheet = recreateSheet(ss, 'Explosion Stats');
  sheet.getRange(1, 1, summaryData.length, 5).setValues(summaryData);
  formatSheetOutput(sheet, 1, 5);
}
