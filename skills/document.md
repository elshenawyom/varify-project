# Documentation Skill

Generate a `dirname.md` for every directory in the repo. One doc per directory, named after it. Not one per file.

## Output format

### What this does
One paragraph. Plain English. No function names, no jargon.

### How to use it
Numbered steps from zero.

### How it works
Key functions or stages. Language-agnostic pseudocode if helpful.

### Watch out for
| Condition | What happens | What to do |
|---|---|---|

### How to extend or minimize it
- **To add X**: ...
- **To remove Y**: ...

### Dependencies
Tools, APIs, permissions, env vars.

---

## Rules
- Never skip a section — write "N/A" if it doesn't apply
- One doc covers the whole directory, reference files by name where relevant
- If input is a transcript: extract intent first, then write
- Written for the next person, not the builder
  Some dirs are just verbose e.g. explode/meta. Don't write .md EXTENSIVELY if there is no practical use for a non-developer person.
## Repo structure
```
project/
  project.md        ← root: what the project does + links to each module
  module-a/
    file.gs
    module-a.md
  module-b/
    file.gs
    module-b.md
```

## Prompt template
```
Follow skills/document.md. Document the following directory. Output only the markdown.

Directory: <dirname>
Files:
<paste file contents here>
```

## Before writing

1. List all files in the directory
2. Check if a `dirname.md` already exists
3. If it does — diff the existing doc against current files:
   - Any file not mentioned in the doc → document it
   - Any function/behavior in the doc that no longer exists → remove it
   - If a changelog or git history is available → use it as context
4. If no doc exists → write from scratch

Never assume the existing doc is current. Always verify file list first.