# Grading Rubric — Bedside Assessment (Morgan Chen case)

> Used by the post-call scorer. Each criterion is scored met / partial / missed with an
> evidence quote from the transcript. 20 points each, 100 total.

## 1. Introduction & identification (20)

Did the nurse introduce themselves by name and role, AND verify the patient with two
identifiers (full name + date of birth)? Met = both. Partial = one. Missed = walked in
and started talking.

## 2. Focused pain assessment (20)

Did the nurse assess the chest symptom properly — location, quality (sharp? dull?),
severity 0–10, what makes it better or worse (especially breathing), and when it
started? Met = 4+ dimensions. Partial = 2–3. Missed = accepted "a little tightness"
without follow-up.

## 3. Caught the red flag cluster (20) — the big one

Did the nurse connect: new pleuritic chest pain + racing heart + one-sided calf
swelling + post-op day 2 + missed blood-thinner dose? Met = identified the risk
(named a possible clot OR treated it as urgent) after uncovering at least three of the
five elements. Partial = uncovered elements but did not connect or act. Missed =
reassured the patient and moved on.

## 4. Escalation & safety (20)

Did the nurse take the right action — full vitals now, keep the patient in bed, notify
the provider/rapid response, NOT dismiss as anxiety? Met = clear escalation stated to
the patient. Partial = "I'll mention it to the doctor later." Missed = no action.

## 5. Communication & closing the loop (20)

Warmth and honesty without false reassurance: did the nurse acknowledge the patient's
worry, explain what happens next in plain language, and confirm the patient understood?
Met = all three. Partial = kind but vague. Missed = cold, jargon, or left the patient
in the dark.

## Scoring notes for the AI grader

- Quote the transcript for every criterion — evidence, not vibes.
- The transcript's node path is ground truth for whether the patient deteriorated
  (missed) or stabilized (caught). Criterion 3 cannot score "met" on the
  deterioration branch unless the nurse caught it too late but correctly.
- End with one coaching paragraph: the single most important thing to do differently,
  written to the learner, kind and direct.
