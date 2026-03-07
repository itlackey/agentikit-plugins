import { type Plugin, tool } from "@opencode-ai/plugin"
import { execFileSync } from "node:child_process"

function runCli(args: string[]): string {
  try {
    return execFileSync("akm", args, {
      encoding: "utf8",
      timeout: 60_000,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    return JSON.stringify({ ok: false, error: message })
  }
}

export const AgentikitPlugin: Plugin = async ({ directory }) => ({
  tool: {
    agentikit_search: tool({
      description: "Search the Agentikit stash for tools, skills, commands, agents, and knowledge.",
      args: {
        query: tool.schema.string().describe("Case-insensitive substring search."),
        type: tool.schema
          .enum(["tool", "skill", "command", "agent", "knowledge", "any"])
          .optional()
          .describe("Optional type filter. Defaults to 'any'."),
        limit: tool.schema.number().optional().describe("Maximum number of hits to return. Defaults to 20."),
      },
      async execute({ query, type, limit }) {
        const args = ["search", query]
        if (type) args.push("--type", type)
        if (limit) args.push("--limit", String(limit))
        return runCli(args)
      },
    }),
    agentikit_show: tool({
      description: "Show a stash asset by ref. For knowledge assets, use view_mode to retrieve specific content (toc, section, lines, frontmatter).",
      args: {
        ref: tool.schema.string().describe("Asset reference returned by agentikit_search."),
        view_mode: tool.schema
          .enum(["full", "toc", "frontmatter", "section", "lines"])
          .optional()
          .describe("View mode for knowledge assets. Defaults to 'full'. Ignored for other types."),
        heading: tool.schema.string().optional()
          .describe("Section heading to extract (required when view_mode is 'section')."),
        start_line: tool.schema.number().optional()
          .describe("Start line number, 1-based (for view_mode 'lines')."),
        end_line: tool.schema.number().optional()
          .describe("End line number, 1-based inclusive (for view_mode 'lines')."),
      },
      async execute({ ref, view_mode, heading, start_line, end_line }) {
        const args = ["show", ref]
        if (view_mode) args.push("--view", view_mode)
        if (heading) args.push("--heading", heading)
        if (start_line != null) args.push("--start", String(start_line))
        if (end_line != null) args.push("--end", String(end_line))
        return runCli(args)
      },
    }),
    agentikit_index: tool({
      description: "Build or rebuild the Agentikit search index. Scans stash directories, generates missing .stash.json metadata, and builds a semantic search index.",
      args: {},
      async execute() {
        return runCli(["index"])
      },
    }),
  },
})
