# PROJECT_BRIEF.md — GrazingOps Simulator

## Project summary

GrazingOps Simulator is a fictional farm-operations app.

It simulates one important connected-farming workflow:

> A farm manager plans where a herd should graze next, schedules a move, and checks whether simulated collars successfully received the instruction.

The project is designed to demonstrate product thinking, frontend development, backend development, databases, real-time events, reliability, and clear user experience.

It is an educational portfolio project inspired by challenges in connected agriculture. It is not a copy of any real company’s product.

---

## Simple domain definitions

**Grazing**
When cattle eat grass from a field.

**Paddock**
A fenced or defined section of farmland where cattle can graze.

**Herd or mob**
A group of cattle managed together.

**Grazing break**
A specific section of pasture allocated to a herd for a period of time.

**Virtual boundary**
A digital boundary shown on a map rather than a physical fence.

**Collar**
A fictional solar-powered device attached to each cow in this simulator. It sends location, battery, connectivity, and movement data.

---

## Primary user

A farm manager who needs a simple answer to questions such as:

* Where should this herd graze next?
* Has the move been sent successfully?
* Which collars are offline or low on battery?
* Are there any issues that need attention?

The user should not need to understand APIs, device queues, or database events. The app should turn complex technical information into a calm operational summary.

---

## First demo scenario

The farm manager opens the app and sees:

* A fictional farm map
* Three paddocks
* One herd with 20 simulated collars
* Current collar connection and battery status

They then:

1. Choose a paddock area for tomorrow’s grazing break.
2. Schedule a herd move for 6:00 AM.
3. See the command move through its status stages.
4. See that some collars acknowledged, some are offline, and one has low battery.
5. Read a clear summary:

> “17 of 20 collars have acknowledged the scheduled move. Two collars are offline and will retry when they reconnect. One collar has low battery.”

---

## Suggested technical direction

Start web-first so the first version stays achievable.

### Phase 1: Core workflow

* React + TypeScript frontend
* Node.js + TypeScript backend
* Express API
* PostgreSQL database
* Fictional seeded farm data
* Basic map or paddock layout
* Herd-move command creation
* Command-status screen

### Phase 2: Reliability and simulations

* Collar event simulator
* Battery, connectivity, and location updates
* Delayed and failed acknowledgements
* Activity timeline
* Alert rules for offline, stale, and low-battery collars
* Tests for command state transitions and duplicate prevention

### Phase 3: Advanced portfolio features

* Real-time updates with WebSockets or Server-Sent Events
* Offline queue for scheduled moves
* Local caching
* Geospatial boundary checks
* Better map interactions
* React Native companion app
* Observability dashboard for event delays and failed commands

---

## Technical principles

* Build a modular monolith before considering separate services.
* Keep components small and focused.
* Keep database logic separate from HTTP route handlers.
* Use realistic failure states, not only happy paths.
* Prefer clear naming over clever abstractions.
* Write tests for business-critical logic.
* Document meaningful architecture decisions.

---

## Important simulated behaviours

Each fictional collar can:

* Be online or offline
* Have a battery percentage
* Send a location update
* Acknowledge a herd-move command
* Acknowledge late
* Fail to acknowledge
* Send stale data
* Trigger a simple rules-based alert

The simulator must make it clear that data is fictional and alerts are not veterinary advice.

---

## Out of scope

Do not build:

* Real animal tracking
* Real virtual-fence control
* Animal-health diagnosis
* Hardware integrations
* Machine-learning models in the first version
* A generic dashboard full of charts with no workflow
* A direct visual copy of an existing farm-tech product

---

## Portfolio goal

This project should demonstrate that the developer can:

* Translate a real operational problem into a usable product flow
* Build and explain a full-stack system
* Think about unreliable devices, partial failures, and retries
* Make practical architecture decisions
* Write understandable, tested TypeScript
* Use AI as a development partner while retaining ownership of technical decisions