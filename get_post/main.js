function asyncGet(url, callback) {
    var a = new XMLHttpRequest();
    a.open('GET', url);
    a.withCredentials = true;
    a.onreadystatechange = function() {
        if (a.readyState == 4) {
            if (a.status == 200) {
                callback(a.response);
            } else {
                error(errors.connection_error);
            }
        }
    };
    a.send();
}

function postJSON(url, callback, data, params) {
    var a = new XMLHttpRequest();
    a.open('POST', url);
    a.withCredentials = true;
    a.onreadystatechange = function() {
        if (a.readyState == 4) {
            if (a.status == 200) {
                callback(JSON.parse(a.responseText), params);
            } else {
                error(errors.connection_error);
            }
        }
    }
    if (typeof data != 'undefined') {
        a.setRequestHeader('Content-type', 'application/json');
        a.send(JSON.stringify(data));
    } else {
        a.send();
    }
}

function postForm(url, callback, data, params) {
    var a = new XMLHttpRequest();
    a.open('POST', url);
    a.onreadystatechange = function() {
        if (a.readyState == 4) {
            if (a.status == 200) {
                callback(JSON.parse(a.responseText), params);
            } else {
                error(errors.connection_error);
            }
        }
    }
    if (typeof data != 'undefined') {
        a.send(data);
    } else {
        a.send();
    }
}

function getJSON(url, callback) {
    var a = new XMLHttpRequest();
    a.open('GET', url);
    a.withCredentials = true;
    a.onreadystatechange = function() {
        if (a.readyState == 4) {
            if (a.status == 200) {
                callback(JSON.parse(a.responseText));
            } else {
                error(errors.connection_error);
            }
        }
    };
    a.send();
}

function postAction(a, b, c, d) {
    if (typeof c === "undefined") {
        c = "post";
    }
    if (typeof d === "undefined") {
        d = "_blank";
    }
    var e, f, g;
    e = document.createElement("form");
    e.method = c;
    e.action = a;
    e.target = d;
    for (f in b) {
        if (b.hasOwnProperty(f)) {
            g = document.createElement("input");
            g.type = "hidden";
            g.name = f;
            g.value = b[f];
            e.appendChild(g);
        }
    }
    document.body.appendChild(e);
    e.submit();
}