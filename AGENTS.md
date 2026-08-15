# Repository guidance

- `src/` is the canonical plugin implementation.
- Keep rules generic and suitable for reuse across repositories. Do not add application-specific names, paths, or exceptions.
- Use Oxlint's ESTree API; do not add another production parser.
- Keep `recommendedRules` limited to AST-local, low-false-positive evidence rules. Put contextual engineering judgment in the review skill, not CI.
- Add focused RuleTester coverage for semantic rule changes.
- Run `pnpm sync:skill-assets` after changing production source.
- Run `pnpm check` before committing.
