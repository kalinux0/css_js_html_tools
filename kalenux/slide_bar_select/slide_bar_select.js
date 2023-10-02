var mouse_x;
var mouse_y;
kalenux_toggle = false;

function mouseMoved(event) {
    mouse_x = event.pageX;
    mouse_y = event.pageY;
}

window.onmousemove = mouseMoved;

function setKalenuxSlideBars() {
    var a, b, i;
    a = document.getElementsByClassName('kalenux-slide-bars');
    b = a.length;
    for (i = 0; i < b; i++) {
        kalenuxSlideBar(a[0], i);
    }
}

function kalenuxOpenSlideBar(a, b) {
    if (a.dataset.state == 'open') {
        a.dataset.state = "";
        b.dataset.state = "";
    } else {
        a.dataset.state = "open";
        b.dataset.state = "open";
    }
}

function kalenuxSlideBar(a, i) {
    var b, c, d, e, f, j, k, g, h, j, k, l, m, n, o, p, q;
    e = document.createElement('div');
    b = dataToArray(a.classList);
    b[0] = 'kalenux-slide-bar';
    e.className = b.join(' ');
    f = document.createElement('input');
    f.type = 'hidden';
    f.dataset.type = 'slide';
    if (a.id) {
        f.id = a.id;
    }
    if (a.name) {
        f.name = a.name;
    }
    if (a.onchange) {
        f.onchange = a.onchange;
    }

    g = document.createElement('div');
    g.className = 'kalenux-slide-toggles';

    g.onmousedown = enableKalenuxTouch.bind(null, g);
    g.ontouchstart = enableKalenuxTouch.bind(null, g);
    window.onmouseup = disableKalenuxTouch.bind(null);
    g.ontouchend = disableKalenuxTouch.bind(null);
    g.onmousemove = kalenuxTouched.bind(null, g);
    g.ontouchmove = kalenuxTouched.bind(null, g);

    max = parseInt(a.dataset.max);
    min = parseInt(a.dataset.min);

    h = document.createElement('div');
    h.className = 'kalenux-slide-toggle';
    h.style = 'left:0;width:100%;';

    j = document.createElement('div');
    j.className = 'kalenux-slide-toggle-text';
    j.style = 'transform: translate(calc(0px - 50%), -50%);';

    k = document.createElement('div');
    k.className = 'kalenux-slide-toggle-text-inner';
    if (a.dataset.text) {
        k.innerHTML = i + ' ' + a.dataset.text;
    } else {
        k.innerHTML = '0';
    }

    j.appendChild(k);

    d = document.createElement('div');
    d.className = 'kalenux-slide-toggle-text';
    d.style = 'transform: translate(50%, -50%);right:0';

    m = document.createElement('div');
    m.className = 'kalenux-slide-toggle-text-inner';
    if (a.dataset.text) {
        m.innerHTML = c + ' ' + a.dataset.text;
    } else {
        m.innerHTML = '+';
    }
    d.appendChild(m);

    k = document.createElement('ul');
    k.className = 'kalenux-slide-touchs';

    if (!min) {
        i = 0;
    } else {
        i = min;
    }
    s = (max - i) / 100;

    for (i = 0; i < max; i += s) {
        l = document.createElement('li');
        l.className = 'kalenux-slide-touch';
        l.dataset.value = i;
        if (!a.dataset.text) {
            l.innerHTML = i;
        } else {
            l.innerHTML = i + ' ' + a.dataset.text;
        }
        k.appendChild(l);
    }
    l = document.createElement('li');
    l.className = 'kalenux-slide-touch';
    l.dataset.value = '+';
    l.innerHTML = '+';
    k.appendChild(l);

    b = document.createElement('div');
    b.className = 'kalenux-slide-inputs';

    p = document.createElement('div');
    p.className = 'kalenux-slide-input-holder';
    q = document.createElement('input');
    q.className = 'kalenux-slide-input';
    q.placeholder = wide[1];
    q.dataset.type = 1;
    q.type = 'number';
    q.min = min;
    q.max = max - 1;
    q.oninput = kalenuxSlideInputed.bind(null, f, q);
    p.appendChild(q);
    b.appendChild(p);

    o = document.createElement('div');
    o.className = 'kalenux-slide-input-holder';
    n = document.createElement('input');
    n.className = 'kalenux-slide-input';
    n.placeholder = wide[2];
    n.dataset.type = 2;
    n.type = 'number';
    n.min = min + 1;
    n.max = max;
    n.oninput = kalenuxSlideInputed.bind(null, f, n);
    o.appendChild(n);
    b.appendChild(o);

    l = document.createElement('div');
    l.className = 'kalenux-slide-opener';
    l.onclick = kalenuxOpenSlideBar.bind(null, l, g);
    m = document.createElement('div');
    m.className = 'icon-arrow-right';
    l.appendChild(m);
    b.appendChild(l);

    g.dataset.count = max;
    e.appendChild(b);
    e.appendChild(f);
    e.appendChild(k);
    g.appendChild(h);
    g.appendChild(j);
    g.appendChild(d);
    e.appendChild(g);
    a.parentNode.appendChild(e);
    a.remove();
}

function kalenuxSlideInputed(a, b) {
    a.dataset[wide[b.dataset.type]] = b.value;
}

var wide = {
    1: 'min',
    2: 'max'
}

function kalenuxToggled(a, f, j) {
    var b, c, d, g;
    b = a.previousElementSibling;
    c = b.children;
    d = c.length;
    h = parseInt(f * d / 100);

    if (h <= c.length - 1 && h >= 0) {
        g = c[h];
    } else if (h < 0) {
        g = c[0];
    } else {
        g = c[c.length - 1]
    }

    v = g.dataset.value;
    a.parentNode.firstElementChild.children[j - 1].firstElementChild.value = v
    a.children[j].firstElementChild.innerHTML = g.innerHTML;
    b.previousElementSibling.dataset[wide[j]] = v;
    g.className = 'kalenux-slide-touch kalenux-slide-touch-selected';
}

function kalenuxTouched(a) {
    if (!kalenux_toggle) {
        return;
    }
    var b, c, d, e, f, g, h, j;
    d = a.getBoundingClientRect();
    c = mouse_x - d.left;
    e = d.width;
    if (c < 0) {
        c = 0;
    }
    if (c > e) {
        c = e;
    }
    f = c * 100 / e;
    b = a.children;
    g = b[1].getBoundingClientRect().left;
    h = b[2].getBoundingClientRect().left;
    if (((mouse_x - g < Math.abs(mouse_x - h)) && g < h) || mouse_x <= g) {
        j = 1;
    } else {
        j = 2;
    }

    if (j == 2 && mouse_x > d.right) {
        f = a.previousElementSibling.children.length - 1;
    }

    b[j].style = 'transform:translate(calc(' + e * f / 100 + 'px - 50%), -50%)';
    b[0].style = 'left:' + (g - d.left) + 'px;width:' + Math.abs(g - h) + 'px';
    kalenuxToggled(a, f, j);
}

function enableKalenuxTouch(a) {
    kalenux_toggle = true;
    kalenuxTouched(a);
}

function disableKalenuxTouch() {
    kalenux_toggle = false;
}

firer.push(function() {
    setKalenuxSlideBars()
})