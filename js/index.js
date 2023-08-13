function search() {
	var query = $("#search>input").value.trim();
	if (query) {
		console.log(query)
	}
}

$("#search>input").onkeydown = function(e) {
	if (e.key == 'Enter')
		search();
}


function typing_effect(div, text) {
	function helper(i) {
		if (i >= text.length) {
			div.innerHTML = div.innerHTML.replaceAll('&nbsp;', ' ')
			return "Completed.";
		}

		if (text[i] == ' ')
			div.innerHTML += '&nbsp;';
		else
			div.innerText += text[i];

		setTimeout(helper, 50, i + 1);
	}

	helper(0);
}

function redirect(name) {
	r_list = {
		"About": "/about.html",
		"Museum": "/museum/index.html",
		"Login": "/login.html",
	}
	if (r_list[name])
		window.location.href = r_list[name];
	else
		throw Error("Invalid Redirect Name.");
}

function btn_redirect(e) {
	name = e.target.innerText.trim();
	redirect(name);
}


$$("nav#navigator>ul>li>button").forEach(btn => {
	btn.onclick = btn_redirect;
})