// Vercel serverless function that serves MCP over Streamable HTTP.
//
// Each request is stateless:
//   1. Create a fresh McpServer + StreamableHTTPServerTransport
//   2. Connect them
//   3. Handle the incoming JSON-RPC request
//   4. Transport writes the response and closes
//
// This is the recommended pattern for serverless MCP hosting.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "../lib/server.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    res.status(200).json({
      name: "team-directory",
      version: "1.0.0",
      description: "Team Directory MCP Server — NovaMart employee lookup",
      mcp_endpoint: "/mcp",
      protocol: "MCP over Streamable HTTP",
    });
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST for MCP requests." });
    return;
  }

  try {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    res.on("close", () => {
      transport.close();
      server.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
}
