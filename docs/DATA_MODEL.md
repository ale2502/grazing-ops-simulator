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
* status

## Herd
* id
* farm_id
* current_paddock_id
* name
* 

## Collar
* id
* herd_id
* battery
* connection_status
* location
* last_location_at

## GrazingBreak
description: A grazing break is a smaller planned section inside that paddock, usually for a specific time window

* id
* paddock_id
* herd_id
* starts_at
* ends_at
* shape
* status

## HerdMoveCommand
description: A herd move command is the instruction that tells the system to move a herd into a planned grazing

* id
* herd_id
* grazing_break_id
* scheduled_for
* status: draft | scheduled | dispatched | partially_acknowledged | acknowledged | failed | active
* created_at