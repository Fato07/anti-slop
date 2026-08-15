import { eslintCompatPlugin } from "@oxlint/plugins";

import { noChainedTypeAssertionsRule } from "./rules/no-chained-type-assertions.ts";
import { noConditionalEmptyObjectSpreadRule } from "./rules/no-conditional-empty-object-spread.ts";
import { noKnownValueWideningRule } from "./rules/no-known-value-widening.ts";
import { noModuleMockingRule } from "./rules/no-module-mocking.ts";
import { noObjectParametersRule } from "./rules/no-object-parameters.ts";
import { noReflectApplyRule } from "./rules/no-reflect-apply.ts";
import { noReflectGetRule } from "./rules/no-reflect-get.ts";
import { noRuntimeTypeofRule } from "./rules/no-runtime-typeof.ts";
import { noForbiddenTermInSymbolNamesRule } from "./rules/no-shape-in-symbol-names.ts";
import { noUnknownParametersRule } from "./rules/no-unknown-parameters.ts";
import { noUnknownReturnsRule } from "./rules/no-unknown-returns.ts";
import { noUnknownTypeAliasesRule } from "./rules/no-unknown-type-aliases.ts";
import { noUnsafeDictionaryTypeRule } from "./rules/no-unsafe-dictionary-type.ts";
import { noWidenThenAssertRule } from "./rules/no-widen-then-assert.ts";
import { requireSafetyCommentForTypeAssertionRule } from "./rules/require-safety-comment-for-type-assertion.ts";

export const recommendedRules = {
	"anti-slop/no-chained-type-assertions": "error",
	"anti-slop/no-known-value-widening": "warn",
	"anti-slop/no-object-parameters": "warn",
	"anti-slop/no-unknown-type-aliases": "warn",
	"anti-slop/no-widen-then-assert": "error",
} as const;

export const strictRules = {
	"anti-slop/no-chained-type-assertions": "error",
	"anti-slop/no-conditional-empty-object-spread": "error",
	"anti-slop/no-known-value-widening": "error",
	"anti-slop/no-module-mocking": "error",
	"anti-slop/no-object-parameters": "error",
	"anti-slop/no-reflect-apply": "error",
	"anti-slop/no-reflect-get": "error",
	"anti-slop/no-runtime-typeof": ["error", { allowInTypeGuards: true }],
	"anti-slop/no-shape-in-symbol-names": "error",
	"anti-slop/no-unknown-parameters": "error",
	"anti-slop/no-unknown-returns": "error",
	"anti-slop/no-unknown-type-aliases": "error",
	"anti-slop/no-unsafe-dictionary-type": "error",
	"anti-slop/no-widen-then-assert": "error",
	"anti-slop/require-safety-comment-for-type-assertion": "error",
} as const;

/** Generic Oxlint rules that reject low-evidence and low-signal implementation patterns. */
const antiSlopPlugin = eslintCompatPlugin({
	meta: { name: "anti-slop" },
	rules: {
		"no-chained-type-assertions": noChainedTypeAssertionsRule,
		"no-conditional-empty-object-spread": noConditionalEmptyObjectSpreadRule,
		"no-known-value-widening": noKnownValueWideningRule,
		"no-module-mocking": noModuleMockingRule,
		"no-object-parameters": noObjectParametersRule,
		"no-reflect-apply": noReflectApplyRule,
		"no-reflect-get": noReflectGetRule,
		"no-runtime-typeof": noRuntimeTypeofRule,
		"no-unsafe-dictionary-type": noUnsafeDictionaryTypeRule,
		"no-shape-in-symbol-names": noForbiddenTermInSymbolNamesRule,
		"no-unknown-parameters": noUnknownParametersRule,
		"no-unknown-returns": noUnknownReturnsRule,
		"no-unknown-type-aliases": noUnknownTypeAliasesRule,
		"no-widen-then-assert": noWidenThenAssertRule,
		"require-safety-comment-for-type-assertion": requireSafetyCommentForTypeAssertionRule,
	},
});

export default antiSlopPlugin;
