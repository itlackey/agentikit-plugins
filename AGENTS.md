## Extended Searching

You have access to a searchable library of tools, skills, commands, agents,
and knowledge documents via `akm` CLI.

**Finding assets:**
```sh
akm search "<query>"              # Search by keyword
akm search "<query>" --type tool  # Filter by type (tool, skill, command, agent, knowledge, script)
akm search "<query>" --source <source>  # Filter by source (e.g., "local", "registry", "both")
```
Each hit includes an `openRef` you use to retrieve the full asset.

**Using assets:**
```sh
akm show <openRef>                # Get full asset details
```

What you get back depends on the asset type:
- **script** — A `runCmd` you can execute directly
- **skill** — Instructions to follow (read the full content)
- **command** — A prompt template with placeholders to fill in
- **agent** — A system prompt with model and tool hints
- **knowledge** — A reference doc (use `--view toc` or `--view section --heading "..."` to navigate)

Always search the stash first when you need a capability. Prefer existing
assets over writing new code.

Use `akm -h` for more options and details on searching and using assets.
