$$(".flipcard-container").forEach(ele => {
    if (ele.children.length < 3) {
        ele.children[0].classList.add("front");
        return;
    }

    ele.lastElementChild.classList.add("fall");
    ele.firstElementChild.classList.add("front");
    ele.firstElementChild.nextElementSibling.classList.add("follow");

    // listener
    ele.addEventListener("click", () => {
        curr_front = ele.querySelector(".front");
        curr_follow = ele.querySelector(".follow");
        curr_fall = ele.querySelector(".fall");

        curr_front.classList.remove("front");
        curr_follow.classList.add("front");

        curr_follow.classList.remove("follow");
        (curr_follow.nextElementSibling || ele.firstElementChild).classList.add("follow");

        curr_fall.classList.remove("fall");
        curr_front.classList.add("fall");
    })
})
