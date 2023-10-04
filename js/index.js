function search() {
	var url_query = decodeURI((window.location.href.split('/')[4] || "").trim().toLowerCase());
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

/* Auto Display */
window.loaders.push(function () {
	function checkBoxes() {
		var triggerBottom = window.innerHeight * 5 / 6;

		var boxes = document.querySelectorAll('#peoples>.p>.home-p');
		boxes.forEach(box => {
			var boxTop = box.children[0].getBoundingClientRect().top;

			if (boxTop < triggerBottom)
				box.classList.add('show');
			else
				box.classList.remove('show');
		})
	}

	console.log(document.body.innerHTML)
	window.addEventListener('scroll', checkBoxes);
	checkBoxes();
});
