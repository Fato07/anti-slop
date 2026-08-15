import { RuleTester } from "oxlint/plugins-dev";

import { noForbiddenTermInSymbolNamesRule } from "./no-shape-in-symbol-names.ts";

const tester = new RuleTester({ languageOptions: { parserOptions: { lang: "ts" } } });
const error = { messageId: "forbiddenSymbolName" };

tester.run("anti-slop/no-shape-in-symbol-names", noForbiddenTermInSymbolNamesRule, {
	valid: ["interface UserModel { id: string }", 'const value = { "shape": "circle" };'],
	invalid: [
		{ code: "interface UserShape { id: string }", errors: [error] },
		{ code: "const reshape = (value: string) => value;", errors: [error] },
	],
});
