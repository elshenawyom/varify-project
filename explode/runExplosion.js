// ── explosion ─────────────────────────────────────────────────────────────────

function runExplosion(selectedIndices) {
  const { ss, headers, rows } = getSheetData();
  const domainCol = headers.indexOf('Domain');
  const multivalCols = JSON.parse(PropertiesService.getScriptProperties().getProperty('multivalCols'));
  const selected = selectedIndices.map(i => multivalCols[i]);

  const summaryData = [['Column', 'Multivalue cells', 'Before', 'Change', 'After']];

  selected.forEach(col => {
    const newSheet = recreateSheet(ss, col.name);
    const output = [['Domain', col.name]];

    let multivalCellCount = 0;
    let totalValCount = 0;
    let beforeCount = 0;

    rows.forEach(row => {
      const domain = row[domainCol];
      const cellVal = String(row[col.idx]);
      if (!cellVal || cellVal.trim() === '') return;
      beforeCount++;
      const values = parseMultivalueCell(cellVal);
      if (values.length > 1) multivalCellCount++;
      totalValCount += values.length;
      values.forEach(v => output.push([domain, v]));
    });

    newSheet.getRange(1, 1, output.length, 2).setValues(output);
    formatSheetOutput(newSheet, 1, 2);

    const pct = Math.round(multivalCellCount / rows.length * 100);
    summaryData.push([col.name, `${multivalCellCount} (${pct}%)`, beforeCount, totalValCount - beforeCount, totalValCount]);
  });

  writeSummarySheet(ss, summaryData);
}