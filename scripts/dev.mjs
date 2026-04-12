import { spawn, spawnSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const node = process.execPath;
const veliteBin = join(root, "node_modules", "velite", "bin", "velite.js");
const nextBin = join(root, "node_modules", "next", "dist", "bin", "next");

const firstBuild = spawnSync(node, [veliteBin, "build"], {
  cwd: root,
  stdio: "inherit",
});

if (firstBuild.status !== 0) {
  process.exit(firstBuild.status ?? 1);
}

const processes = [
  spawn(node, [veliteBin, "dev"], { cwd: root, stdio: "inherit" }),
  spawn(node, [nextBin, "dev"], { cwd: root, stdio: "inherit" }),
];

let shuttingDown = false;

const shutdown = (code = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;

  for (const child of processes) {
    if (!child.killed) child.kill();
  }

  process.exit(code);
};

for (const child of processes) {
  child.on("exit", (code) => {
    if (!shuttingDown && code && code !== 0) {
      shutdown(code);
    }
  });
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
