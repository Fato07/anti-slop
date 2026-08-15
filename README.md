# anti-slop

Evidence-first Oxlint policy for agent-written TypeScript and JavaScript.

This fork keeps the original rules from [`dmmulroy/anti-slop`](https://github.com/dmmulroy/anti-slop), but changes the default: mechanically strong evidence rules are enabled first; architecture and vocabulary preferences remain explicit opt-ins.

The project is vendored, not consumed as a fixed npm dependency. Copy it into a repository, review it, and make the policy yours.

## Two enforcement layers

1. **Lint facts** — AST-local patterns such as chained assertions and widening a known value before asserting it back.
2. **Review judgment** — Ponytail-inspired deletion, reuse, standard-library, native-platform, root-cause, and abstraction decisions that require repository context.

Do not turn judgment into a broad syntax ban. Do not satisfy lint by adding wrappers, aliases, interfaces, or comments that make the code larger without making it safer.

## Install

Install the evidence-first profile with the bundled agent skill:

```bash
npx skills add Fato07/anti-slop --skill install-anti-slop
```

Then ask your coding agent to install anti-slop in the current repository. The skill copies the plugin, installs the tested Oxlint versions, merges the recommended rules into the existing configuration, and validates the result.

Install the contextual simplicity review separately:

```bash
npx skills add Fato07/anti-slop --skill review-simplicity
```

Then invoke `$review-simplicity` when reviewing or implementing a change.

To inspect both skills first:

```bash
npx skills add Fato07/anti-slop --list
```

## Profiles

`recommendedRules` is the default:

| Severity | Rules |
| --- | --- |
| Error | `no-chained-type-assertions`, `no-widen-then-assert` |
| Warning | `no-known-value-widening`, `no-object-parameters`, `no-unknown-type-aliases` |

`strictRules` enables all 15 rules as errors. It is intentionally opinionated and permits `typeof` only inside named type predicates and assertion functions.

## Manual installation

Copy `src/` into the target repository, for example at `tools/oxlint/anti-slop/`, and install the matched tested versions of `oxlint` and `@oxlint/plugins`.

```ts
import { defineConfig } from "oxlint";
import { recommendedRules } from "./tools/oxlint/anti-slop/index.ts";

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
    "tools/oxlint/anti-slop/**",
  ],
  jsPlugins: [
    { name: "anti-slop", specifier: "./tools/oxlint/anti-slop/index.ts" },
  ],
  rules: {
    ...recommendedRules,
  },
});
```

Oxlint's JavaScript plugin interface is currently alpha. This fork pins `oxlint` and `@oxlint/plugins` to the same version and treats upgrades as tested changes rather than installation-time guesses. See the [official JS plugin documentation](https://oxc.rs/docs/guide/usage/linter/js-plugins.html).

## Rule catalog

| Rule | Recommended | Purpose |
| --- | --- | --- |
| `no-chained-type-assertions` | error | Reject nested assertions that fabricate evidence. |
| `no-known-value-widening` | warn | Preserve known literal and object evidence. |
| `no-object-parameters` | warn | Avoid the broad `object` input contract. |
| `no-unknown-type-aliases` | warn | Keep `unknown` visible at the parsing seam. |
| `no-widen-then-assert` | error | Reject known to broad to asserted-back local flows. |
| `no-conditional-empty-object-spread` | strict | Prefer explicit property construction. |
| `no-module-mocking` | strict | Require tests to replace dependencies through real seams. |
| `no-reflect-apply` | strict | Prefer typed function calls. |
| `no-reflect-get` | strict | Prefer typed property access. |
| `no-runtime-typeof` | strict | Concentrate primitive checks in named type guards. |
| `no-shape-in-symbol-names` | strict | Enforce domain-role naming instead of structural naming. |
| `no-unknown-parameters` | strict | Require parsed input contracts. |
| `no-unknown-returns` | strict | Prevent `unknown` from escaping a function contract. |
| `no-unsafe-dictionary-type` | strict | Require a concrete dictionary value contract. |
| `require-safety-comment-for-type-assertion` | strict | Require assertions to carry a review marker. |

The strict-only rules are not universal correctness claims. Parsers, libraries, plugin systems, metaprogramming, and legacy tests often need narrow overrides or a locally edited policy.

## Development

```bash
pnpm install
pnpm check
```

`src/` is canonical. After changing production source, run `pnpm sync:skill-assets`; CI verifies that the install skill's vendored copy remains identical.

## License

MIT
