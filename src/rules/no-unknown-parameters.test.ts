import { RuleTester } from "oxlint/plugins-dev";

import { noUnknownParametersRule } from "./no-unknown-parameters.ts";

const tester = new RuleTester({ languageOptions: { parserOptions: { lang: "ts" } } });
const error = { messageId: "unknownParameter" };

tester.run("anti-slop/no-unknown-parameters", noUnknownParametersRule, {
	valid: [
		"function consume(value: string) {}",
		"function enrich(cause: unknown) {}",
		"type External = unknown; function parse(value: External) {}",
	],
	invalid: [
		{ code: "function consume(value: unknown) {}", errors: [error] },
		{ code: "const consume = (value: unknown) => value;", errors: [error] },
		{ code: "type Consumer = (value: unknown) => void;", errors: [error] },
	],
});
