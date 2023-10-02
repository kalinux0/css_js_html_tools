function copen(elem) {
    var a, b, c, d, e, f;
    a = elem.dataset.to;
    b = elem.dataset.the;
    c = elem.dataset.next;
    d = elem.dataset.tp;
    e = elem.dataset.tpc;
    f = elem.dataset.tot;
    if (typeof b !== 'undefined') {
        document.getElementById(b).dataset.state = '';
    }
    if (typeof a !== 'undefined') {
        document.getElementById(a).dataset.state = 'open';
    } else if (typeof c !== 'undefined') {
        if (elem.nextElementSibling.dataset.state == 'open') {
            elem.nextElementSibling.dataset.state = '';
        } else {
            elem.nextElementSibling.dataset.state = 'open';
        }
    } else if (typeof d !== 'undefined') {
        while (d = d - 1) {
            elem = elem.parentNode;
        }
        elem.parentNode.dataset.state = 'open';
    } else if (typeof e !== 'undefined') {
        while (e = e - 1) {
            elem = elem.parentNode;
        }
        elem.parentNode.dataset.state = '';
    } else if (typeof f !== 'undefined') {
        b = document.getElementById(f);
        if (b.dataset.state == 'open') {
            b.dataset.state = '';
        } else {
            b.dataset.state = 'open';
        }
    } else {
        if (elem.dataset.state == 'open') {
            elem.dataset.state = '';
        } else {
            elem.dataset.state = 'open';
        }
    }
}

function mcopen(a, b) {
    var c, d, e, f, g, i;
    g = a.parentNode;
    c = document.getElementById(g.getAttribute('to'));
    d = c.children;
    e = d.length;
    for (i = 0; i < e; i++) {
        f = d[i];
        if (i != b) {
            f.removeAttribute('data-state');
        } else {
            f.dataset.state = 'open';
        }
    }
    c = g.children;
    d = c.length;
    for (i = 0; i < d; i++) {
        e = c[i];
        if (i != b) {
            e.dataset.state = '';
        } else {
            e.dataset.state = 'open';
        }
    }
}