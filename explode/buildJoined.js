// ── entry point ───────────────────────────────────────────────────────────────

function buildJoined() {
  showColumnSelectionDialog({
    dialogTitle: 'Build Joined table',
    callbackFn: 'runJoined',
    buttonText: 'Build joined table ↗'
  });
}
