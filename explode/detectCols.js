// ── detection ────────────────────────────────────────────────────────────────

// returns array of { idx, name, multivalCount, totalValCount } for every col with semicolons or newlines
function detectCols(headers, rows) {
  const cols = [];
  headers.forEach((header, colIdx) => {
    let multivalCount = 0;
    let totalValCount = 0;
    let beforeCount = 0;
    rows.forEach(row => {
      const val = String(row[colIdx]);
      if (!val || val.trim() === '') return;
      beforeCount++;
      const values = parseMultivalueCell(val);
      if (values.length > 1) multivalCount++;
      totalValCount += values.length;
    });
    if (multivalCount > 0) cols.push({ idx: colIdx, name: header, multivalCount, totalValCount, beforeCount, totalRows: rows.length });
  });
  return cols;
}