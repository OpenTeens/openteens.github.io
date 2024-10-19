cates = {
    "cof": "Co-funders",
    "core": "Core Members",
    "mem": "Members",
}
users = {
    "黄锦源": {
        name: ["黄锦源", "Bernie J. Huang"],
        title: "Co-funder",
        cate: ["core", "cof", "mem"],
        img: "bernie.jpg",
        desc: " - 开源项目 SearXNG 贡献者\n - 哈佛大学 cs50/ddb50.vsix 贡献者",
        links: {
            "&#xF09b;": "//github.com/BernieHuang2008",  // github
        }
    },
    "陈广宇": {
        name: ["陈广宇", "Nathan Chen"],
        title: "Co-funder",
        cate: ["core", "cof", "mem"],
        img: "nathan.jpg",
        desc: "",
        links: {
            "&#xF09b;": "//github.com/Nathancgy",  // github
        }
    },
    "Carmen": {
        name: ["Carmen", "Carmen Zhang"],
        title: "Co-funder",
        cate: ["cof", "mem"],
        img: "carmen.jpg",
        desc: "",
        links: {
            "&#xF09b;": "//github.com/CJWZhang",  // github
        }
    },
    "霍梓烨": {
        name: ["霍梓烨", "Leo Huo"],
        title: "Core Member",
        cate: ["core", "mem"],
        img: "leo_huo.jpg",
        desc: "",
        links: {
            "&#xF09b;": "https://github.com/lanbinshijie",  // github
        }
    },
    "卢思江": {
        name: ["卢思江", "Jack Lu"],
        title: "Core Member",
        cate: ["core", "mem"],
        img: "jack.jpg",
        desc: "",
    },
    "许焕桦": {
        name: ["许焕桦", "George Xu"],
        title: "Core Member",
        cate: ["core", "mem"],
        img: "xu.jpg",
        desc: "",
    },
    "杨臻": {
        name: ["杨臻", "Leo Yang"],
        title: "Co-funder",
        cate: ["cof", "mem"],
        img: "leo_yang.jpg",
        desc: "",
        links: {
            "&#xF09b;": "//github.com/Potato1145141919810",  // github
        }
    },
    "Richard": {
        name: ["Richard", "Richard"],
        title: "Co-funder",
        cate: ["cof", "mem"],
        img: "richard.jpg",
        desc: "",
        links: {
            "&#xF09b;": "//github.com/Richard-31415",  // github
        }
    },
}

var categories = ["core", "cof", "mem"];
var sorted_by_cate = {};
for (user_name in users) {
    var u = users[user_name];
    var cate = u.cate;
    cate.forEach(c => {
        if (sorted_by_cate[c] == undefined) {
            sorted_by_cate[c] = [];
        }
        sorted_by_cate[c].push(u);
    })
}

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

// shuffleArray(sorted_by_cate["Co-funder"]);
// shuffleArray(sorted_by_cate["core"]);
// shuffleArray(sorted_by_cate["member"]);

categories.forEach(c => {
    var div = document.createElement("div");
    div.classList.add("team-category");
    div.classList.add("flipcard-container");
    div.setAttribute("data-user-type", c);
    // category title
    var title = document.createElement("h2");
    title.innerText = cates[c];
    div.appendChild(title);
    // users
    sorted_by_cate[c].forEach(u => {
        // most parent div
        var user_div = document.createElement("div");
        user_div.classList.add("user-card");
        // profile
        var profile = document.createElement("div");
        profile.classList.add("profile");
        // profile img
        user_div.style.backgroundImage = `url('/img/p/${u.img}')`;
        // profile name
        var name = document.createElement("h3");
        name.innerText = u.name[0];
        profile.appendChild(name);
        // profile social-link
        if (u.links) {
            var social_link = document.createElement("div");
            social_link.classList.add("social-media-links");
            for (l in u.links) {
                var a = document.createElement("a");
                a.setAttribute("href", u.links[l]);
                a.innerHTML = `<span class="fa">${l}</span>`;
                social_link.appendChild(a);
            }
            profile.appendChild(social_link);
        }
        // profile end
        user_div.appendChild(profile);
        // role
        var role = document.createElement("p");
        role.classList.add("role");
        role.innerText = u.title;
        user_div.appendChild(role);
        // desc
        var desc = document.createElement("p");
        desc.classList.add("desc");
        desc.innerText = u.desc;
        user_div.appendChild(desc);
        // append the user
        div.appendChild(user_div);
    })
    document.querySelector("#content2").appendChild(div);
    document.querySelector("#content2").appendChild(document.createElement("hr"));
})