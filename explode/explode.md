# What this does
This folder contains Apps Script modules that power two sheet workflows: detecting columns with multivalue cells and either splitting them into separate sheets (explode) or joining them into a cartesian product table (joined). The scripts handle data parsing, user dialogs, sheet creation, and summary statistics.

## How to use it
0. Keep all files together in one Apps Script project.
1. Reload the spreadsheet so `onOpen` adds the custom menu.
2. Click `BuiltWith Tools` → `Explode multivalue columns` to split multivalue columns.
3. Or click `BuiltWith Tools` → `Build Joined table` to create a cartesian product table.
4. Select target columns in the dialog and confirm.
5. Review generated sheets (`Explosion Stats` for explode, or `Joined` for joined table).

## How it works
- `main.js`: Adds menu via `onOpen`, provides `getSheetData()` for shared access, and `showColumnSelectionDialog()` for reusable workflows.
- `detectCols.js`: `detectCols()` scans columns and returns multivalue metadata (count, percentage, totals).
- `dialog.js`: `buildDialog()` renders HTML modal with checkboxes, validates callbacks, and handles submit.
- `explodeCols.js`: Entry point `explodeCols()` calls dialog with Domain validation.
- `buildJoined.js`: Entry point `buildJoined()` calls dialog without Domain validation.
- `runExplosion.js`: `runExplosion()` creates one sheet per selected column with one value per row plus stats.
- `runJoined.js`: `runJoined()` computes cartesian product of selected columns and writes to "Joined" sheet.
- `utils.js`: `parseMultivalueCell()` splits by `;` or newline, `recreateSheet()` deletes and creates sheets, `formatSheetOutput()` bolds headers and resizes.
- `summarize.js`: `writeSummarySheet()` creates "Explosion Stats" sheet with summary metrics.
- `.clasp.json` and `appsscript.json`: Metadata for clasp sync and Google Apps Script runtime config.

**Pseudo-flow for Explode:**
1. Read headers and rows
2. Validate Domain column exists
3. Detect multivalue columns
4. Show dialog with checkbox list
5. For each selected column: create sheet, parse multivalue cells, write one row per value
6. Create summary stats sheet

**Pseudo-flow for Build Joined:**
1. Read headers and rows
2. Detect multivalue columns (no Domain validation)
3. Show dialog with checkbox list
4. For each row: extract selected column values, compute cartesian product, write combined rows
5. Write all rows to "Joined" sheet

## Watch out for
| Condition | What happens | What to do |
|---|---|---|
| No `Domain` column exists (Explode) | Dialog never shows; alert stops process | Rename or add a column exactly named `Domain` |
| No multivalue cells found | Dialog never shows; alert stops process | Confirm cells contain `;` or newline separators |
| Invalid callback in dialog.js | `buildDialog()` throws error | Only use 'runExplosion' or 'runJoined' as callbackFn |
| Output sheet already exists | `recreateSheet()` deletes old sheet | Backup old data before running if needed |
| Header row not on row 2, data not on row 3+ | Wrong columns/values detected | Adjust sheet so headers are row 2 and data starts row 3 |
| Empty/null cell in selected column | Parsed as empty array; treated as single empty string | Provide multivalue data or deselect columns with empty cells |
| Very large sheets | Processing and writes may be slow | Run on smaller batches or optimize sheet writes |
| `multivalCols` property missing or corrupted | Callback fails to map indices | Always start from `explodeCols()` or `buildJoined()` menu items |

## How to extend or minimize it
- **To add new delimiters**: Update split regex in `utils.js` `parseMultivalueCell()` function.
- **To change column selection UI**: Modify HTML in `dialog.js` `buildDialog()`.
- **To skip Domain validation for Explode**: Remove `validateDomain: true` from `explodeCols.js` call to `showColumnSelectionDialog()`.
- **To remove Joined workflow**: Delete `buildJoined.js` and `runJoined.js`, remove menu item from `main.js` `onOpen()`.
- **To remove summary stats**: Comment out `writeSummarySheet()` call in `runExplosion.js`.
- **To add post-processing logic**: Insert row-level conditions in `runExplosion.js` or `runJoined.js` before `output.push()`.

## Dependencies
- Google Sheets (`SpreadsheetApp` service)
- Google Apps Script HTML service (`HtmlService`)
- Script Properties API (`PropertiesService`) for storing column metadata during dialog flow
- V8 runtime (configured in `appsscript.json`)
- Browser dialog support (HtmlService modal dialogs)
- Active Google Sheet with proper header layout (row 2 headers, row 3+ data)
