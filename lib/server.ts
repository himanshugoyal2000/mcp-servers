import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { EMPLOYEES } from "./employees.js";

export function createServer() {
  const server = new McpServer({
    name: "team-directory",
    version: "1.0.0",
  });

  server.tool(
    "lookupEmployee",
    "Look up an employee in the company directory by name. Returns their title, department, contact info, and skills.",
    { name: z.string().describe("Employee name (full or partial, case-insensitive)") },
    async ({ name }) => {
      const matches = EMPLOYEES.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      if (matches.length === 0) {
        return { content: [{ type: "text" as const, text: `No employees found matching "${name}".` }] };
      }

      const formatted = matches
        .map(
          (e) =>
            `**${e.name}** (${e.title})\n` +
            `  Department: ${e.department}\n` +
            `  Email: ${e.email}\n` +
            `  Slack: ${e.slackHandle}\n` +
            `  Location: ${e.location}\n` +
            `  Manager: ${e.manager ?? "None (executive)"}\n` +
            `  Started: ${e.startDate}\n` +
            `  Skills: ${e.skills.join(", ")}`
        )
        .join("\n\n");

      return { content: [{ type: "text" as const, text: formatted }] };
    }
  );

  server.tool(
    "findTeamMembers",
    "Find employees by department, skill, or location. Useful for questions like 'Who works on Kafka?' or 'Who is in the Engineering department?'",
    {
      department: z.string().optional().describe("Department to filter by"),
      skill: z.string().optional().describe("Skill to search for"),
      location: z.string().optional().describe("Location to filter by"),
    },
    async ({ department, skill, location }) => {
      let results = [...EMPLOYEES];

      if (department) {
        results = results.filter((e) =>
          e.department.toLowerCase().includes(department.toLowerCase())
        );
      }
      if (skill) {
        results = results.filter((e) =>
          e.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
        );
      }
      if (location) {
        results = results.filter((e) =>
          e.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (results.length === 0) {
        return { content: [{ type: "text" as const, text: "No matching employees found." }] };
      }

      const formatted = results
        .map((e) => `- **${e.name}** — ${e.title} (${e.department}) — ${e.location}`)
        .join("\n");

      return {
        content: [{ type: "text" as const, text: `Found ${results.length} employees:\n\n${formatted}` }],
      };
    }
  );

  server.tool(
    "getOrgChart",
    "Get the organizational chart showing who reports to whom.",
    {},
    async () => {
      const executives = EMPLOYEES.filter((e) => e.manager === null);
      let chart = "# NovaMart Org Chart\n\n";

      for (const exec of executives) {
        chart += `## ${exec.name} — ${exec.title}\n`;
        const reports = EMPLOYEES.filter((e) => e.manager === exec.name);
        if (reports.length > 0) {
          for (const r of reports) {
            chart += `  └─ ${r.name} — ${r.title}\n`;
            const subReports = EMPLOYEES.filter((e) => e.manager === r.name);
            for (const sr of subReports) {
              chart += `      └─ ${sr.name} — ${sr.title}\n`;
            }
          }
        }
        chart += "\n";
      }

      return { content: [{ type: "text" as const, text: chart }] };
    }
  );

  return server;
}
