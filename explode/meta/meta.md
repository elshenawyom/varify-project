# What this does
This folder stores Apps Script project metadata used for deployment and runtime settings. It tells tooling how to sync files and tells Apps Script which runtime and logging behavior to use.

## How to use it
0. Keep these files in the project metadata location expected by your tooling.
1. Use `.clasp.json` when pushing/pulling script files with clasp.
2. Use `appsscript.json` to control runtime settings in Apps Script.
3. Update IDs and settings carefully before sharing or deploying.

## How it works
- `.clasp.json` defines the script project ID and file sync behavior.
- `appsscript.json` defines runtime/environment config (timezone, logging, runtime version).
- Tooling reads these files; app logic does not execute from this folder.

## Watch out for
| Condition | What happens | What to do |
|---|---|---|
| Wrong `scriptId` in `.clasp.json` | You sync to the wrong Apps Script project | Verify project ID before any push/pull |
| Invalid manifest JSON | Deployment/runtime config can break | Validate JSON before saving |
| Runtime version mismatch | Behavior can differ from expected execution model | Keep `runtimeVersion` aligned with code assumptions |
| Sensitive IDs shared publicly | Others may target your script project | Avoid exposing project metadata in public contexts |

## How to extend or minimize it
- **To add manifest capabilities**: Extend `appsscript.json` with required scopes/settings.
- **To remove clasp usage**: Remove `.clasp.json` and manage files directly in the Apps Script editor.

## Dependencies
Google Apps Script platform, optional clasp CLI for sync, permission to access the configured script project.
