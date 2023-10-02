function kalenuxOnoff(a) {
    var b, c, d, e, f, g, h, j, i;
    e = document.createElement('div');
    e.className = 'kalenux-onoff-bar';
    f = document.createElement('input');
    f.className = a.className.replace('kalenux-onoffs', 'kalenux-onoff');
    if (a.id) {
        f.id = a.id;
    }

    if (a.dataset.value == 1) {
        f.checked = true;
    }

    g = Object.keys(a.dataset);
    for (h in g) {
        j = g[h];
        f.dataset[j] = a.dataset[j];
    }

    f.type = 'checkbox';
    g = document.createElement('div');
    g.className = 'kalenux-onoff-toggle';
    b = a.parentNode;
    e.appendChild(g);
    b.appendChild(f);
    b.appendChild(e);
    if (a.className.indexOf('kalenux-change') != -1) {
        f.className = 'kalenux-onoff kalenux-change';
    }

    if (a.onchange && a.onchange.toString().indexOf('onchange') != -1) {
        e = a.outerHTML.split('onchange="')[1];
        e = e.split('"')[0];
    } else {
        e = '';
    }

    a.remove();

    f = b.firstElementChild;

    if (typeof setChanged !== 'undefined') {
        f.outerHTML = f.outerHTML.replace('data-value', 'onchange = "setChanged(this);' + e + '" data-value')
    } else if (e) {
        f.outerHTML = f.outerHTML.replace('data-value', 'onchange = "' + e + '" data-value')
    }
}

function tableSwitch(a) {
    if (a.checked) {
        a.checked = false;
    } else {
        a.checked = true;
    }
    kalenuxSelectOnOffUpdateTable(a);
}

function kalenuxSelectOnOffUpdateTable(a) {
    data = {
        id: a.dataset.id,
    }
    data[a.dataset.name] = a.checked ? 1 : 0;

    postJSON(
        user_api_url + a.dataset.url,
        function(a, b) {
            if (a.result === 1) {
                good();
            } else {
                error("Bir hata oluştu!");
            }
        },
        data
    );
}

function kalenuxSelectOnoff(a, b) {
    a = document.getElementById(a);
    if (b === 1) {
        a.checked = true;
    } else {
        a.checked = false;
    }
}

firer.push(function() {
    setElems('kalenux-onoffs', kalenuxOnoff);
});