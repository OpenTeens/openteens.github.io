
from PIL import Image
import os

cwd = os.path.join(os.getcwd(), "img", "logo")

## ================== CONFIGS ================== ##

SOURCE = "2024.png"

TEMPLATES = [
    # ["template name", [(x0, y0), (x1, y1)]]
    ["full_white.png", [(200, 50), (840, 710)]],
    ["with_text.png", [(42, 20), (540, 526)]],
    ["circle_white.png", [(0, -7), (677, 670)]],
]

## ================ END CONFIGS ================ ##

source_img = Image.open(os.path.join(cwd, SOURCE))
source_img = source_img.convert("RGBA")

for template in TEMPLATES:
    name, coords = template

    # read template
    template_img = Image.open(os.path.join(cwd, "templates", name))
    template_img = template_img.convert("RGBA")
    
    if coords is not None:
        # get coords
        p0, p1 = coords

        # resize source image with coords
        width = p1[0] - p0[0]
        height = p1[1] - p0[1]
        source_img_resized = source_img.resize((width, height))

        # paste source image to template
        template_img.paste(source_img_resized, p0, source_img_resized)

    # save
    template_img.save(os.path.join(cwd, "build", name))
