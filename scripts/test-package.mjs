import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const consumer = mkdtempSync(join(tmpdir(), "anti-slop-package-"));

try {
  const [{ filename }] = JSON.parse(
    execFileSync(
      "npm",
      ["pack", "--ignore-scripts", "--json", "--pack-destination", consumer],
      { cwd: root, encoding: "utf8" },
    ),
  );
  const tarball = join(consumer, filename);

  writeFileSync(
    join(consumer, "package.json"),
    JSON.stringify({ name: "anti-slop-package-test", private: true, type: "module" }),
  );
  mkdirSync(join(consumer, "src"));
  writeFileSync(
    join(consumer, "oxlint.config.mjs"),
    `import { recommendedRules } from "@fato07/oxlint-plugin-anti-slop";
export default {
  categories: { correctness: "off" },
  jsPlugins: [{ name: "anti-slop", specifier: "@fato07/oxlint-plugin-anti-slop" }],
  rules: recommendedRules,
};
`,
  );
  writeFileSync(join(consumer, "src/bad.ts"), 'const value = "known" as unknown as number;\n');

  execFileSync(
    "npm",
    ["install", "--ignore-scripts", "--no-package-lock", "--no-save", tarball, "oxlint@1.78.0"],
    { cwd: consumer, stdio: "ignore" },
  );
  const result = spawnSync(
    process.execPath,
    [
      join(consumer, "node_modules/oxlint/bin/oxlint"),
      "--config",
      "oxlint.config.mjs",
      "src/bad.ts",
    ],
    { cwd: consumer, encoding: "utf8" },
  );
  const output = `${result.stdout}${result.stderr}`;

  if (result.status !== 1 || !output.includes("anti-slop(no-chained-type-assertions)")) {
    throw new Error(`Published package smoke test failed:\n${output}`);
  }
  console.log("Published package loads and reports anti-slop rules.");
} finally {
  rmSync(consumer, { recursive: true, force: true });
}
