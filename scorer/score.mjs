// The grader: transcript in → Claude reads it against the rubric → report card out.
// Usage:  node scorer/score.mjs [path-to-conversation.json]   (default: scorer/sample-transcript.json)
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { readFileSync } from "node:fs";
import { loadConversation, flatten } from "./transcript.mjs";

const ReportCard = z.object({
  criteria: z.array(
    z.object({
      criterion: z.string(),
      verdict: z.enum(["met", "partial", "missed"]),
      evidence_quote: z.string(),
      points: z.number(),
    })
  ),
  total: z.number(),
  branch: z.enum(["caught", "missed"]),
  coaching: z.string(),
});

const path = process.argv[2] ?? new URL("./sample-transcript.json", import.meta.url).pathname;
const conversation = loadConversation(path);
const { dialogue, nodePath } = flatten(conversation);
const rubric = readFileSync(new URL("../rubric/Grading-Rubric.md", import.meta.url), "utf8");

const client = new Anthropic();

const response = await client.beta.messages.parse({
  model: "claude-opus-5",
  max_tokens: 16000,
  betas: ["server-side-fallback-2026-07-01"],
  fallbacks: "default",
  system: [
    "You grade a nursing student's bedside conversation with a simulated patient.",
    "The PATIENT is Morgan Chen. The NURSE is the learner being graded - address the coaching directly to the learner as you, never by name.",
    "Grade strictly against the rubric below. Quote the transcript for every criterion — evidence, not vibes.",
    "GROUND TRUTH: the node path in square brackets is authoritative for what actually happened.",
    "A path containing 'stabilized' reached via explicit escalation means the red flag was caught;",
    "'deteriorated' means it was missed. The nurse's words decide the other criteria.",
    "",
    rubric,
  ].join("\n"),
  messages: [
    {
      role: "user",
      content: `Node path: ${nodePath.join(" -> ")}\n\nTranscript:\n${dialogue}`,
    },
  ],
  output_config: { format: zodOutputFormat(ReportCard) },
});

const card = response.parsed_output;
if (!card) {
  console.error("Grader returned no parseable card. stop_reason:", response.stop_reason);
  process.exit(1);
}

const mark = { met: "✅", partial: "🟡", missed: "❌" };
console.log("\n═══════════ BEDSIDE REPORT CARD ═══════════\n");
console.log(`Red flag: ${card.branch === "caught" ? "CAUGHT — patient stabilized" : "MISSED — patient deteriorated"}\n`);
for (const c of card.criteria) {
  console.log(`${mark[c.verdict]} ${c.criterion} — ${c.points}/20`);
  console.log(`   "${c.evidence_quote}"\n`);
}
console.log(`TOTAL: ${card.total}/100\n`);
console.log(`Coach's note: ${card.coaching}\n`);
