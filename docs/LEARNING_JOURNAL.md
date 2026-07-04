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

## 2026-07-03 - Command Acknowledgements and Status Lifecycles

- Focus: Clarify the data model around per-collar command responses and lifecycle status values.
- Decisions: `docs/DATA_MODEL.md` now includes `CommandAcknowledgment` to track how one collar responds to one herd move command. Paddock status values are `available`, `in_use`, and `regrowing`; collar connection status is `online` or `offline`; grazing break status values are `draft`, `scheduled`, `active`, `completed`, and `cancelled`.
- What I learned: `HerdMoveCommand.status` is the overall summary for the herd move, while `CommandAcknowledgment.status` stores the per-collar detail that lets the app explain partial success. A grazing break can be a `draft` when the manager is still planning the shape and timing but has not confirmed it.
- Corrections: `delayed` was removed from command acknowledgement status because delay can be inferred while an acknowledgement is still `pending`. Paddock status describes the land right now, while grazing break status describes the plan over time.
- Open questions: The model still needs collar event records and possibly clearer definitions for command status transitions.
- Next practice task: Add a `CollarEvent` section that describes simulated collar messages such as location updates, battery updates, connection changes, and command acknowledgement events.

## 2026-07-04 - Collar Events and Command State Meaning

- Focus: Add the `CollarEvent` idea and clarify status values for herd move commands and per-collar acknowledgements.
- Decisions: A `CollarEvent` represents one simulated message from a collar. Its `type` says what kind of message arrived, while `payload` holds details that differ by event type, such as location, battery percentage, or failure reason. `herd_move_command_id` is optional because only command-related events need to point to a specific move command.
- What I learned: A status field contains one allowed value at a time; the `|` list means "one of these values", not all of them together. `HerdMoveCommand.status` describes the overall herd move, while `CommandAcknowledgment.status` describes one collar's response to that command.
- Corrections: `active` should mean the scheduled move time has arrived and the move is happening, not necessarily that every collar received the command. `failed` on `HerdMoveCommand` describes the whole command, while `failed` on `CommandAcknowledgment` describes one collar response. `missed` means no collar response arrived before the response deadline.
- Open questions: The next design step is to decide which command status transitions are allowed and what rule moves a command from one status to another.
- Next practice task: Draw or write the allowed `HerdMoveCommand.status` transitions in plain English, including what happens when all, some, or no collars acknowledge before the response deadline.
