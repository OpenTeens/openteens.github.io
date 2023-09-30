function HTTP_GET(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function () {
        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
    }

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
}

function HTTP_GET2(aUrl) {
    // Promise version.
    return new Promise(function (resolve, reject) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4) {
                if (anHttpRequest.status == 200) {
                    resolve(anHttpRequest.responseText);
                } else {
                    reject(new Error('HTTP_GET failed: ' + anHttpRequest.status));
                }
            }
        };

        anHttpRequest.open('GET', aUrl, true);
        anHttpRequest.send(null);
    });
}