// ── entry point ───────────────────────────────────────────────────────────────

function explodeCols() {
  showColumnSelectionDialog({
    validateDomain: true,
    dialogTitle: 'Select columns to explode',
    callbackFn: 'runExplosion',
    buttonText: 'Explode selected ↗'
  });
}