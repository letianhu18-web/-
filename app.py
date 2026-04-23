#!/usr/bin/env python3
"""本地启动圣诞树手势网站（Python 版本启动器）。

用法：
  python app.py
  python app.py --host 0.0.0.0 --port 8000
"""

from __future__ import annotations

import argparse
import functools
import http.server
import socketserver
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="启动手势控制颗粒圣诞树网站")
    parser.add_argument("--host", default="127.0.0.1", help="监听地址，默认 127.0.0.1")
    parser.add_argument("--port", type=int, default=8000, help="监听端口，默认 8000")
    parser.add_argument(
        "--no-browser",
        action="store_true",
        help="启动后不自动打开浏览器",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))

    class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
        daemon_threads = True

    with ThreadingHTTPServer((args.host, args.port), handler) as httpd:
        url = f"http://{args.host}:{args.port}/index.html"
        print("=" * 60)
        print("🎄 手势控制颗粒圣诞树 - Python 启动成功")
        print(f"访问地址: {url}")
        print("提示: 首次使用请允许浏览器摄像头权限。")
        print("退出: Ctrl + C")
        print("=" * 60)

        if not args.no_browser:
            try:
                webbrowser.open(url, new=2)
            except Exception:
                pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务已停止。")


if __name__ == "__main__":
    main()
