# Data Model

## Farm
* id
* name

## Paddock
* id
* farm_id
* name
* area
* shape
* status: in_use | available | regrowing

## Herd
* id
* farm_id
* current_paddock_id
* name

## Collar
* id
* herd_id
* battery
* connection_status: online | offline
* location
* last_location_at

## GrazingBreak
description: a smaller planned section inside that paddock, usually for a specific time window

* id
* paddock_id
* herd_id
* starts_at
* ends_at
* shape
* status: draft | scheduled | active | completed | cancelled

  - draft = being planned, not confirmed
  - scheduled = confirmed for a future time
  - active = happening now
  - completed = finished
  - cancelled = abandoned before or during use

## HerdMoveCommand
description: A herd move command is the instruction that tells the system to move a herd into a planned grazing break

* id
* herd_id
* grazing_break_id
* scheduled_for
* status: draft | scheduled | dispatched | partially_acknowledged | acknowledged | failed | active
* created_at

  - draft = being planned, not confirmed
  - scheduled = confirmed for a future time
  - dispatched = command sent to collars
  - partially_acknowledged = some collars responded to the dispatch
  - acknowledged = all collars responded to the dispatch
  - failed = the move command could not be completed successfully
  - active = collars received the dispatch and the move is now happening 

## CommandAcknowledgment
description: tracks how one collar responded to one herd move command
relationship: one herd move command has many command acknowledgments, one for each collar in the herd

* id
* herd_move_command_id
* collar_id
* status: pending | acknowledged | failed | missed
* acknowledged_at
* last_attempted_at

## CollarEvent
description: records one simulated message received from a collar
payload: extra details for this event, such as battery percentage, location, or failure reason

* id
* collar_id
* herd_move_command_id: optional, only used for command-related events
* type: location_updated | battery_updated | connection_changed | command_acknowledged | command_failed
* occurred_at
* received_at
* payload