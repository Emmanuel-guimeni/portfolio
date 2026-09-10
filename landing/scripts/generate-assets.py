#!/usr/bin/env python3
"""
Generate the raster brand assets that cannot be expressed as SVG:

  public/og.png                1200x630  carte Open Graph / Twitter
  public/apple-touch-icon.png   180x180  icône d'écran d'accueil iOS
  public/favicon.ico             32x32   favicon historique (les navigateurs modernes utilisent favicon.svg)

Run:  python3 scripts/generate-assets.py       (requires Pillow)

Everything else — the monogram, the system diagram, the icon set — is inline
SVG in the codebase, so it stays sharp at any size and costs no extra request.
"""

from pathlib import Path
from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

FONT_DIRS = [
    Path("/mnt/skills/examples/canvas-design/canvas-fonts"),
    Path("/usr/share/fonts/truetype/liberation"),
]
FONT_BOLD = ["Outfit-Bold.ttf", "LiberationSans-Bold.ttf"]
FONT_REG = ["Outfit-Regular.ttf", "LiberationSans-Regular.ttf"]

BG = (6, 7, 12)
BLUE = (59, 130, 246)
INDIGO = (99, 102, 241)
VIOLET = (139, 92, 246)
WHITE = (242, 245, 250)
MUTED = (124, 134, 153)


def font(candidates, size):
    for directory in FONT_DIRS:
        for name in candidates:
            path = directory / name
            if path.exists():
                return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def diagonal_gradient(size, start, mid, end):
    """Cheap 135° three-stop gradient."""
    w, h = size
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = (x / max(w - 1, 1) + y / max(h - 1, 1)) / 2
            px[x, y] = lerp(start, mid, t * 2) if t < 0.5 else lerp(mid, end, (t - 0.5) * 2)
    return img


def radial_glow(size, centre, radius, colour, strength):
    """Additive radial light, used to lift the OG background."""
    w, h = size
    layer = Image.new("RGB", (w, h), (0, 0, 0))
    px = layer.load()
    cx, cy = centre
    for y in range(0, h):
        dy2 = (y - cy) ** 2
        for x in range(0, w):
            d = ((x - cx) ** 2 + dy2) ** 0.5
            if d >= radius:
                continue
            f = (1 - d / radius) ** 2 * strength
            px[x, y] = tuple(round(c * f) for c in colour)
    return layer


def rounded_monogram(size, radius_ratio=0.25):
    img = diagonal_gradient((size, size), BLUE, INDIGO, VIOLET).convert("RGBA")
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=int(size * radius_ratio), fill=255
    )
    img.putalpha(mask)

    draw = ImageDraw.Draw(img)
    f = font(FONT_BOLD, int(size * 0.42))
    text = "GE"
    box = draw.textbbox((0, 0), text, font=f)
    draw.text(
        ((size - (box[2] - box[0])) / 2 - box[0], (size - (box[3] - box[1])) / 2 - box[1]),
        text,
        font=f,
        fill=(255, 255, 255),
    )
    return img


def build_og():
    W, H = 1200, 630
    base = Image.new("RGB", (W, H), BG)

    # two accent auroras, matching the site's ambient background
    for centre, radius, colour, strength in (
        ((980, 60), 620, INDIGO, 0.42),
        ((160, 540), 560, BLUE, 0.22),
        ((640, 700), 520, VIOLET, 0.20),
    ):
        base = ImageChops.add(
            base, radial_glow((W, H), centre, radius, colour, strength)
        )

    draw = ImageDraw.Draw(base)

    # subtle grid, keeps large flat areas from looking empty
    for x in range(0, W, 60):
        draw.line([(x, 0), (x, H)], fill=(16, 19, 28), width=1)
    for y in range(0, H, 60):
        draw.line([(0, y), (W, y)], fill=(16, 19, 28), width=1)

    # portrait on the right, if it has been generated
    portrait_path = PUBLIC / "images" / "emmanuel-portrait.png"
    if portrait_path.exists():
        portrait = Image.open(portrait_path).convert("RGBA")
        target_h = 620
        ratio = target_h / portrait.height
        portrait = portrait.resize(
            (max(1, round(portrait.width * ratio)), target_h), Image.LANCZOS
        )
        base.paste(portrait, (W - portrait.width - 70, H - target_h + 30), portrait)

    # monogram
    base.paste(rounded_monogram(64), (72, 62), rounded_monogram(64))

    f_name = font(FONT_BOLD, 27)
    f_h1 = font(FONT_BOLD, 46)
    f_role = font(FONT_REG, 25)
    f_meta = font(FONT_REG, 20)

    draw.text((152, 68), "Mr GUEHEDI Emmanuel", font=f_name, fill=WHITE)
    draw.text((152, 100), "Casablanca – Maroc", font=f_meta, fill=MUTED)

    draw.text((72, 212), "Votre marketing digital", font=f_h1, fill=WHITE)
    draw.text((72, 274), "en un système", font=f_h1, fill=WHITE)
    draw.text((72, 336), "intelligent et automatisé", font=f_h1, fill=(167, 180, 252))

    draw.text(
        (72, 424),
        "Spécialiste Marketing Digital & Automatisation IA",
        font=f_role,
        fill=(182, 191, 208),
    )

    # accent rule + positioning line
    draw.rounded_rectangle((72, 478, 148, 483), radius=3, fill=INDIGO)
    draw.text(
        (72, 506),
        "IA  ·  Marketing Automation  ·  CRM  ·  Data  ·  Growth",
        font=f_meta,
        fill=MUTED,
    )

    base.save(PUBLIC / "og.png", optimize=True)
    print("wrote public/og.png", base.size)


def build_icons():
    apple = Image.new("RGB", (180, 180), BG)
    mark = rounded_monogram(180, radius_ratio=0.23)
    apple.paste(mark, (0, 0), mark)
    apple.save(PUBLIC / "apple-touch-icon.png", optimize=True)
    print("wrote public/apple-touch-icon.png")

    ico = rounded_monogram(256, radius_ratio=0.22)
    ico.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("wrote public/favicon.ico")


if __name__ == "__main__":
    PUBLIC.mkdir(parents=True, exist_ok=True)
    build_og()
    build_icons()
