# Draws the ER diagram for Task 4 as a plain SVG file.
# Run from the repository root:
#   python .claude/tools/gen_er_diagram.py

import os

OUT = os.path.join("Task 4th Database Design", "Solution", "er-diagram.svg")

TITLE_H = 30
ROW_H = 22
PAD_B = 8
BOX_W = 280

C_BORDER = "#c9c9d2"
C_TITLE_BG = "#15151a"
C_TITLE_TX = "#ffffff"
C_TEXT = "#15151a"
C_TYPE = "#6c6c78"
C_PK = "#ec1c5f"
C_FK = "#2f6fd0"
C_LINE = "#6c6c78"

# name: (x, y, [(field, type, key), ...])
TABLES = {
    "brand": (40, 40, [
        ("brand_id", "int", "PK"),
        ("name", "varchar(80)", ""),
        ("country", "varchar(60)", ""),
    ]),
    "category": (40, 200, [
        ("category_id", "int", "PK"),
        ("name", "varchar(80)", ""),
    ]),
    "size": (40, 340, [
        ("size_id", "int", "PK"),
        ("eu_size", "decimal(4,1)", ""),
        ("us_size", "decimal(4,1)", ""),
    ]),
    "product": (430, 40, [
        ("product_id", "int", "PK"),
        ("brand_id", "int", "FK"),
        ("category_id", "int", "FK"),
        ("name", "varchar(120)", ""),
        ("description", "text", ""),
        ("price", "decimal(10,2)", ""),
        ("is_active", "boolean", ""),
        ("created_at", "datetime", ""),
    ]),
    "product_size": (430, 340, [
        ("product_size_id", "int", "PK"),
        ("product_id", "int", "FK"),
        ("size_id", "int", "FK"),
        ("stock_quantity", "int", ""),
    ]),
    "order_item": (820, 340, [
        ("order_item_id", "int", "PK"),
        ("order_id", "int", "FK"),
        ("product_size_id", "int", "FK"),
        ("quantity", "int", ""),
        ("unit_price", "decimal(10,2)", ""),
    ]),
    "customer_order": (1190, 340, [
        ("order_id", "int", "PK"),
        ("customer_id", "int", "FK"),
        ("status", "varchar(20)", ""),
        ("delivery_address", "varchar(200)", ""),
        ("created_at", "datetime", ""),
    ]),
    "customer": (1190, 40, [
        ("customer_id", "int", "PK"),
        ("first_name", "varchar(60)", ""),
        ("last_name", "varchar(60)", ""),
        ("email", "varchar(120)", ""),
        ("phone", "varchar(20)", ""),
        ("created_at", "datetime", ""),
    ]),
    "review": (820, 580, [
        ("review_id", "int", "PK"),
        ("product_id", "int", "FK"),
        ("customer_id", "int", "FK"),
        ("rating", "int", ""),
        ("comment", "text", ""),
        ("created_at", "datetime", ""),
    ]),
}

# (points, label position of "1", label position of "many")
LINKS = [
    ([(320, 92), (430, 92)], (334, 86), (416, 86)),
    ([(320, 241), (375, 241), (375, 140), (430, 140)], (334, 235), (416, 134)),
    ([(320, 392), (430, 392)], (334, 386), (416, 386)),
    ([(570, 254), (570, 340)], (578, 270), (578, 332)),
    ([(710, 403), (820, 403)], (724, 397), (806, 397)),
    ([(1190, 414), (1100, 414)], (1176, 408), (1114, 408)),
    ([(1320, 210), (1320, 340)], (1328, 226), (1328, 332)),
    ([(710, 230), (765, 230), (765, 620), (820, 620)], (724, 224), (806, 614)),
    ([(1400, 210), (1510, 210), (1510, 700), (1100, 700)], (1414, 224), (1114, 694)),
]


def box_height(fields):
    return TITLE_H + len(fields) * ROW_H + PAD_B


def draw_table(name, x, y, fields):
    h = box_height(fields)
    out = ['  <g>']
    out.append('    <rect x="%d" y="%d" width="%d" height="%d" fill="#ffffff" '
               'stroke="%s" stroke-width="1.5"/>' % (x, y, BOX_W, h, C_BORDER))
    out.append('    <rect x="%d" y="%d" width="%d" height="%d" fill="%s"/>'
               % (x, y, BOX_W, TITLE_H, C_TITLE_BG))
    out.append('    <text x="%d" y="%d" fill="%s" font-family="Arial, sans-serif" '
               'font-size="14" font-weight="bold">%s</text>'
               % (x + 12, y + TITLE_H - 9, C_TITLE_TX, name))

    for i, (field, ftype, key) in enumerate(fields):
        ty = y + TITLE_H + ROW_H * i + 15
        if key:
            color = C_PK if key == "PK" else C_FK
            out.append('    <text x="%d" y="%d" fill="%s" font-family="Arial, sans-serif" '
                       'font-size="10" font-weight="bold">%s</text>'
                       % (x + 10, ty, color, key))
        weight = "bold" if key == "PK" else "normal"
        out.append('    <text x="%d" y="%d" fill="%s" font-family="Arial, sans-serif" '
                   'font-size="12" font-weight="%s">%s</text>'
                   % (x + 38, ty, C_TEXT, weight, field))
        out.append('    <text x="%d" y="%d" fill="%s" font-family="Arial, sans-serif" '
                   'font-size="11" text-anchor="end">%s</text>'
                   % (x + BOX_W - 12, ty, C_TYPE, ftype))
    out.append('  </g>')
    return "\n".join(out)


def draw_link(points, one_pos, many_pos):
    path = " ".join("%s%d %d" % ("M" if i == 0 else "L", px, py)
                    for i, (px, py) in enumerate(points))
    out = ['  <g>']
    out.append('    <path d="%s" fill="none" stroke="%s" stroke-width="1.5"/>'
               % (path, C_LINE))
    for (px, py) in (points[0], points[-1]):
        out.append('    <circle cx="%d" cy="%d" r="3" fill="%s"/>' % (px, py, C_LINE))
    out.append('    <text x="%d" y="%d" fill="%s" font-family="Arial, sans-serif" '
               'font-size="13" font-weight="bold">1</text>' % (one_pos[0], one_pos[1], C_TEXT))
    out.append('    <text x="%d" y="%d" fill="%s" font-family="Arial, sans-serif" '
               'font-size="15" font-weight="bold">&#8734;</text>'
               % (many_pos[0], many_pos[1], C_TEXT))
    out.append('  </g>')
    return "\n".join(out)


def main():
    parts = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1560 830" '
             'width="1560" height="830" role="img" '
             'aria-label="ER diagram of the Dream Sneakers database">',
             '  <rect width="1560" height="830" fill="#ffffff"/>']

    for points, one_pos, many_pos in LINKS:
        parts.append(draw_link(points, one_pos, many_pos))

    for name, (x, y, fields) in TABLES.items():
        parts.append(draw_table(name, x, y, fields))

    # legend
    parts.append(
        '  <g font-family="Arial, sans-serif" font-size="12">\n'
        '    <text x="40" y="790" fill="%s" font-weight="bold">PK</text>\n'
        '    <text x="66" y="790" fill="%s">первичный ключ</text>\n'
        '    <text x="190" y="790" fill="%s" font-weight="bold">FK</text>\n'
        '    <text x="216" y="790" fill="%s">внешний ключ</text>\n'
        '    <text x="336" y="790" fill="%s" font-weight="bold">1 &#8734;</text>\n'
        '    <text x="372" y="790" fill="%s">связь один ко многим</text>\n'
        '  </g>' % (C_PK, C_TEXT, C_FK, C_TEXT, C_TEXT, C_TEXT))

    parts.append('</svg>')

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(parts) + "\n")
    print("written", OUT)


if __name__ == "__main__":
    main()
