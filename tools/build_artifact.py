"""Copy the site to an output folder, with index.html stripped of its outer
<!DOCTYPE>/<html>/<head>/<body> tags (for hosts that add their own wrapper).

Usage: python tools/build_artifact.py <out-dir>
"""
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit("Usage: python tools/build_artifact.py <out-dir>")
    out = Path(sys.argv[1]).resolve()
    out.mkdir(parents=True, exist_ok=True)

    html = (ROOT / "index.html").read_text(encoding="utf-8")
    for pattern in (r"<!DOCTYPE html>\s*", r"<html[^>]*>\s*", r"</html>\s*", r"<head>\s*", r"</head>\s*",
                    r"<body>\s*", r"</body>\s*", r'<meta charset="UTF-8">\s*', r'<meta name="viewport"[^>]*>\s*'):
        html = re.sub(pattern, "", html, flags=re.IGNORECASE)
    html = re.sub(r'\?v=[\w.]+"', '"', html)  # cache-busting queries are not needed there
    (out / "index.html").write_text(html.strip() + "\n", encoding="utf-8")

    for folder in ("css", "js"):
        if (out / folder).exists():
            shutil.rmtree(out / folder)
        shutil.copytree(ROOT / folder, out / folder)
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()
