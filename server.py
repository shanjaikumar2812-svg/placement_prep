#!/usr/bin/env python3
"""Local & Cloud Development Server with SQLite Session Persistence for Shanjai's SWAYAM x GUVI Placement Hub."""

import http.server
import json
import os
import socketserver
import sqlite3
import threading
import webbrowser

PORT = int(os.environ.get("PORT", 5500))
HOST = "0.0.0.0" if "PORT" in os.environ else "127.0.0.1"
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(DIRECTORY, "placement_session.db")


def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            "CREATE TABLE IF NOT EXISTS session_store (id INTEGER PRIMARY KEY CHECK (id = 1), state_json TEXT)"
        )
        conn.commit()


def get_saved_state():
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        row = conn.execute("SELECT state_json FROM session_store WHERE id = 1").fetchone()
        if row and row[0]:
            try:
                return json.loads(row[0])
            except Exception:
                return None
    return None


def save_state_to_db(state_obj):
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            "INSERT INTO session_store (id, state_json) VALUES (1, ?) "
            "ON CONFLICT(id) DO UPDATE SET state_json = excluded.state_json",
            (json.dumps(state_obj),)
        )
        conn.commit()


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        if self.path.startswith("/api/state"):
            state = get_saved_state()
            payload = json.dumps({"ok": True, "state": state}).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()

    def do_POST(self):
        if self.path.startswith("/api/state"):
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
            try:
                body = json.loads(raw)
                if isinstance(body, dict) and "state" in body:
                    save_state_to_db(body["state"])
                payload = json.dumps({"ok": True}).encode("utf-8")
                self.send_response(200)
            except Exception as exc:
                payload = json.dumps({"ok": False, "error": str(exc)}).encode("utf-8")
                self.send_response(400)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        self.send_response(404)
        self.end_headers()


def open_browser():
    if "PORT" not in os.environ:
        url = f"http://127.0.0.1:{PORT}/index.html"
        print(f"\nOpening SWAYAM x GUVI Placement Hub in your browser: {url}")
        webbrowser.open(url)


if __name__ == "__main__":
    os.chdir(DIRECTORY)
    init_db()
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
        print("==================================================================")
        print("  SWAYAM x GUVI Data Science Placement Hub — Persistent Server")
        print(f"  Serving at: http://{HOST}:{PORT}/index.html")
        print(f"  SQLite Session Store: {DB_PATH}")
        print("==================================================================")
        threading.Timer(0.8, open_browser).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
