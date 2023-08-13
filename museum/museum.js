museum = [{
		time: "2023/8/11  (11:35)",
		img: "img/logo_v1.png",
		desc: "The first version of OpenTeens' logo, designed by @BernieHuang.\n\n There's an Open-Source-Community Ring with a teenager inside.",
	},
	{
		time: "2023/8/11  (11:47)",
		img: "img/logo_v1.1.jpg",
		desc: "Logo v1.1, improved by @Carmen."
	}
].reverse()

window.onload = function() {
	museum.forEach(collection => {
		var div = document.createElement("div");
		div.classList.add("collection");

		if (collection.time) {
			var time = document.createElement("span");
			time.classList.add("time");
			time.innerText = collection.time;
			div.appendChild(time);
		}
		if (collection.img) {
			var img = document.createElement("img");
			img.src = collection.img;
			div.appendChild(img);
		}
		if (collection.desc) {
			var desc = document.createElement("p");
			desc.classList.add("desc");
			desc.innerText = collection.desc;
			div.appendChild(desc);
		}

		$("#museum").appendChild(div);
	})
}