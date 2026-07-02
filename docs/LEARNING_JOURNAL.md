# Learning Journal

This file records durable learning progress for GrazingOps Simulator. It should capture decisions, concepts learned, corrections, and the next small practice task rather than a full chat transcript.

## 2026-07-02 - Phase 1 Data Model

- Focus: Decide the smallest Phase 1 setup and begin the plain-English data model.
- Decisions: Phase 1 should be one polished full-stack TypeScript workflow before real-time updates, simulators, deployment, Docker, auth, or advanced map behavior. The likely structure is `apps/web`, `apps/api`, and later `packages/shared`.
- What I learned: A data model starts as plain English nouns and relationships, not database tables. The six core things are `Farm`, `Paddock`, `Herd`, `Collar`, `GrazingBreak`, and `HerdMoveCommand`.
- Corrections: Counts such as number of paddocks or collars can often be calculated from related records. Collars should focus on simulated device status, such as battery, connection, location freshness, and acknowledgement status, not animal-health details like weight or age. Collars should not connect directly to grazing breaks; herd move commands and acknowledgements sit between them.
- Open questions: The final plain-English model still needs to be rewritten once in a clean six-part format.
- Next practice task: Rewrite the full six-part data model in plain English using the improved relationships.

## 2026-07-02 - Grazing Breaks and Command Fields

- Focus: Move the data model from entity names toward early database-style fields and relationships.
- Decisions: `docs/DATA_MODEL.md` now drafts `Farm`, `Paddock`, `Herd`, `Collar`, `GrazingBreak`, and `HerdMoveCommand`. Phase 1 can keep `herd_id` on `GrazingBreak` because it keeps the beginner model clear: this planned break is for this herd.
- What I learned: A paddock is the larger farm area, while a grazing break is a smaller planned section inside a paddock for a specific time window. A herd move command is the instruction to move a herd into a planned grazing break at a scheduled time.
- Corrections: Relationship fields such as `farm_id`, `herd_id`, `paddock_id`, and `grazing_break_id` are what turn separate table ideas into a connected model. `last_location_at` is clearer than `last_location` when the field stores a timestamp. Generic `status` fields should eventually list their allowed values.
- Open questions: The model still needs command acknowledgement records, collar event records, and clearer status values for paddocks, grazing breaks, and collars.
- Next practice task: Add a `CommandAcknowledgement` section that explains how each collar responds to a herd move command.
