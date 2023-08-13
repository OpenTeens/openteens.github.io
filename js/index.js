function search() {
	var query = $("#search>input").value.trim();
	if (query) {
		console.log(query)
	}
}

$("#search>input").onkeydown = function (e) {
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
	const r_list = {
		"About": "/about",
		"Museum": "/museum",
		"Login": "/login",
	}
	if (r_list[name])
		window.location.href = r_list[name];
	else
		throw Error("Invalid Redirect Name.");
}

function btn_redirect(e) {
	var name = e.target.innerText.trim();
	redirect(name);
}


function HTTP_GET(aUrl, aCallback) {
	var anHttpRequest = new XMLHttpRequest();
	anHttpRequest.onreadystatechange = function () {
		if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
			aCallback(anHttpRequest.responseText);
	}

	anHttpRequest.open("GET", aUrl, true);
	anHttpRequest.send(null);
}


