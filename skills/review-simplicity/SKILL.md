---
name: review-simplicity
description: Review or implement code with a deletion-first simplicity discipline. Use when removing agent-generated complexity, avoiding speculative abstractions, choosing reuse, standard-library, or native behavior, fixing a shared root cause, or checking whether code needs to exist.
---

# Review for simplicity

Inspect the request, diff, callers, nearby helpers, dependencies, and tests before judging the code.

## Workflow

1. Delete work that does not serve the requested outcome.
2. Reuse an existing repository module or pattern.
3. Prefer the standard library or native platform behavior.
4. Use an already-installed dependency before adding local machinery.
5. Inline a pass-through wrapper when its deletion does not spread complexity.
6. Fix a shared root cause once instead of patching sibling callers.
7. Leave the smallest regression check that would catch the failure.

Stop at the first option that fully preserves correctness. Do not simplify away trust-boundary validation, data-loss prevention, security, accessibility, or necessary error handling.

## Keep lint and judgment separate

Use anti-slop lint findings only for syntax the rule can establish. Decide whether an abstraction, dependency seam, mock, runtime check, or broad type is justified from repository context.

Never satisfy a lint rule by adding an otherwise-unused wrapper, interface, alias, parser, dependency injection seam, or ceremonial comment. Prefer a narrow documented suppression when the flagged syntax is genuinely required.

## Report or implement

For a review, report only evidenced findings with a file and line. Label each finding `delete`, `reuse`, `native`, `shrink`, `root-cause`, or `ceiling`, and name the smaller replacement.

For implementation, make the smallest safe change and run the narrowest relevant check. Add a `simplify:` comment only when a deliberate ceiling has a concrete upgrade trigger.

If the current code is already the smallest correct version, say so without inventing work.
