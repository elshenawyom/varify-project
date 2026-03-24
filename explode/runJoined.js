// ── cartesian join ──────────────────────────────────────────────────────────────

function runJoined(selectedIndices) {
  const { ss, headers, rows } = getSheetData();
  const multivalCols = JSON.parse(PropertiesService.getScriptProperties().getProperty('multivalCols'));
  const selected = selectedIndices.map(i => multivalCols[i]);

  const newSheet = recreateSheet(ss, 'Joined');

  // Output starts with headers
  const output = [headers];

  rows.forEach(row => {
    // Extract values for selected multivalue columns
    // If a column is empty, treat it as a single empty string value
    const selectedValues = selected.map(col => {
      const values = parseMultivalueCell(String(row[col.idx]));
      return values.length === 0 ? [''] : values;
    });

    // Compute cartesian product of selected column values
    const combinations = cartesianProduct(selectedValues);

    // For each combination, generate an output row
    combinations.forEach(combo => {
      const outputRow = row.slice();
      combo.forEach((val, i) => {
        outputRow[selected[i].idx] = val;
      });
      output.push(outputRow);
    });
  });

  // Write to sheet
  newSheet.getRange(1, 1, output.length, headers.length).setValues(output);
  formatSheetOutput(newSheet, 1, headers.length);
}

// Helper: compute cartesian product of arrays
function cartesianProduct(arrays) {
  // Build result by combining arrays
  return arrays.reduce((acc, current) => {
    const newAcc = [];
    acc.forEach(combo => {
      current.forEach(val => {
        newAcc.push([...combo, val]);
      });
    });
    return newAcc;
  }, [[]]);
}
