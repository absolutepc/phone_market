#!/usr/bin/env python3
"""Generate transparent MacBook product images for the Phone Market catalog."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1] / "img" / "macbooks"

NEO_COLORS = {
    "blue": ("#5B8FD9", "#3E6FB8", "#7EB0E8"),
    "yellow": ("#F2D56B", "#D4B84A", "#FFE08A"),
    "pink": ("#F2A6C4", "#D97FA3", "#FFC2D6"),
    "white": ("#F4F4F6", "#D9D9DE", "#FFFFFF"),
}

AIR_COLORS = {
    "midnight": ("#3A3B3F", "#1F2024", "#5A5B60"),
    "starlight": ("#EEE5D7", "#D5C8B6", "#FFF7EC"),
    "silver": ("#D9DADC", "#B8BBBF", "#F3F4F6"),
    "sky-blue": ("#AFC3D8", "#8EA9C4", "#C9D9EA"),
}

PRO_COLORS = {
    "space-black": ("#2F3034", "#141519", "#4A4B50"),
    "silver": ("#D9DADC", "#B8BBBF", "#F3F4F6"),
}


def mix(c1: str, c2: str, t: float) -> tuple[int, int, int]:
    a = tuple(int(c1[i : i + 2], 16) for i in (1, 3, 5))
    b = tuple(int(c2[i : i + 2], 16) for i in (1, 3, 5))
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def hex_rgb(value: str) -> tuple[int, int, int]:
    return tuple(int(value[i : i + 2], 16) for i in (1, 3, 5))


def draw_laptop(
    size: tuple[int, int],
    palette: tuple[str, str, str],
    *,
    variant: str,
) -> Image.Image:
    width, height = size
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    base, shadow, highlight = map(hex_rgb, palette)
    body_w = int(width * 0.88)
    body_h = int(height * 0.18)
    body_x = (width - body_w) // 2
    body_y = int(height * 0.72)

    lid_w = int(width * 0.9)
    lid_h = int(height * 0.52)
    lid_x = (width - lid_w) // 2
    lid_y = int(height * 0.12)

  # Screen thickness scales by model.
    if variant == "neo":
        lid_h = int(height * 0.46)
        body_h = int(height * 0.14)
        corner = 22
    elif variant == "air-15":
        lid_w = int(width * 0.92)
        body_w = int(width * 0.9)
        corner = 24
    elif variant.startswith("pro"):
        corner = 18
        body_h = int(height * 0.2)
        lid_h = int(height * 0.5)
    else:
        corner = 22

    # Drop shadow
    shadow_img = Image.new("RGBA", size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_img)
    shadow_draw.rounded_rectangle(
        (body_x + 8, body_y + 10, body_x + body_w + 8, body_y + body_h + 10),
        radius=corner,
        fill=(0, 0, 0, 70),
    )
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(10))
    img = Image.alpha_composite(img, shadow_img)
    draw = ImageDraw.Draw(img)

    # Base
    draw.rounded_rectangle(
        (body_x, body_y, body_x + body_w, body_y + body_h),
        radius=corner,
        fill=(*base, 255),
    )
    draw.rounded_rectangle(
        (body_x + 8, body_y + 4, body_x + body_w - 8, body_y + body_h - 6),
        radius=max(8, corner - 8),
        fill=(*mix(palette[0], palette[2], 0.35), 255),
    )

    # Keyboard hint
    key_w = int(body_w * 0.62)
    key_h = max(6, body_h // 5)
    key_x = body_x + (body_w - key_w) // 2
    key_y = body_y + body_h // 2 - key_h // 2
    draw.rounded_rectangle(
        (key_x, key_y, key_x + key_w, key_y + key_h),
        radius=4,
        fill=(*shadow, 120),
    )

    # Trackpad
    pad_w = int(body_w * 0.22)
    pad_h = max(8, body_h // 3)
    pad_x = body_x + (body_w - pad_w) // 2
    pad_y = body_y + body_h - pad_h - 6
    draw.rounded_rectangle(
        (pad_x, pad_y, pad_x + pad_w, pad_y + pad_h),
        radius=6,
        fill=(*highlight, 90),
    )

    # Lid
    draw.rounded_rectangle(
        (lid_x, lid_y, lid_x + lid_w, lid_y + lid_h),
        radius=corner + 2,
        fill=(*mix(palette[0], palette[1], 0.25), 255),
    )

    bezel = max(10, lid_w // 28)
    screen_x1 = lid_x + bezel
    screen_y1 = lid_y + bezel
    screen_x2 = lid_x + lid_w - bezel
    screen_y2 = lid_y + lid_h - bezel
    draw.rounded_rectangle(
        (screen_x1, screen_y1, screen_x2, screen_y2),
        radius=max(8, corner - 6),
        fill=(10, 12, 18, 255),
    )

    # Screen glare
    glare = Image.new("RGBA", size, (0, 0, 0, 0))
    glare_draw = ImageDraw.Draw(glare)
    glare_draw.polygon(
        [
            (screen_x1 + 8, screen_y1 + 8),
            (screen_x2 - int(lid_w * 0.35), screen_y1 + 8),
            (screen_x1 + 8, screen_y2 - int(lid_h * 0.45)),
        ],
        fill=(255, 255, 255, 28),
    )
    img = Image.alpha_composite(img, glare)
    draw = ImageDraw.Draw(img)

    # Notch for Pro models
    if variant.startswith("pro"):
        notch_w = max(36, lid_w // 8)
        notch_h = max(8, lid_h // 24)
        notch_x1 = lid_x + (lid_w - notch_w) // 2
        draw.rounded_rectangle(
            (notch_x1, screen_y1, notch_x1 + notch_w, screen_y1 + notch_h),
            radius=4,
            fill=(0, 0, 0, 255),
        )

    # Apple logo on lid
    logo_r = max(8, lid_w // 24)
    logo_cx = lid_x + lid_w // 2
    logo_cy = lid_y + lid_h // 2 + lid_h // 10
    draw.ellipse(
        (logo_cx - logo_r, logo_cy - logo_r, logo_cx + logo_r, logo_cy + logo_r),
        fill=(*highlight, 70),
    )
    bite = logo_r // 2
    draw.ellipse(
        (logo_cx + bite // 2, logo_cy - logo_r - bite // 3, logo_cx + bite // 2 + bite, logo_cy - bite // 3),
        fill=(*mix(palette[0], palette[1], 0.25), 255),
    )

    # Hinge line
    draw.line(
        (lid_x + 10, lid_y + lid_h, lid_x + lid_w - 10, lid_y + lid_h),
        fill=(*shadow, 180),
        width=2,
    )

    return img


def save_set(folder: str, colors: dict[str, tuple[str, str, str]], variant: str, size: tuple[int, int]) -> None:
    out_dir = ROOT / folder
    out_dir.mkdir(parents=True, exist_ok=True)
    for slug, palette in colors.items():
        image = draw_laptop(size, palette, variant=variant)
        image.save(out_dir / f"{slug}.png", optimize=True)


def main() -> None:
    save_set("neo", NEO_COLORS, "neo", (640, 420))
    save_set("air-13", AIR_COLORS, "air-13", (700, 460))
    save_set("air-15", AIR_COLORS, "air-15", (820, 480))
    save_set("pro-14", PRO_COLORS, "pro-14", (760, 470))
    save_set("pro-16", PRO_COLORS, "pro-16", (900, 500))
    print("Generated MacBook images in", ROOT)


if __name__ == "__main__":
    main()
