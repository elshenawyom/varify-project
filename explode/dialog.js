// ── dialog ────────────────────────────────────────────────────────────────────

function buildDialog(cols, options = {}) {
  const title = options.title || 'Select columns';
  const callbackFn = options.callback || 'runExplosion';
  const buttonText = options.buttonText || 'Explode selected ↗';

  // Validate callback is allowed to prevent injection attacks
  const ALLOWED_CALLBACKS = ['runExplosion', 'runJoined'];
  if (!ALLOWED_CALLBACKS.includes(callbackFn)) {
    throw new Error(`Invalid callback function: ${callbackFn}`);
  }

  const tableRows = cols.map((c, i) => `
    <tr>
      <td><input type="checkbox" name="col" value="${i}" checked></td>
      <td>${c.name}</td>
      <td style="text-align:right">${c.multivalCount} (${Math.round(c.multivalCount / c.totalRows * 100)}%)</td>
    </tr>
  `).join('');

  const html = `
    <style>
      body { font-family: Arial, sans-serif; font-size: 13px; padding: 12px; margin: 0; }
      table { border-collapse: collapse; width: 100%; }
      th { padding: 6px 10px; text-align: left; color: #666; font-weight: normal; border-bottom: 2px solid #ddd; }
      th:not(:first-child):not(:nth-child(2)) { text-align: right; }
      td { padding: 6px 10px; border-bottom: 1px solid #eee; vertical-align: middle; color: #000; }
      button { margin-top: 16px; padding: 8px 20px; background: #1a73e8; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; }
      button:hover { background: #1557b0; }
    </style>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Column</th>
          <th>Multivalue cells</th>
        </tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>
    <button onclick="submit()">${buttonText}</button>
    <script>
      function submit() {
        const checked = [...document.querySelectorAll('input[name=col]:checked')].map(el => parseInt(el.value));
        if (checked.length === 0) { alert('Select at least one column.'); return; }
        google.script.run.withSuccessHandler(() => google.script.host.close()).${callbackFn}(checked);
      }
    </script>
  `;
  return HtmlService.createHtmlOutput(html).setWidth(520).setHeight(400);
}