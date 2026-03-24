import subprocess

# ── config ────────────────────────────────────────────────────────────────────

MODELS = {
    "mini":   "gpt-5-mini",
    "fast":   "claude-haiku-4.5",
    "smart":  "claude-sonnet-4-6",
    "best":   "claude-opus-4-6",
    "codex":  "gpt-5.3-codex",
    "gemini": "gemini-3-pro",
}

MODEL = MODELS["fast"]
SESSION_ID = "30ad8ec1-1710-4ed4-9eac-4dc978efddbf"

ALLOW_ALL_PATHS = True
ALLOW_ALL_URLS  = True

PROMPT = (
    """
    - Always follow AGENTS.md
    - Apply the instructions in skills/document.md
    - For every directory: list ALL files, then read EACH file, then read the existing dirname.md
    - Compare file contents against the doc line by line
    - If any file is not documented or any function is missing from the doc → update it with document.md methodology
    - Do not trust the existing doc — verify it against actual file contents
    """
)


# ── build cmd ─────────────────────────────────────────────────────────────────

cmd = ["copilot", "--yolo", "--model", MODEL, "--resume", SESSION_ID]

if ALLOW_ALL_PATHS:
    cmd.append("--allow-all-paths")

if ALLOW_ALL_URLS:
    cmd.append("--allow-all-urls")

cmd += ["-p", PROMPT]

# ── run ───────────────────────────────────────────────────────────────────────

print(f"model: {MODEL}")
print(f"cmd:   {' '.join(cmd)}\n")

subprocess.run(cmd)