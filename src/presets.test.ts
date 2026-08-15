import assert from "node:assert/strict";

import { recommendedRules, strictRules } from "./index.ts";

assert.deepEqual(Object.keys(recommendedRules), [
	"anti-slop/no-chained-type-assertions",
	"anti-slop/no-known-value-widening",
	"anti-slop/no-object-parameters",
	"anti-slop/no-unknown-type-aliases",
	"anti-slop/no-widen-then-assert",
]);

assert.equal(recommendedRules["anti-slop/no-chained-type-assertions"], "error");
assert.equal(recommendedRules["anti-slop/no-widen-then-assert"], "error");
assert.equal(Object.keys(strictRules).length, 15);
assert.deepEqual(strictRules["anti-slop/no-runtime-typeof"], [
	"error",
	{ allowInTypeGuards: true },
]);
assert.ok(
	Object.values(strictRules).every(
		(setting) => setting === "error" || (Array.isArray(setting) && setting[0] === "error"),
	),
);
