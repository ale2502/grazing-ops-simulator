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

## 2026-07-07 - Herd Move Command Lifecycle

- Focus: Turn the herd move command statuses into a clearer lifecycle that can later guide backend validation.
- Decisions: `response_deadline_at` belongs on `HerdMoveCommand` because the whole command has one response window; any related `CommandAcknowledgment` still `pending` after that time becomes `missed`. Phase 1 can dispatch a command immediately after it is scheduled, keeping the simulator simple while still showing acknowledgement and partial-failure behaviour.
- What I learned: A list of status values is not enough; the model also needs allowed transitions so the app knows which state changes are valid. Separating overall command state from per-collar acknowledgement state makes partial success easier to explain.
- Corrections: The arrow-chain lifecycle was replaced with separate transition bullets so it does not imply that `failed` can move to `active`. The response deadline was moved away from individual acknowledgements because the deadline is shared by all collar responses for one command.
- Open questions: Later phases may choose to dispatch shortly before `scheduled_for` instead of immediately after scheduling.
- Next practice task: Sketch the first Phase 1 API endpoints in plain English: get farm overview, create grazing break, schedule herd move command, and get command status summary.

## 2026-07-07 - First Backend TDD Slice

- Focus: Start the backend implementation with one small tested business function instead of jumping straight into Express routes or database queries.
- Decisions: The first slice is `scheduleHerdMove`, placed under `apps/api/src/herd-move`. The first test checks only the smallest useful behaviour: scheduling a herd move returns a command with `status` set to `dispatched`. Vitest is the test runner and `npm test` now runs `vitest run`.
- What I learned: TDD turns a vague requirement into a concrete promise before implementation. The Arrange/Act/Assert structure helps separate setup, the function call, and the expected result. Repository/query functions should be introduced only when the use-case test proves they are needed.
- Corrections: `node_modules` was accidentally committed because `.gitignore` does not remove files already staged or tracked. `git rm -r --cached node_modules` removes the folder from Git tracking while keeping it locally, and `.gitignore` now prevents it from being added again.
- Open questions: The next version of `scheduleHerdMove` still needs fake repository functions so the test can prove one pending acknowledgement is created for each collar in the herd.
- Next practice task: Expand the `scheduleHerdMove` test with fake repositories that return collars and record created command acknowledgements.

## 2026-07-08 - Fake Repositories in Unit Tests

- Focus: Understand why the next `scheduleHerdMove` test needs fake repository functions inside the test.
- Decisions: Keep the first `scheduleHerdMove` test because it proves the separate behaviour that a scheduled herd move returns a `dispatched` command. Add a second test for the new behaviour rather than replacing the first one.
- What I learned: `scheduleHerdMove` is the real function being tested, while functions created inside the test can be fake dependencies. A fake `collarRepository.findByHerdId` controls which collars the test gives to the business function, and a fake `acknowledgmentRepository.createMany` records what the function tried to save without needing a real database.
- Corrections: The word is `collar`, not `colour`, in this project. The fake repository functions are not replacing production code; they are test doubles that let the unit test control the outside world.
- Open questions: The next test still needs clear TypeScript types for the fake repositories and the acknowledgement records.
- Next practice task: Fill in the Arrange section of the second `scheduleHerdMove` test with fake collars, an empty `createdAcknowledgements` array, and fake repository objects before writing the Act or Assert sections.

## 2026-07-12 - Agentic Implementation Working Agreement

- Focus: Update the project working agreement so the coding agent can implement requested work end to end while continuing to teach the developer.
- Decisions: `AGENTS.md` now treats requests to build, change, fix, refactor, configure, test, or document repository work as permission to complete the necessary in-scope steps. The agent should explain its approach, important implementation details, trade-offs, changed files, and verification results. Coaching-only work remains available when explicitly requested.
- What I learned: Agentic coding and learning are compatible when the agent makes its reasoning and verification visible instead of silently producing code. A standing working agreement also avoids repeatedly granting permission for ordinary edits and development commands.
- Corrections: The previous default stopped at hints or planning unless implementation permission was repeated. The new default carries clear implementation requests through coding and testing, while retaining approval boundaries for destructive work, deployment, paid or credentialed services, unclear major product decisions, and commits.
- Open questions: The working agreement can be refined later if a recurring agent behaviour provides too much or too little explanation.
- Next practice task: Choose the next small Phase 1 feature and describe the learning detail you most want explained during its implementation.
