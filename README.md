# BuiltWith to Looker Studio Translator & Automated Documentation

This repository solves two interconnected problems: transforming complex BuiltWith data for analytics, and automating technical documentation through AI-powered agents.

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

### Live Demo
- **Google Sheets**: [BuiltWith Data Processor](https://docs.google.com/spreadsheets/d/1b0OChT8lZ6Bya65SOzH7bXl7NUMtk9H2tZfhvb1T4AM/edit?usp=sharing)
- **Looker Studio Dashboard**: [Analytics Dashboard](https://lookerstudio.google.com/reporting/03106cf6-9db8-412e-890f-d410da9131e2)

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

### The Meta-Solution
Here's the elegant part: **Problem 2 solves Problem 1's documentation needs**. The automated documentation system generates and maintains the comprehensive guides for the BuiltWith translator (like `/explode/explode.md`), ensuring the Apps Script modules are always properly explained without manual effort.

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

## Key Features

### BuiltWith Translator
- ✅ Automatic multi-value detection (`;` and newline delimiters)
- ✅ Interactive column selection with validation
- ✅ Dual transformation modes (explode + cartesian join)
- ✅ Summary statistics generation
- ✅ Optimized batch processing for large datasets
- ✅ Security-validated callback system

### Documentation System
- ✅ AI-driven content generation (Claude/GPT models)
- ✅ Verification against actual file contents
- ✅ Standardized format across all directories
- ✅ Automatic staleness detection
- ✅ Session-based resumable execution

---

## Use Cases

**Market Research**: Analyze technology adoption across thousands of domains
- "Which companies use both Salesforce and HubSpot?"
- "What CDN providers are most common in e-commerce?"

**Competitive Intelligence**: Track competitor tech stacks over time
- Monitor framework migrations
- Identify platform consolidation trends

**Lead Generation**: Target prospects by technology profile
- Find companies using outdated analytics platforms
- Discover businesses with specific tech combinations

---

## Summary

This repository demonstrates a powerful synergy between code and documentation automation. By building a sophisticated data transformation tool for BuiltWith analytics (Apps Script + Looker Studio), and then leveraging AI agents to maintain its documentation automatically, we create a self-documenting system where the technical explanation is as polished as the code itself.

The BuiltWith translator turns messy, multi-value exports into clean, queryable datasets for data-driven insights. The documentation agent ensures every function, workflow, and edge case is explained clearly for the next developer. Together, they showcase modern development practices: solve real problems with code, then automate the boring stuff with AI.

---

## Contributing

When adding new features or modifying existing code:
1. Follow the existing code structure and naming conventions
2. Run `rundocs.py` to auto-update documentation
3. Test with sample BuiltWith exports in `/assets`
4. Ensure `.clasp.json` credentials are not committed

## License

MIT License - feel free to adapt for your own BuiltWith transformation needs.

---

**Built with ❤️ for data analysts who need cleaner BuiltWith exports and developers who hate writing docs.**
