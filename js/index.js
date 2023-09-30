function search() {
	var url_query = decodeURI(window.location.href.split('/')[4].trim().toLowerCase());
	var query = $("#search>input").value.trim();
	if (query && query != url_query) {
		window.location.href = "/search/" + query;
	}
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
	window.location.href = `/${name}`;
}

function btn_redirect(e) {
	var name = e.target.innerText.trim().toLowerCase();
	redirect(name);
}
