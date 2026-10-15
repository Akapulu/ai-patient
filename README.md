**Deprecated.** This repository is not maintained. The current public example is [akapulu-examples](https://github.com/Akapulu/akapulu-examples).

# AI Patient That Grades You

Build an AI patient with a hidden red flag. Miss it and the patient deteriorates
mid-call. Catch it and they stabilize. Either way, Claude reads the transcript
afterward and hands you a graded report card.

🎥 Video: (coming) · 🗣️ Talk to the patient: (coming)

> ⚠️ **Read this before step 1 (free tier):** Akapulu's free tier is **10 credits for
> the LIFE of the account** — not monthly. Live calls cost 1 credit/minute, capped at
> 3 minutes. Text test-mode runs cost 0.25. This repo is structured so you tune
> everything in test mode and go live exactly once. You also need an **Anthropic API
> key** for the scorer (separate signup, not free).

## What's in here

```
knowledge-base/Case-File.md   the patient (upload this as your Akapulu knowledge base)
rubric/Grading-Rubric.md      what the scorer grades against (stays in the repo — see note)
scenario.json                 paste into the Akapulu scenario editor (JSON toggle)
scorer/                       transcript → Claude → report card (npm install, then: npm run score)
.env.example                  copy to .env  (cp .env.example .env — NOT .env.local)
```

**Why the rubric ships separately from the knowledge base:** the KB grounds the
*patient* during the call; the API never returns KB content, so the *scorer* reads the
rubric from this repo. Two artifacts, on purpose.

## Run order (credit-safe — follow it in order)

1. Create the knowledge base, upload `Case-File.md`, wait for **Completed** (refresh the page)
2. Build the scenario (paste `scenario.json`, fill in your KB id everywhere it appears (3 places))
3. Tune the fork in **LLM test mode only** (0.25 credits/run)
4. Prove the scorer against `scorer/sample-transcript.json` (0 credits)
5. Mint the hosted link: **Record Conversation ON** + set a **Redirect URL** + click
   **Re-detect** on runtime variables
6. ONE live call. Hang up once the fork fires (~2 minutes)
7. Feed the real transcript to the scorer

This is a fictional training case — an educational demo, not medical guidance.
