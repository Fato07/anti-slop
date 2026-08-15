---
name: install-anti-slop
description: Install and configure the anti-slop Oxlint plugin in a local TypeScript or JavaScript repository. Use when adding or updating anti-slop, adopting evidence-preserving lint rules, or migrating an existing vendored anti-slop setup.
---

# Install anti-slop

Install the package with evidence-first defaults. Preserve unrelated work and adapt to the repository's package manager and configuration style.

## Procedure

1. Inspect the repository:
   - Read its agent instructions.
   - Check `git status` and preserve unrelated changes.
   - Identify its package manager and Oxlint configuration.
   - Find any existing anti-slop files or rule keys. Do not overwrite them before reviewing the diff.

2. Install the versions tested by this fork as exact development dependencies:

   ```text
   @fato07/oxlint-plugin-anti-slop 0.1.0
   oxlint 1.78.0
   ```

   Use the repository's existing package manager. Do not silently upgrade them; test a newer matched pair in this fork before changing the pinned versions.

3. Register the plugin and use the recommended rules in `oxlint.config.ts`:

   ```ts
   import { defineConfig } from "oxlint";
   import { recommendedRules } from "@fato07/oxlint-plugin-anti-slop";

   export default defineConfig({
     ignorePatterns: [
       ".agent/**",
       ".agents/**",
       ".claude/**",
       ".codex/**",
       ".continue/**",
       ".cursor/**",
       ".gemini/**",
       ".opencode/**",
       ".pi/**",
       ".roo/**",
       ".windsurf/**",
     ],
     jsPlugins: [
       { name: "anti-slop", specifier: "@fato07/oxlint-plugin-anti-slop" },
     ],
     rules: {
       ...recommendedRules,
     },
   });
   ```

   Merge rather than replace existing ignores, plugins, rules, and overrides. If an existing `anti-slop/*` rule conflicts, preserve it and report the conflict. Add project-local agent tooling directories that actually exist; do not ignore every dot-directory.

   For Vite+, place the same plugin and rule entries under `lint`, and merge the ignore patterns into both `lint.ignorePatterns` and `fmt.ignorePatterns`.

   Use `strictRules` instead of `recommendedRules` only when the user explicitly chooses the full opinionated policy. The strict profile allows `typeof` inside named type guards but still contains architecture- and vocabulary-specific rules.

4. Run the repository's lint command and typecheck. For Vite+, run the full `vp check`. If owned source has findings, report them and change the source only when the user requested cleanup or migration.

5. Resolve findings without laundering them:
   - Delete an unnecessary assertion or widening first.
   - Reuse an existing type, schema, parser, or repository module.
   - Prefer inference, `as const`, `satisfies`, standard-library, and native behavior.
   - Do not add a wrapper, interface, alias, dependency, or ceremonial `SAFETY:` comment only to make lint pass.
   - Use a narrow documented suppression for a genuine interop exception.

6. Report the dependency versions, selected profile, configuration changes, checks run, and remaining findings.
