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
    f.onchange = a.onchange;
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
    a.remove();
}

function kalenuxOption(a) {
    var b, c, d, e, f, g, h, j, i;
    e = document.createElement('div');
    e.className = 'kalenux-option';
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
    f.onchange = a.onchange;
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
    a.remove();
}

function kalenuxSelectOnoff(a, b) {
    a = document.getElementById(a);
    if (b === 1) {
        a.checked = true;
        a.value = 1;
    } else {
        a.checked = false;
        a.value = 0;
    }
}

firer.push(function() {
    setElems('kalenux-onoffs', kalenuxOnoff);
});