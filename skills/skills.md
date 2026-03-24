# What this does
This folder contains reusable instructions that define how documentation should be written for this repository so output stays consistent, practical, and easy for non-builders to follow.

## How to use it
0. Open `document.md` before writing any folder documentation.
1. Follow the required section order exactly.
2. Produce one markdown doc per directory, named after that directory.
3. Write `N/A` for sections that do not apply.
4. Keep low-value or config-only folders concise.

## How it works
- `document.md` acts as a style and structure contract.
- It enforces audience, completeness, and naming conventions.
- It also provides a reusable prompt template for repeated documentation tasks.

## Watch out for
| Condition | What happens | What to do |
|---|---|---|
| A required section is omitted | Output is non-compliant with the skill | Include all sections, even if marked `N/A` |
| File-level docs are created instead of directory docs | Documentation scope becomes inconsistent | Write one doc for the whole folder |
| Overly technical language | Non-developer readers cannot use it well | Keep plain English and practical steps |
| Verbose docs for low-value folders | Maintenance cost rises without benefit | Keep concise when practical value is limited |

## How to extend or minimize it
- **To add new required sections**: Update `skills/document.md` and keep section order explicit.
- **To remove strictness for simple repos**: Relax rules in `skills/document.md` while keeping core structure.

## Dependencies
No runtime dependency; requires a writer/agent that can read folder contents and produce markdown in the defined format.
