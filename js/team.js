cates = {
    "mem": "Members",
}
users = {
    "Nathan Chen": {
        name: ["Nathan Chen", "陈广宇"],
        title: "Initiator & Co-Founder",
        cate: ["mem"],
        img: "nathan.jpg",
        desc: "",
        links: {
            "&#xF09b;": "//github.com/Nathancgy",  // github
        }
    },
    "许焕桦": {
        name: ["George Xu", "许焕桦"],
        title: "Core Member",
        cate: ["mem"],
        img: "xu.jpg",
        desc: "",
        links: {
            "&#xF09b;": "",  // github
        }
    },
    "Leo Huo": {
        name: ["Leo Huo", "霍梓烨"],
        title: "Core Member",
        cate: ["mem"],
        img: "leo_huo.jpg",
        desc: "",
        links: {
            "&#xF09b;": "https://github.com/lanbinshijie",  // github
        }
    },
    "Polaris": {
        name: ["Polaris", "苏昭德"],
        title: "Core Member",
        cate: ["mem"],
        img: "su.png",
        desc: "",
        links: {
            "&#xF09b;": "",  // github
        }
    },
    "Selina": {
        name: ["Selina", "麦湘盈"],
        title: "Core Member",
        cate: ["mem"],
        img: "selina.png",
        desc: "",
        links: {
            "&#xF09b;": "",  // github
        }
    },
    "Bernie": {
        name: ["Bernie Huang", "黄锦源"],
        title: "Co-Founder",
        cate: ["mem"],
        img: "bernie.jpg",
        desc: " - 开源项目 SearXNG 贡献者\n - 哈佛大学 cs50/ddb50.vsix 贡献者",
        links: {
            "&#xF09b;": "//github.com/BernieHuang2008",  // github
        }
    },
    "Thomas": {
        name: ["Thomas Wang", "老王"],
        title: "Core Member",
        cate: ["mem"],
        img: "thomas.png",
        desc: "",
        links: {
            "&#xF09b;": "//https://github.com/cxzlw",  // github
        }
    },
    "Michelle": {
        name: ["Michelle Meng", "孟思言"],
        title: "Core Member",
        cate: ["mem"],
        img: "michelle.png",
        desc: "",
        links: {
            "&#xF09b;": "",  // github
        }
    },
    "Acbox": {
        name: ["Acbox", "刘陈阳"],
        title: "Core Member",
        cate: ["mem"],
        img: "acbox.png",
        desc: "",
        links: {
            "&#xF09b;": "//https://github.com/sheepbox8646",  // github
        }
    },
    "Carmen": {
        name: ["Carmen", "Carmen Zhang"],
        title: "Co-Founder",
        cate: ["mem"],
        img: "carmen.jpg",
        desc: "",
        links: {
            "&#xF09b;": "//github.com/CJWZhang",  // github
        }
    },
    "卢思江": {
        name: ["卢思江", "Jack Lu"],
        title: "Member",
        cate: ["mem"],
        img: "jack.jpg",
        desc: "",
        links: {
            "&#xF09b;": "",  // github
        }
    },
    "杨臻": {
        name: ["杨臻", "Leo Yang"],
        title: "Co-Founder",
        cate: ["mem"],
        img: "leo_yang.jpg",
        desc: "",
        links: {
            "&#xF09b;": "//github.com/Potato1145141919810",  // github
        }
    },
    "Richard": {
        name: ["Richard", "Richard"],
        title: "Co-Founder",
        cate: ["mem"],
        img: "richard.jpg",
        desc: "",
        links: {
            "&#xF09b;": "//github.com/Richard-31415",  // github
        }
    },
    "wang": {
        name: ["王靖元"],
        title: "Member",
        cate: ["mem"],
        img: "wang.png",
        desc: "",
        links: {
        }
    }
}

var categories = ["mem"];
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

function showMemberModal(member) {
    const modal = document.querySelector('.member-modal');
    const content = modal.querySelector('.modal-content');
    
    content.querySelector('.modal-profile-img').src = `/img/p/${member.img}`;
    content.querySelector('.modal-name').textContent = member.name.join(' / ');
    content.querySelector('.modal-title').textContent = member.title;
    content.querySelector('.modal-desc').textContent = member.desc || 'No description available';
    
    const socialDiv = content.querySelector('.modal-social');
    socialDiv.innerHTML = '';
    if (member.links) {
        for (let link in member.links) {
            const a = document.createElement('a');
            a.href = member.links[link];
            a.innerHTML = `<i class="fa">${link}</i>`;
            a.target = '_blank';
            socialDiv.appendChild(a);
        }
    }
    
    requestAnimationFrame(() => {
        modal.style.display = 'flex';
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    });
    document.body.style.overflow = 'hidden';
}

// Update modal close function
function closeModal() {
    const modal = document.querySelector('.member-modal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

document.querySelector('.modal-close').addEventListener('click', closeModal);

document.querySelector('.member-modal').addEventListener('click', (e) => {
    if (e.target === document.querySelector('.member-modal')) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.querySelector('.member-modal').style.display === 'flex') {
        closeModal();
    }
});

categories.forEach(c => {
    var div = document.createElement("div");
    div.classList.add("team-category");
    div.classList.add("flipcard-container");
    div.setAttribute("data-user-type", c);
    var title = document.createElement("h2");
    title.innerText = cates[c];
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
        // Add click event
        user_div.addEventListener('click', () => showMemberModal(u));
        // append the user
        div.appendChild(user_div);
    })
    document.querySelector("#content2").appendChild(div);
    document.querySelector("#content2").appendChild(document.createElement("hr"));
})