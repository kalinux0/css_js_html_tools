function getAdds(a) {
    var b, c, r, i;
    a = a.getElementsByClassName("kalenux-add");
    b = a.length;
    r = {};
    for (i = 0; i < b; i++) {
        c = a[i];
        if (c.type === "checkbox") {
            r[c.dataset.name] = c.checked ? 1 : 0;
        } else {
            r[c.dataset.name] = c.value;
        }
    }
    return r;
}

function add(elem) {
    var a = elem.parentNode.parentNode.parentNode;
    var data = getAdds(a);
    if (!data) {
        error("Lütfen tüm alanları doldurunuz!");
        return;
    }

    if (typeof addSpecial != "undefined") {
        data = addSpecial(data);
    }

    postJSON(
        user_api_url + a.dataset.url,
        function(a) {
            if (a.result === 1) {
                updateTable(tables.item);
                good();
            } else {
                error("Bir hata oluştu!");
            }
        },
        data
    );
}

function setChanged(elem) {
    elem.dataset.change = 1;
}

function clearChanges(a) {
    var b, i;
    a = a.getElementsByClassName("kalenux-change");
    b = a.length;
    for (i = 0; i < b; i++) {
        a[i].dataset.change = 0;
    }
}

function getChanges(a) {
    var b, c, r, i;
    a = a.getElementsByClassName("kalenux-change");
    b = a.length;
    r = {};
    for (i = 0; i < b; i++) {
        c = a[i];
        if (c.dataset.change == 1) {
            if (c.type === "checkbox") {
                r[c.dataset.name] = c.checked ? 1 : 0;
            } else {
                r[c.dataset.name] = c.value;
            }
        }
    }
    return r;
}

function update(elem) {
    var a = elem.parentNode.parentNode.parentNode;
    var data = {
        id: a.dataset.id,
    };

    data = {...data, ...getChanges(a) };

    if (typeof updateSpecial != "undefined") {
        data = updateSpecial(data);
    }

    postJSON(
        user_api_url + a.dataset.url,
        function(a, b) {
            if (a.result === 1) {
                updateTable(tables.item);
                clearChanges(b.a);
                good();
            } else {
                error("Bir hata oluştu!");
            }
        },
        data, { a: a }
    );
}

function getSet() {
    var data;
    data = {
        id: document.getElementById('edit_' + getter).dataset.id
    }
    postJSON(user_api_url + 'get/' + getter, function(a) {
        if (a.result === 1) {
            var b, c;
            b = a.data[0];
            for (c in b) {
                d = document.getElementById('edit_' + c);
                if (d) {
                    if (c === 'content') {
                        edit_content_json.setContents(JSON.parse(b['content_json']));
                    } else {
                        e = d.dataset.type;
                        if (!e) {
                            e = '';
                        }
                        switch (e) {
                            case 'image':
                                kalenuxSetImage('edit_' + c, b[c]);
                                break;
                            case 'select':
                                kalenuxSelectOption('edit_' + c, b[c]);
                                setChanged(document.getElementById('edit_' + c));
                                break;
                            case 'date':
                                $('#edit_' + c).datepicker({
                                    language: "tr",
                                    onSelect: function(fd, date) {
                                        setChanged(document.getElementById('edit_' + c));
                                    }
                                }).data('datepicker').selectDate(new Date(b[c]));
                                break;
                            case 'onoff':
                                kalenuxSelectOnoff('edit_' + c, parseInt(b[c]));
                            default:
                                setValue('edit_' + c, b[c]);
                                break;
                        }
                    }
                }
            }
        }
    }, data);
}