#!/usr/bin/env node
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5500;
const ROOT = __dirname;
const STATE_FILE = path.join(ROOT, "placement_session.json");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function readSavedState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
    }
  } catch (err) {}
  return null;
}

function writeSavedState(stateObj) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(stateObj, null, 2), "utf8");
  } catch (err) {}
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;

  if (pathname === "/api/state" && req.method === "GET") {
    const payload = JSON.stringify({ ok: true, state: readSavedState() });
    res.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(payload);
    return;
  }

  if (pathname === "/api/state" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body || "{}");
        if (parsed && typeof parsed.state === "object") {
          writeSavedState(parsed.state);
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: false }));
      }
    });
    return;
  }

  let safePath = path.normalize(pathname === "/" ? "/index.html" : pathname).replace(/^(\.\.[\/\\])+/, "");
  let filePath = path.join(ROOT, safePath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(ROOT, "index.html");
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`SWAYAM x GUVI Placement Hub running on http://0.0.0.0:${PORT}`);
});
