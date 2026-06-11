# docs/superpowers/

Workspace for superpowers-driven section work.

**Canonical UI source of truth is `/DESIGN.md` at the repo root.** Specs/plans are scratch
input that flow into `DESIGN.md` (UI grammar) and `CHANGELOG.md` (decision log) once a
section ships. Shipped specs/plans/handoffs were pruned from the tree on 2026-06-11 and
live in git history.

New section work should write a fresh spec + plan under `specs/` and `plans/` (recreate
those folders as needed), and graduate decisions into `DESIGN.md` / `CHANGELOG.md` on ship.
Deviations from the master grammar are logged directly in the `DESIGN.md` Decisions Log.
