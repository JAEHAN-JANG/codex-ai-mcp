import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const port = 4273;
const baseUrl = `http://127.0.0.1:${port}`;

const server = spawn(process.execPath, ["scripts/serve.mjs"], {
  cwd: new URL("..", import.meta.url),
  env: { ...process.env, PORT: String(port) },
  stdio: "ignore"
});

try {
  await waitForServer(`${baseUrl}/`);

  const home = await fetchText(`${baseUrl}/`);
  const app = await fetchText(`${baseUrl}/src/app.js`);
  const styles = await fetchText(`${baseUrl}/styles/main.css`);

  assert.match(home, /Habit Check/);
  assert.match(home, /id="habit-form"/);
  assert.match(home, /id="reset-habits"/);
  assert.match(app, /editHabitName/);
  assert.match(styles, /habit-item/);

  console.log("ok - smoke test");
} finally {
  server.kill();
}

async function waitForServer(url) {
  const started = Date.now();

  while (Date.now() - started < 3000) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      await sleep(100);
    }
  }

  throw new Error(`Server did not start at ${url}`);
}

async function fetchText(url) {
  const response = await fetch(url);
  assert.equal(response.status, 200, `${url} should return 200`);
  return response.text();
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
