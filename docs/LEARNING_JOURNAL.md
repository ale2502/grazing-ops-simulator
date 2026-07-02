# Learning Journal

This file records durable learning progress for GrazingOps Simulator. It should capture decisions, concepts learned, corrections, and the next small practice task rather than a full chat transcript.

## 2026-07-02 - Phase 1 Data Model

- Focus: Decide the smallest Phase 1 setup and begin the plain-English data model.
- Decisions: Phase 1 should be one polished full-stack TypeScript workflow before real-time updates, simulators, deployment, Docker, auth, or advanced map behavior. The likely structure is `apps/web`, `apps/api`, and later `packages/shared`.
- What I learned: A data model starts as plain English nouns and relationships, not database tables. The six core things are `Farm`, `Paddock`, `Herd`, `Collar`, `GrazingBreak`, and `HerdMoveCommand`.
- Corrections: Counts such as number of paddocks or collars can often be calculated from related records. Collars should focus on simulated device status, such as battery, connection, location freshness, and acknowledgement status, not animal-health details like weight or age. Collars should not connect directly to grazing breaks; herd move commands and acknowledgements sit between them.
- Open questions: The final plain-English model still needs to be rewritten once in a clean six-part format.
- Next practice task: Rewrite the full six-part data model in plain English using the improved relationships.
