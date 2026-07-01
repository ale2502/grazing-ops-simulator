# PROJECT_BRIEF.md — GrazingOps Simulator

## Project summary

GrazingOps Simulator is a fictional farm-operations web application.

It simulates one important connected-farming workflow:

> A farm manager plans where a herd should graze next, schedules a move, and checks whether simulated collars successfully received the instruction.

The project is designed to demonstrate product thinking, frontend development, backend development, databases, real-time events, reliability, and clear user experience.

It is an educational portfolio project inspired by challenges in connected agriculture. It is not affiliated with Halter and does not copy, control, or connect to any real farm, animal, collar, or infrastructure.

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

The primary user is a farm manager who needs simple answers to questions such as:

* Where should this herd graze next?
* Has the herd move been sent successfully?
* Which collars are offline or low on battery?
* Are there any issues requiring attention?

The user should not need to understand APIs, device queues, database events, or network failures. The app should turn complex technical information into a calm operational summary.

---

## First demo scenario

The farm manager opens the app and sees:

* A fictional farm map or paddock layout.
* Three fictional paddocks.
* One herd with 20 simulated collars.
* Current collar connection and battery status.

They then:

1. Choose a paddock area for tomorrow’s grazing break.
2. Schedule a herd move for 6:00 AM.
3. See the command move through its status stages.
4. See that some collars acknowledged, some are offline, and one has low battery.
5. Read a clear summary:

> “17 of 20 collars have acknowledged the scheduled move. Two collars are offline and will retry when they reconnect. One collar has low battery.”

---

## Build phases

### Phase 1: Core workflow

Build one complete web-based flow before adding advanced features.

* Display fictional farm, paddock, herd, and collar data.
* Let the user select or create a grazing break.
* Let the user schedule a herd move.
* Store herd-move commands in the database.
* Show command status and basic collar information.
* Handle loading, empty, and error states.

### Phase 2: Collar simulation and reliability

Add realistic operational behaviour.

* Build a collar-event simulator.
* Simulate normal, delayed, failed, and missing acknowledgements.
* Simulate offline collars, low battery, and stale location data.
* Add an activity timeline.
* Add simple rules-based alerts.
* Add real-time status updates.
* Write tests for command state transitions and duplicate prevention.

### Phase 3: Advanced portfolio features

Only begin these after the core workflow is polished and documented.

* Offline queue for scheduled moves.
* Local caching and safe synchronisation.
* Better map interactions and virtual-boundary checks.
* React Native companion app.
* Observability dashboard for delayed events and failed commands.
* Geospatial database support.
* Optional multilingual interface.

---

## Initial technical architecture

The project will begin as a web application and use a modular monolith architecture.

A modular monolith means there is one backend application, but the code is organised into clear feature modules rather than one large, unstructured codebase.

### Core stack

| Area              | Initial choice                  | Purpose                                                                    |
| ----------------- | ------------------------------- | -------------------------------------------------------------------------- |
| Frontend          | React + TypeScript + Vite       | Build the main farm-manager interface.                                     |
| Styling           | Tailwind CSS                    | Create consistent UI quickly.                                              |
| Backend           | Node.js + TypeScript + Express  | Build APIs and business logic using the same language as the frontend.     |
| Database          | PostgreSQL                      | Store farms, paddocks, herds, collars, commands, events, and alerts.       |
| Database access   | To be decided after comparison  | Learn the trade-offs between raw SQL, Drizzle, and Prisma before choosing. |
| API               | REST                            | Keep the first version simple and understandable.                          |
| Real-time updates | Server-Sent Events or Socket.IO | Show command acknowledgements and alerts without refreshing the page.      |
| Maps              | React Leaflet or Mapbox         | Display fictional paddocks, grazing areas, and collar locations.           |
| Geospatial logic  | Turf.js                         | Calculate simple areas and check whether collars are within boundaries.    |
| Frontend testing  | Vitest + React Testing Library  | Test components and important UI behaviour.                                |
| Backend testing   | Vitest + Supertest              | Test API routes and herd-move workflows.                                   |
| Deployment        | To be decided later             | Choose after the application works well locally.                           |
| Containerisation  | Docker, later                   | Learn reproducible setup and deployment after the core workflow works.     |

---

## System responsibilities

### Frontend responsibilities

The frontend is responsible for:

* Showing the farm, paddocks, herd, collars, commands, and alerts.
* Letting the farm manager create a grazing break.
* Letting the farm manager schedule a herd move.
* Clearly displaying command status.
* Handling loading, empty, error, and partial-failure states.

### Backend responsibilities

The backend is responsible for:

* Validating incoming requests.
* Creating and updating herd-move commands.
* Managing command state transitions.
* Receiving simulated collar events.
* Detecting simple rules-based alerts.
* Sending relevant updates to the frontend.

### Database responsibilities

The database stores:

* Farms
* Paddocks
* Herds
* Collars
* Grazing breaks
* Herd-move commands
* Collar events
* Alerts
* Command acknowledgements

### Collar simulator responsibilities

The simulator is responsible for:

* Creating fictional collar events.
* Simulating normal acknowledgements.
* Simulating delayed acknowledgements.
* Simulating failed acknowledgements.
* Simulating offline collars and low battery.
* Simulating stale location data.
* Sending events to the backend at controlled intervals.

---

## Key architecture principles

* Use TypeScript throughout the project.
* Prefer a modular monolith over microservices.
* Keep business logic separate from UI components and HTTP route handlers.
* Validate data at API boundaries.
* Treat collar events as potentially delayed, duplicated, missing, or out of order.
* Use clear command states rather than vague boolean values.
* Design for idempotency: repeating the same herd-move request should not create duplicate moves.
* Use realistic failure states, not only successful outcomes.
* Prefer clear naming over clever abstractions.
* Write tests for business-critical logic.
* Document meaningful architecture decisions.

Suggested herd-move command states:

`DRAFT → SCHEDULED → DISPATCHED → ACKNOWLEDGED / PARTIALLY_ACKNOWLEDGED / FAILED → ACTIVE`

---

## Important simulated behaviours

Each fictional collar can:

* Be online or offline.
* Have a battery percentage.
* Send a location update.
* Acknowledge a herd-move command.
* Acknowledge late.
* Fail to acknowledge.
* Send stale data.
* Trigger a simple rules-based alert.

The application must clearly state that all data is fictional and that alerts are simulations, not veterinary advice.

---

## Out of scope

Do not build:

* Real animal tracking.
* Real virtual-fence control.
* Hardware integrations.
* Animal-health diagnosis.
* Machine-learning models in the first version.
* Microservices, Kafka, or Kubernetes.
* A generic dashboard full of charts with no clear workflow.
* A direct visual copy of an existing farm-technology product.

---

## Portfolio goal

This project should demonstrate that the developer can:

* Translate a real operational problem into a usable product workflow.
* Build and explain a full-stack TypeScript system.
* Think about unreliable devices, partial failures, retries, and data quality.
* Make practical architecture decisions without overengineering.
* Build understandable, tested software.
* Use AI as a learning and development partner while retaining ownership of technical decisions.