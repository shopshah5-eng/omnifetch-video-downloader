import os
from PIL import Image, ImageDraw, ImageFont

public_dir = os.path.join(os.path.dirname(__file__), '..', 'public')
os.makedirs(public_dir, exist_ok=True)

# 1. Create crisp 32x32 Favicon ICO
favicon_size = (32, 32)
favicon_img = Image.new('RGBA', favicon_size, color=(10, 10, 12, 255))
fav_draw = ImageDraw.Draw(favicon_img)
# Draw rounded border
fav_draw.rounded_rectangle([(1, 1), (30, 30)], radius=6, fill=(0, 0, 0, 255), outline=(255, 255, 255, 180), width=1)
# Draw OF text
fav_draw.text((8, 8), "OF", fill=(255, 255, 255, 255))
favicon_path = os.path.join(public_dir, 'favicon.ico')
favicon_img.save(favicon_path, format='ICO')
print(f"Created: {favicon_path}")

# 2. Create high-resolution 1200x630 OG Image
og_width, og_height = 1200, 630
og_img = Image.new('RGB', (og_width, og_height), color=(10, 10, 14))
draw = ImageDraw.Draw(og_img)

# Gradient background effect
for y in range(og_height):
    alpha = y / og_height
    r = int(10 + alpha * 15)
    g = int(10 + alpha * 15)
    b = int(14 + alpha * 25)
    draw.line([(0, y), (og_width, y)], fill=(r, g, b))

# Brand Badge (OF Icon)
badge_box = [(120, 150), (220, 250)]
draw.rounded_rectangle(badge_box, radius=24, fill=(255, 255, 255))
draw.text((142, 175), "OF", fill=(0, 0, 0))

# Title
draw.text((260, 170), "OmniFetch", fill=(255, 255, 255))

# Subtitle / description
draw.text((120, 300), "Fast & Free Video Downloader", fill=(255, 255, 255))
draw.text((120, 360), "Save YouTube, TikTok (No Watermark), Instagram & Facebook", fill=(161, 161, 170))
draw.text((120, 410), "High Quality MP4 Video · Clean MP3 Audio · No Sign-Up", fill=(113, 113, 122))

# Bottom highlights
pills = ["⚡ Fast Extraction", "✨ No Watermarks", "🔒 100% Private", "📱 iOS, Android & PC"]
x_offset = 120
for pill in pills:
    pill_w = len(pill) * 11 + 30
    draw.rounded_rectangle([(x_offset, 480), (x_offset + pill_w, 520)], radius=12, fill=(24, 24, 27), outline=(39, 39, 42))
    draw.text((x_offset + 14, 492), pill, fill=(212, 212, 216))
    x_offset += pill_w + 16

og_path = os.path.join(public_dir, 'og-image.png')
og_img.save(og_path, format='PNG')
print(f"Created: {og_path}")
