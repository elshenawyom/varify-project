# BuiltWith to Looker Studio Translator & Automated Documentation

We solve two interconnected problems in Varify.io's production pipeline:

- transforming complex BuiltWith data for analytics, and
- automating technical documentation that is actually comprehensible.

---

# Demo

Watch the demo here:

### * [Varify.io Demo](https://youtu.be/iLhc8p4Palc?si=up49AyIk9gu-9cS0)

### - [Google Sheet: BuiltWith to LookerStudio Translator](https://docs.google.com/spreadsheets/d/1b0OChT8lZ6Bya65SOzH7bXl7NUMtk9H2tZfhvb1T4AM/edit?usp=sharing)

### - [Looker Studio Analytics Dashboard](https://lookerstudio.google.com/reporting/03106cf6-9db8-412e-890f-d410da9131e2)

---

## Problem 1: BuiltWith Data Translation

### The Challenge

[BuiltWith.com](https://builtwith.com) exports technology stack data with multi-value columns (e.g., a single domain using multiple analytics tools, CDNs, or frameworks). These semicolon or newline-separated values create challenges when visualizing data in Google's Looker Studio, which expects normalized, single-value rows.

### The Solution

A **Google Apps Script implementation** that transforms BuiltWith CSV exports into analytics-ready datasets with two transformation modes:

- **Explode Mode**: Splits multi-value columns into separate sheets, creating one row per value (1 domain → N rows)
- **Joined Mode**: Generates a cartesian product table combining all selected multi-value columns

The solution lives in the `/explode` directory and includes:

- Automated multi-value column detection
- Interactive column selection dialogs
- Sheet generation with summary statistics
- Optimized data processing with shared utilities

### Technical Stack

- **Google Apps Script** for sheet manipulation and custom menu UI
- **[CLASP](https://github.com/google/clasp)** for local development, version control, and API authentication
- **V8 runtime** for modern JavaScript features

---

## Problem 2: Automated Documentation

### The Challenge

Keeping technical documentation synchronized with rapidly evolving codebases is time-consuming and error-prone. Documentation often becomes stale, incomplete, or inconsistent as code changes.

### The Solution

An **AI-powered documentation agent** (`rundocs.py`) that automatically:

- Scans each directory in the repository
- Reads all files and existing documentation
- Compares actual code against documented behavior
- Updates documentation using a standardized methodology (defined in `skills/document.md`)
- Ensures every file and function is properly documented

The agent follows strict formatting rules:

- **What this does**: Plain English overview
- **How to use it**: Step-by-step instructions
- **How it works**: Key functions and workflow pseudocode
- **Watch out for**: Common pitfalls in table format
- **How to extend or minimize it**: Modification guidance
- **Dependencies**: Required tools, APIs, and configurations

### The Elegant Part?

Problem 2 solves Problem 1's documentation needs :)

---

## Repository Structure

```
document/
├── README.md                    # This file
├── AGENTS.md                    # Agent behavioral instructions
├── rundocs.py                   # Documentation automation runner
├── explode/                     # BuiltWith translator (Apps Script)
│   ├── main.js                  # Menu setup and data access
│   ├── detectCols.js            # Multi-value column detection
│   ├── dialog.js                # User interface dialogs
│   ├── explodeCols.js           # Explode mode entry point
│   ├── buildJoined.js           # Joined mode entry point
│   ├── runExplosion.js          # Explode execution logic
│   ├── runJoined.js             # Joined table execution (cartesian product)
│   ├── utils.js                 # Shared utilities
│   ├── summarize.js             # Summary statistics generator
│   ├── .clasp.json              # CLASP project configuration
│   ├── appsscript.json          # Apps Script runtime config
│   └── explode.md               # Auto-generated documentation
├── skills/                      # Documentation methodology
│   └── document.md              # Documentation format specification
└── assets/                      # Test data and examples
```

---

## Quick Start

### For BuiltWith Translation

1. Open the [Google Sheets template](https://docs.google.com/spreadsheets/d/1b0OChT8lZ6Bya65SOzH7bXl7NUMtk9H2tZfhvb1T4AM/edit?usp=sharing)
2. Make a copy to your Google Drive
3. Upload your BuiltWith export CSV
4. Click **BuiltWith Tools** → **Explode multivalue columns** (or **Build Joined table**)
5. Select target columns and confirm
6. Review generated sheets and connect to Looker Studio

### For Local Development (Apps Script)

```bash
# Install CLASP
npm install -g @google/clasp

# Login and authenticate
clasp login

# Clone this project
cd explode
clasp pull
```

### For Documentation Automation

```bash
# Run the documentation agent
python rundocs.py
```

The agent will scan all directories and update markdown files automatically.

---
