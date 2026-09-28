import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { build } from "esbuild";
import React from "react";

const source = fs.readFileSync("src/sections/views/GouvernanceSection.jsx", "utf8");
const compiled = await build({
  stdin: {
    contents: `${source}\nexport { BoardPage };`,
    resolveDir: path.resolve("src/sections/views"),
    loader: "jsx",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "cjs",
  packages: "external",
});

let openPanel = "Description";
const react = {
  ...React,
  useState() {
    return [openPanel, (update) => {
      openPanel = typeof update === "function" ? update(openPanel) : update;
    }];
  },
};
const module = { exports: {} };
const require = createRequire(import.meta.url);
new Function("require", "module", "exports", compiled.outputFiles[0].text)(
  (name) => name === "react" ? react : require(name),
  module,
  module.exports,
);

const renderPanels = () => module.exports.BoardPage({
  board: {},
  regulation: "",
  documentState: {},
  apiEnabled: false,
}).props.children;

let panels = renderPanels();
assert.deepEqual(panels.map((panel) => panel.props.open), [true, false, false, false, false]);

function clickPanel(index) {
  let prevented = false;
  panels[index].props.children[0].props.onClick({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  panels = renderPanels();
}

clickPanel(2);
assert.deepEqual(panels.map((panel) => panel.props.open), [false, false, true, false, false]);
clickPanel(2);
assert.deepEqual(panels.map((panel) => panel.props.open), [false, false, false, false, false]);
clickPanel(1);
assert.deepEqual(panels.map((panel) => panel.props.open), [false, true, false, false, false]);

console.log("PASS: governance accordion keeps at most one panel open.");
