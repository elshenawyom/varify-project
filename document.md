# What this does
This folder contains a Google Sheets automation project with automation scripts, documentation guidelines, configuration files, and a runner script. The main automation finds columns with multiple values in one cell, lets users choose which to split or join, then creates output sheets and a summary sheet for review.

## How to use it
0. Read `AGENTS.md` for workflow guidelines.
1. Follow `skills/document.md` when updating or creating new folder documentation.
2. Use `rundocs.py` to batch-run documentation updates: set SESSION_ID, MODEL, and PROMPT as needed, then run to apply documentation changes across the repository.
3. Store Apps Script metadata in `explode/meta/` and the core workflow scripts in `explode/`.
4. For actual sheet operations, see `explode/explode.md`.

## How it works
- `AGENTS.md`: Defines the Copilot agent model and workflow expectations.
- `skills/document.md`: Template and style guide for all folder-level documentation.
- `explode/`: Contains Apps Script modules for column detection, explosion, joining, and sheet generation.
- `explode/meta/`: Stores project metadata (.clasp.json, appsscript.json) for clasp sync and runtime configuration.
- `rundocs.py`: Python runner that invokes the Copilot CLI with a custom prompt to update documentation across the repository in bulk.

## Watch out for
| Condition | What happens | What to do |
|---|---|---|
| Docs out of sync with code | Features are undocumented or misleading | Run `rundocs.py` to refresh all folder documentation |
| SESSION_ID or MODEL in rundocs.py is stale | Copilot agent uses wrong session or model | Update MODELS, MODEL, and SESSION_ID in `rundocs.py` before running |
| AGENTS.md or skills/document.md is modified | New docs may not follow established patterns | Update `rundocs.py` PROMPT if guidelines change, then rerun |
| Apps Script project ID mismatch | Sync targets the wrong Google project | Verify `.clasp.json` in `explode/meta/` before clasp push/pull |

## How to extend or minimize it
- **To add new documentation sections**: Update `skills/document.md` with new required sections, then update `rundocs.py` PROMPT, then run to apply to all directories.
- **To change the agent or model used**: Edit MODELS and MODEL in `rundocs.py`, update SESSION_ID if switching sessions, then rerun.
- **To add a new workflow feature in explode/**: Write the feature code, then add it to `explode/explode.md` in the "How it works" section and the relevant "Watch out for" row.

## Dependencies
- Python 3 (for rundocs.py)
- GitHub Copilot CLI (copilot command)
- Google Apps Script runtime (V8) and Sheets UI (for explode/ scripts)
- clasp (optional, for syncing scripts from explode/ to Google project)
- Active Google Sheet with multivalue cells and proper header layout (for sheet operations).

