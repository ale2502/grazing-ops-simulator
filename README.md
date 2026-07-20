# GrazingOps Simulator

A fictional, educational farm-operations simulator. A farm manager plans where a herd should graze next, schedules a move, and checks whether simulated collars received the instruction — offline collars, low battery, delays, and all.

This is a personal learning project, not affiliated with Halter, and it doesn't touch any real farm, animal, or collar.

## Why I'm building this

I'm an early-career developer using this project to learn software development and agentic coding at the same time. The goal isn't just a working app — it's understanding *why* each piece is built the way it is, one small step at a time, with an AI pair guiding rather than doing the work for me.

## Where things stand

Work in progress. Right now we're:

- Deciding on a database for the domain (farms, paddocks, herds, collars, commands).
- Writing tests first for core pieces, like the "save the herd" command, before building out the functions behind them.

See `AGENTS.md` for how this project likes to be worked on, and `docs/` for the product brief, data model, and architecture notes.
