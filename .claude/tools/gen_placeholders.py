# Generates the flat SVG placeholders used by the Task 1 landing page.
# Run from the repository root:
#   python .claude/tools/gen_placeholders.py

import os

OUT_DIR = os.path.join("Task 1st Responsive Layout with HTML5 and CSS3",
                       "Solution", "images")

SHOE = ("M6,25 C6,22 8,20.5 11,20.5 L20,20.5 L26,12.5 C27,11 29,10.5 30.5,11.5 "
        "L34,14 C35.2,14.8 35.7,16.3 35.3,17.7 L34.6,20.5 C34.2,22.2 35.3,23.9 "
        "37,24.3 L54,28.5 C56.4,29.1 58,31.2 58,33.7 L58,34.5 C58,35.3 57.3,36 "
        "56.5,36 L7.5,36 C6.7,36 6,35.3 6,34.5 Z")

SOLE = ("M6,32.6 L58,32.6 L58,34.5 C58,35.3 57.3,36 56.5,36 L7.5,36 "
        "C6.7,36 6,35.3 6,34.5 Z")

LACES = (("21.5,18.5", "25.5,21.5"),
         ("23,16.5", "27,19.5"),
         ("24.5,14.5", "28.5,17.5"))


def shoe_group(transform, upper, sole, lace):
    laces = "\n".join(
        '    <path d="M%s L%s" stroke="%s" stroke-width="0.9" '
        'stroke-linecap="round" fill="none"/>' % (a, b, lace)
        for a, b in LACES)
    return (
        '  <g transform="%s">\n'
        '    <path d="%s" fill="%s"/>\n'
        '    <path d="%s" fill="%s"/>\n'
        '%s\n'
        '  </g>' % (transform, SHOE, upper, SOLE, sole, laces))


def product(name, circle, upper, sole, lace):
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360" '
        'role="img" aria-label="Product photo placeholder">\n'
        '  <rect width="480" height="360" fill="#f4f4f6"/>\n'
        '  <circle cx="240" cy="180" r="128" fill="%s"/>\n'
        '%s\n'
        '</svg>\n' % (circle, shoe_group("translate(80,90) scale(5)",
                                         upper, sole, lace)))
    write(name, svg)


def write(name, svg):
    with open(os.path.join(OUT_DIR, name), "w", encoding="utf-8") as f:
        f.write(svg)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    product("product-1.svg", "#f7d9e2", "#15151a", "#ffffff", "#ffffff")
    product("product-2.svg", "#1a1a1f", "#ffffff", "#d9d9e0", "#15151a")
    product("product-3.svg", "#d8efe4", "#15151a", "#ffffff", "#ffffff")
    product("product-4.svg", "#ecedf2", "#ec1c5f", "#ffffff", "#ffffff")
    product("product-5.svg", "#f3e7d4", "#15151a", "#f3e7d4", "#f3e7d4")
    product("product-6.svg", "#dde2f7", "#15151a", "#ffffff", "#ffffff")

    # Hero: transparent background, the pink circle behind it is drawn in CSS.
    write("hero-sneaker.svg",
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" '
          'role="img" aria-label="Sneaker illustration">\n'
          '%s\n</svg>\n' % shoe_group("translate(20,20) scale(9.4)",
                                      "#15151a", "#ffffff", "#ffffff"))

    # Wide dark panel for the brand section.
    write("brand.svg",
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 720" '
          'role="img" aria-label="Brand section illustration">\n'
          '  <rect width="640" height="720" fill="#17171c"/>\n'
          '  <circle cx="320" cy="360" r="210" fill="#20202a"/>\n'
          '  <circle cx="320" cy="360" r="210" fill="none" stroke="#ec1c5f" '
          'stroke-width="2" stroke-opacity="0.55"/>\n'
          '%s\n</svg>\n' % shoe_group("translate(140,235) scale(5.6)",
                                      "#f2f2f5", "#c9c9d2", "#17171c"))

    print("placeholders written to", OUT_DIR)


if __name__ == "__main__":
    main()
