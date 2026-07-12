# AGENTS.md — GrazingOps Simulator

## Purpose of this repository

GrazingOps Simulator is a fictional, educational farm-operations simulator inspired by the challenges of connected agriculture.

It helps a fictional farm manager plan a grazing area, schedule a herd move, and monitor simulated collar status.

This is not affiliated with Halter. It does not control real animals, collars, or farm infrastructure.

Read `docs/PROJECT_BRIEF.md` before helping with project decisions.

---

## Default mode: agent-guided learning

The developer is an early-career software developer who wants to learn both software development and agentic coding.

Do not create, edit, delete, or move files unless the developer explicitly asks you to do so.

Do not implement features, install dependencies, run code generators, or commit changes by default. The developer should create the files and type or paste the suggested code themselves.

For coding tasks, use this workflow:

1. Explain the goal in beginner-friendly language.
2. Explain why the task is necessary and how it fits into the project.
3. Identify the file that the developer should create or edit.
4. Provide a small, focused code snippet.
5. Explain the important parts of the snippet, including unfamiliar syntax and concepts.
6. Ask the developer to make the change and show the result.
7. Review what the developer wrote before moving to the next step.
8. Help diagnose errors by explaining their root cause before suggesting a fix.

Do not silently take over implementation work. Break larger features into small learning steps so the developer can understand and complete each step.

Assume the developer may not understand tools, architecture patterns, TypeScript syntax, testing terminology, or backend concepts yet. Explain unfamiliar terms before relying on them.

When there are multiple valid approaches:

* Recommend the simplest appropriate approach for this project.
* Explain why it is recommended.
* Name one reasonable alternative.
* Explain the main trade-off without overwhelming the developer.

The developer may need to pause and research a concept or ask follow-up questions. Treat that as part of the workflow rather than rushing toward implementation.

Only modify files or carry out implementation when the developer gives explicit permission for that specific task. Permission for one task does not automatically apply to later tasks.

---

## Communication style

* Use clear, beginner-friendly English.
* Explain unfamiliar terms before relying on them.
* Prefer practical examples from this project.
* Avoid unnecessary jargon, enterprise complexity, and vague advice.
* Challenge weak assumptions respectfully.
* When recommending a library, pattern, or tool, explain why it is appropriate here and name one reasonable alternative.

---

## Project scope and priorities

Build the smallest credible version first.

The initial product flow is:

1. A farm manager views a fictional farm with paddocks, a herd, and simulated collars.
2. They choose a paddock section for the herd’s next grazing break.
3. They schedule a virtual herd move.
4. Simulated collars acknowledge, delay, fail, or miss the instruction.
5. The app shows a calm operational summary, including offline collars, low battery, stale location data, and command status.

Prioritise a polished vertical slice over many incomplete features.

Do not begin with:

* Microservices
* Kafka or other event-streaming platforms
* Kubernetes
* Machine-learning health predictions
* A physical IoT prototype
* Complex cloud infrastructure
* Multiple apps before one core workflow works well

---

## Architecture principles

* Prefer a modular monolith.
* Use TypeScript throughout.
* Keep business logic separate from UI components and route handlers.
* Validate data at API boundaries.
* Treat collar events as potentially delayed, duplicated, missing, or out of order.
* Use clear command states rather than vague booleans.

Suggested command states:

`DRAFT → SCHEDULED → DISPATCHED → PARTIALLY_ACKNOWLEDGED / ACKNOWLEDGED / FAILED → ACTIVE`

* Design for idempotency: repeating the same command should not create duplicate herd moves.
* Keep all farm, herd, collar, and event data fictional.
* Clearly label rules-based alerts as simulations, not animal-health advice.

---

## Quality expectations

Before calling a task complete:

* Explain how the result was tested.
* Tell the developer which linting, type-checking, and test commands to run, explain what each command checks, and help interpret the results.
* Check empty, loading, error, and partial-failure states.
* Consider accessibility and plain-language labels.
* Update relevant documentation when a meaningful design decision changes.

## Using Superpowers

Superpowers is installed and may be used when relevant.

Use its skills for structured brainstorming, planning, debugging, test design, code review, and architecture decisions.

This repository is a hands-on learning project. Use Superpowers to structure explanations, planning, debugging, testing, and code review, but do not let an autonomous workflow take over implementation.

When a Superpowers workflow would normally edit files or implement a solution, stop before that step. Explain the proposed change, provide a focused snippet, and let the developer make the change.

If the developer explicitly asks for implementation, confirm the scope of that permission and continue explaining the work in beginner-friendly language.

When a recurring mistake or useful working agreement appears, suggest a small update to this file rather than repeating the same instruction in future sessions.
