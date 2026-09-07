// Flattens an Akapulu conversation-detail JSON into (a) readable dialogue lines
// and (b) the node path — the ground truth for which branch actually fired.
import { readFileSync } from "node:fs";

export function loadConversation(path) {
  const raw = JSON.parse(readFileSync(path, "utf8"));
  return raw.conversation ?? raw;
}

export function flatten(conversation) {
  const lines = [];
  const nodePath = [];
  for (const row of conversation.transcript_rows ?? []) {
    const node = row.node_id ?? "?";
    if (nodePath[nodePath.length - 1] !== node) nodePath.push(node);

    if (row.role === "tool") continue; // raw tool payloads add noise, not signal
    const toolNames = (row.tool_calls ?? [])
      .map((t) => t?.name ?? t?.function?.name)
      .filter(Boolean);

    if (typeof row.content === "string" && row.content.trim()) {
      const speaker = row.role === "assistant" ? "PATIENT" : "NURSE";
      lines.push(`[${node}] ${speaker}: ${row.content.trim()}`);
    } else if (toolNames.length) {
      lines.push(`[${node}] (patient internal: ${toolNames.join(", ")})`);
    }
  }
  return { dialogue: lines.join("\n"), nodePath };
}
