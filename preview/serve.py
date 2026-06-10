#!/usr/bin/env python3
"""Local preview server with no-cache headers for miniprogram HTML preview."""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

PORT = 55123
ROOT = os.path.dirname(os.path.abspath(__file__))


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(ROOT)
    server = HTTPServer(("127.0.0.1", PORT), PreviewHandler)
    print(f"Preview: http://127.0.0.1:{PORT}/index.html")
    print("Cache disabled — refresh always loads latest file.")
    server.serve_forever()
