---
name: agentikit
description: Search and show extension assets from an Agentikit stash directory. Use when the user wants to find tools, skills, commands, agents, or knowledge in their stash, or view asset contents.
---

# Agentikit Stash

You have access to the `akm` CLI (Agentikit Manager) to manage extension assets from a stash directory.

The stash directory is configured via the `AGENTIKIT_STASH_DIR` environment variable and contains:

- **tools/** — executable scripts (.sh, .ts, .js, .ps1, .cmd, .bat)
- **skills/** — skill directories containing SKILL.md
- **commands/** — markdown template files
- **agents/** — markdown agent definition files
- **knowledge/** — markdown knowledge files

## Commands

### Build the search index

Scan stash directories, auto-generate missing `.stash.json` metadata, and build a semantic search index.

```bash
akm index [--full]
```

Use `--full` to force a full reindex instead of incremental. Run this after adding new extensions to enable semantic search ranking.

### Search the stash

Find assets using a hybrid search pipeline: semantic embeddings + TF-IDF ranking. Falls back to name substring matching when no index exists.

```bash
akm search [query] [--type tool|skill|command|agent|knowledge|any] [--limit N]
```

### Show an asset

Retrieve the full content/payload of an asset using its ref from search results.

```bash
akm show <ref>
```

Returns type-specific payloads:
- **skill** → full SKILL.md content
- **command** → markdown template + description
- **agent** → prompt + description, toolPolicy, modelHint
- **tool** → execution command and kind
- **knowledge** → full markdown content (supports view modes: toc, frontmatter, section, lines)

### Configuration

Show or update configuration stored in the stash directory.

```bash
akm config                    # Show current config
akm config --set key=value    # Update a config key
```

Configurable keys: `semanticSearch`, `additionalStashDirs`, `embedding`, `llm`.

## Dependencies

`akm init` will auto-install [ripgrep](https://github.com/BurntSushi/ripgrep) to `stash/bin/` if not already on PATH. Ripgrep is used for fast candidate filtering during search.

## Workflow

1. Initialize: `akm init` (creates stash dirs, installs ripgrep)
2. Build the index: `akm index`
3. Search for assets: `akm search "deploy" --type tool`
4. Inspect a result: `akm show <ref>`

All output is JSON for easy parsing.
