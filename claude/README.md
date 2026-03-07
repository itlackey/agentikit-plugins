# agentikit-claude

Claude Code plugin for the [Agentikit](https://github.com/itlackey/agentikit) CLI. Provides a skill that teaches Claude to **search** and **show** extension assets from a stash directory.

## Installation

Install as a Claude Code plugin:

```sh
claude plugin add agentikit-claude
```

Or load from a local directory:

```sh
claude --plugin-dir ./node_modules/agentikit-claude
```

## What's included

- **Agentikit Skill** — Claude automatically uses the `akm` CLI when you ask about stash assets

The skill teaches Claude the full CLI workflow: `akm init`, `akm index`, `akm search`, and `akm show`.

## Prerequisites

The `akm` CLI must be installed and available on PATH. Install it from the [agentikit repo](https://github.com/itlackey/agentikit).

```sh
# macOS / Linux
curl -fsSL https://raw.githubusercontent.com/itlackey/agentikit/main/install.sh | bash
# PowerShell (Windows)
irm https://raw.githubusercontent.com/itlackey/agentikit/main/install.ps1 -OutFile install.ps1; ./install.ps1
```

## Stash model

Set a stash path via `AGENTIKIT_STASH_DIR`:

```sh
export AGENTIKIT_STASH_DIR=/abs/path/to/your-stash
```

Expected layout:

```
$AGENTIKIT_STASH_DIR/
├── tools/      # executable scripts (.sh, .ts, .js, .ps1, .cmd, .bat)
├── skills/     # skill directories containing SKILL.md
├── commands/   # markdown files
├── agents/     # markdown files
└── knowledge/  # markdown files
```

## Docs

- [Agentikit CLI](https://github.com/itlackey/agentikit)
- [Claude Code Plugins](https://code.claude.com/docs/en/plugins)
- [Claude Code Skills](https://code.claude.com/docs/en/skills)
