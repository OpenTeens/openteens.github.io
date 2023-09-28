/* 
    ==== PartTitle ====

    Copyright (c) 2023 Bernie J. Huang
*/
window.PartTitle = class {
    constructor(DOM, parts_config) {
        if (!DOM)
            return console.error("PartTitle: source DOM not found.");

        this.source = DOM;
        this.parts = [];

        if (parts_config) {
            parts_config.forEach(part_config => {
                this.addPart(part_config);
            })
        }

        // listener
        this.source.addEventListener("mousemove", this.detect);
    }
    addPart(part) {
        /* add part */
        /* 
        part = {
            points: [[x1, y1], [x2, y2]],
            text: "title"
        }
        */

        var [p1, p2] = part.point;    // [[x1, y1], [x2, y2]]
        var text = part.text;

        this.parts.push({
            start_point: p1,
            end_point: p2,
            title: text
        })
    }
    detect(e) {
        /* detect mouse position and show title */

        // delete old title
        $$("part-title").forEach(title => {
            title.remove();
        })

        // detect mouse position
        var [cx, cy] = [e.clientX, e.clientY],
            [dx, dy] = [cx - this.source.offsetLeft, cy - this.source.offsetTop];
        this.parts.forEach(part => {
            var [p1, p2] = [part.start_point, part.end_point];
            var [x1, y1] = p1,
                [x2, y2] = p2;

            if (dx >= x1 && dx <= x2 && dy >= y1 && dy <= y2) {
                // mouse in part, show title
                alert(123)
                var title = document.createElement("part-title");
                title.innerText = part.title;
                title.style.position = "absolute";
                title.style.left = cx + "px";
                title.style.top = cy + "px";
                document.body.appendChild(title);
            }
        })
    }
}