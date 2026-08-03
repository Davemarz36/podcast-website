from pathlib import Path

from PIL import Image, ImageEnhance
from reportlab.lib.colors import HexColor, white
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "partnership-deck.pdf"
SOURCE_IMAGE = ROOT / "public" / "images" / "podcast.png"
TEMP_IMAGE = Path("/tmp/people-stories-partnership-photo.jpg")

PAGE_WIDTH = 960
PAGE_HEIGHT = 540
MARGIN = 56

BLACK = HexColor("#090503")
WHITE = HexColor("#FFFFFF")
SOFT_WHITE = HexColor("#F4F2EF")
GREY = HexColor("#74706D")
LIGHT_GREY = HexColor("#D8D4D0")
MID_GREY = HexColor("#A9A39F")

PROJECT_NAME = "People&Stories"
CONTACT_LINE = "Start the conversation at our /partner page."


def prepare_image():
    image = Image.open(SOURCE_IMAGE).convert("L")
    image = ImageEnhance.Contrast(image).enhance(1.12).convert("RGB")
    image.save(TEMP_IMAGE, quality=92)


def wrap_text(text, font_name, font_size, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if line and stringWidth(candidate, font_name, font_size) > max_width:
            lines.append(line)
            line = word
        else:
            line = candidate
    if line:
        lines.append(line)
    return lines


def draw_text(c, text, x, y, max_width, font="Helvetica", size=18, leading=None, color=BLACK):
    leading = leading or size * 1.25
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap_text(text, font, size, max_width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_label(c, text, x, y, color=GREY):
    c.setFillColor(color)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(x, y, text.upper())


def draw_rule(c, x1, y1, x2, y2, color=LIGHT_GREY, width=0.8):
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y1, x2, y2)


def draw_brand(c, dark=False):
    c.setFont("Helvetica-Bold", 10)
    c.setFillColor(WHITE if dark else BLACK)
    c.drawString(MARGIN, PAGE_HEIGHT - 35, PROJECT_NAME)


def draw_page_number(c, page, dark=False):
    c.setFont("Helvetica", 8)
    c.setFillColor(MID_GREY if dark else GREY)
    c.drawRightString(PAGE_WIDTH - MARGIN, 26, f"{page:02d} / 08")


def draw_cover_image(c, path, x, y, width, height):
    image = Image.open(path)
    image_width, image_height = image.size
    scale = max(width / image_width, height / image_height)
    draw_width = image_width * scale
    draw_height = image_height * scale
    offset_x = x + (width - draw_width) / 2
    offset_y = y + (height - draw_height) / 2
    path_clip = c.beginPath()
    path_clip.rect(x, y, width, height)
    c.saveState()
    c.clipPath(path_clip, stroke=0, fill=0)
    c.drawImage(ImageReader(path), offset_x, offset_y, draw_width, draw_height)
    c.restoreState()


def slide_one(c):
    c.setFillColor(BLACK)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    image_x = 565
    draw_cover_image(c, TEMP_IMAGE, image_x, 0, PAGE_WIDTH - image_x, PAGE_HEIGHT)
    c.setFillColor(BLACK)
    c.rect(0, 0, image_x, PAGE_HEIGHT, fill=1, stroke=0)
    draw_brand(c, dark=True)
    draw_label(c, "Partnership deck / 2026", MARGIN, 410, MID_GREY)
    y = draw_text(
        c,
        "Partner with us to give meaningful stories the platform they deserve.",
        MARGIN,
        365,
        450,
        font="Helvetica-Bold",
        size=36,
        leading=39,
        color=WHITE,
    )
    draw_text(
        c,
        "Honest conversations. Ordinary lives. Extraordinary courage.",
        MARGIN,
        y - 20,
        390,
        size=15,
        leading=22,
        color=MID_GREY,
    )
    c.setStrokeColor(WHITE)
    c.setLineWidth(2)
    c.line(MARGIN, 56, MARGIN + 72, 56)
    c.setFont("Helvetica", 9)
    c.setFillColor(MID_GREY)
    c.drawString(MARGIN + 88, 52, "Partnership introduction")


def slide_two(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    draw_brand(c)
    draw_label(c, "The opportunity", MARGIN, 425)
    draw_text(
        c,
        "Some of the stories people need most are still hidden inside ordinary introductions.",
        MARGIN,
        380,
        780,
        font="Helvetica-Bold",
        size=34,
        leading=39,
    )
    draw_rule(c, MARGIN, 238, PAGE_WIDTH - MARGIN, 238)
    columns = [
        ("01", "People are navigating identity, migration, faith, work, family and change without seeing enough honest journeys reflected back to them."),
        ("02", "Most public stories begin after the breakthrough. We are interested in the uncertain middle, where clarity and courage are still being formed."),
        ("03", "Thoughtful long-form media can preserve those experiences with context, dignity and lasting value."),
    ]
    column_width = 250
    for index, (number, body) in enumerate(columns):
        x = MARGIN + index * 286
        draw_label(c, number, x, 205)
        draw_text(c, body, x, 177, column_width, size=13, leading=20, color=GREY)
    draw_page_number(c, 2)


def slide_three(c):
    c.setFillColor(BLACK)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    draw_brand(c, dark=True)
    draw_label(c, "What we are building", MARGIN, 425, MID_GREY)
    draw_text(
        c,
        "A global storytelling platform for people still becoming.",
        MARGIN,
        382,
        620,
        font="Helvetica-Bold",
        size=35,
        leading=40,
        color=WHITE,
    )
    items = [
        ("Long-form conversations", "Thoughtful video conversations designed for depth, reflection and human connection."),
        ("Editorial storytelling", "Documentary-minded narratives that protect the dignity and complexity of every guest."),
        ("Distributed moments", "Selected excerpts for YouTube Shorts, Instagram and Facebook that lead audiences back to the full story."),
    ]
    y = 254
    for index, (title, body) in enumerate(items, 1):
        draw_rule(c, MARGIN, y + 18, PAGE_WIDTH - MARGIN, y + 18, HexColor("#3A3532"))
        draw_label(c, f"0{index}", MARGIN, y - 4, MID_GREY)
        c.setFont("Helvetica-Bold", 17)
        c.setFillColor(WHITE)
        c.drawString(118, y - 8, title)
        draw_text(c, body, 430, y - 7, 425, size=12, leading=18, color=MID_GREY)
        y -= 72
    draw_page_number(c, 3, dark=True)


def slide_four(c):
    c.setFillColor(SOFT_WHITE)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    draw_brand(c)
    draw_label(c, "Who the platform serves", MARGIN, 425)
    draw_text(
        c,
        "For people building a life while they are still finding their way.",
        MARGIN,
        382,
        700,
        font="Helvetica-Bold",
        size=35,
        leading=40,
    )
    audiences = [
        "Young adults navigating identity and purpose",
        "Immigrants building lives away from home",
        "Emerging professionals, creatives and founders",
        "Christians connecting faith with everyday life",
        "People experiencing uncertainty or transition",
        "Listeners who value meaningful long-form conversations",
    ]
    y_positions = [235, 169, 103]
    for index, audience in enumerate(audiences):
        col = index % 2
        row = index // 2
        x = MARGIN + col * 438
        y = y_positions[row]
        draw_rule(c, x, y + 24, x + 390, y + 24)
        draw_label(c, f"0{index + 1}", x, y)
        draw_text(c, audience, x + 48, y + 2, 330, font="Helvetica-Bold", size=14, leading=19)
    draw_page_number(c, 4)


def slide_five(c):
    c.setFillColor(BLACK)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    draw_brand(c, dark=True)
    draw_label(c, "Our editorial promise", MARGIN, 425, MID_GREY)
    draw_text(
        c,
        "Vulnerability should be handled with dignity.",
        MARGIN,
        380,
        770,
        font="Helvetica-Bold",
        size=38,
        leading=43,
        color=WHITE,
    )
    principles = [
        ("Listen before leading", "The guest is a person, not a content asset."),
        ("Make room for complexity", "We do not manufacture drama or flatten unfinished lives into easy lessons."),
        ("Ask questions that serve", "The conversation should help guests and listeners see patterns more clearly."),
        ("Create work that remains useful", "Every story should retain meaning long after the episode ends."),
    ]
    for index, (title, body) in enumerate(principles):
        col = index % 2
        row = index // 2
        x = MARGIN + col * 438
        y = 245 - row * 118
        draw_rule(c, x, y + 31, x + 390, y + 31, HexColor("#3A3532"))
        c.setFont("Helvetica-Bold", 15)
        c.setFillColor(WHITE)
        c.drawString(x, y + 2, title)
        draw_text(c, body, x, y - 24, 365, size=12, leading=18, color=MID_GREY)
    draw_page_number(c, 5, dark=True)


def slide_six(c):
    c.setFillColor(WHITE)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    draw_brand(c)
    draw_label(c, "Partnership areas", MARGIN, 425)
    draw_text(
        c,
        "Four ways aligned partners can help meaningful stories travel further.",
        MARGIN,
        382,
        720,
        font="Helvetica-Bold",
        size=34,
        leading=39,
    )
    areas = [
        ("01", "Production and Media", "Studio, filming, editing, sound, photography and production expertise."),
        ("02", "Community and Guest Discovery", "Trusted networks that can surface thoughtful guests and under-heard perspectives."),
        ("03", "Sponsorship and Funding", "Values-aligned support that makes careful, independent storytelling sustainable."),
        ("04", "Distribution and Audience Growth", "Channels, platforms and collaborations that connect each story with the people who need it."),
    ]
    y = 250
    for number, title, body in areas:
        draw_rule(c, MARGIN, y + 26, PAGE_WIDTH - MARGIN, y + 26)
        draw_label(c, number, MARGIN, y)
        c.setFont("Helvetica-Bold", 16)
        c.setFillColor(BLACK)
        c.drawString(118, y - 4, title)
        draw_text(c, body, 430, y - 3, 420, size=12, leading=18, color=GREY)
        y -= 63
    draw_page_number(c, 6)


def slide_seven(c):
    c.setFillColor(BLACK)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    draw_brand(c, dark=True)
    draw_label(c, "How we can work together", MARGIN, 425, MID_GREY)
    draw_text(
        c,
        "Partnership starts with shared values, then takes a form that serves the story.",
        MARGIN,
        382,
        750,
        font="Helvetica-Bold",
        size=35,
        leading=40,
        color=WHITE,
    )
    steps = [
        ("01", "Discover", "Understand the shared purpose, audience and opportunity."),
        ("02", "Shape", "Define a partnership that protects editorial integrity and creates mutual value."),
        ("03", "Create", "Bring the story to life with clear roles, thoughtful production and care."),
        ("04", "Grow", "Learn from the work and build a relationship that can deepen over time."),
    ]
    y = 255
    for index, (number, title, body) in enumerate(steps):
        x = MARGIN + index * 215
        draw_rule(c, x, y + 26, x + 174, y + 26, HexColor("#3A3532"))
        draw_label(c, number, x, y, MID_GREY)
        c.setFont("Helvetica-Bold", 17)
        c.setFillColor(WHITE)
        c.drawString(x, y - 38, title)
        draw_text(c, body, x, y - 68, 174, size=11, leading=17, color=MID_GREY)
    c.setFont("Helvetica", 9)
    c.setFillColor(HexColor("#6F6965"))
    c.drawString(MARGIN, 48, "Partnership does not imply ownership of the platform or endorsement by mentors or communities in its founding story.")
    draw_page_number(c, 7, dark=True)


def slide_eight(c):
    draw_cover_image(c, TEMP_IMAGE, 0, 0, PAGE_WIDTH, PAGE_HEIGHT)
    c.setFillColor(BLACK)
    c.setFillAlpha(0.88)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillAlpha(1)
    draw_brand(c, dark=True)
    draw_label(c, "Start a conversation", MARGIN, 405, MID_GREY)
    y = draw_text(
        c,
        "Let’s build something meaningful together.",
        MARGIN,
        360,
        670,
        font="Helvetica-Bold",
        size=42,
        leading=47,
        color=WHITE,
    )
    draw_text(
        c,
        "Tell us about your organisation, community or partnership idea, and we will explore how we can work together.",
        MARGIN,
        y - 24,
        560,
        size=15,
        leading=22,
        color=MID_GREY,
    )
    c.setStrokeColor(WHITE)
    c.setLineWidth(1)
    c.rect(MARGIN, 82, 365, 54, fill=0, stroke=1)
    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(WHITE)
    c.drawString(MARGIN + 18, 102, CONTACT_LINE)
    c.setFont("Helvetica", 9)
    c.setFillColor(MID_GREY)
    c.drawString(MARGIN, 53, "Every person carries a story worth hearing.")
    draw_page_number(c, 8, dark=True)


def build_deck():
    prepare_image()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    document = canvas.Canvas(str(OUTPUT), pagesize=(PAGE_WIDTH, PAGE_HEIGHT))
    document.setTitle(f"{PROJECT_NAME} Partnership Deck")
    document.setAuthor(PROJECT_NAME)
    document.setSubject("Partnership opportunities for a global human storytelling platform")
    slides = [
        slide_one,
        slide_two,
        slide_three,
        slide_four,
        slide_five,
        slide_six,
        slide_seven,
        slide_eight,
    ]
    for slide in slides:
        slide(document)
        document.showPage()
    document.save()


if __name__ == "__main__":
    build_deck()
