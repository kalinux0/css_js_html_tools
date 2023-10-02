table_order = [4, 'desc'];
table_del_text = 'Bu mesajı silmek istediğinize emin misiniz?';
contact_categories = {
    0: 'Hepsi',
    1: "Genel",
    2: "Sipariş Durumu",
    3: "Booster Alımı",
    4: "Bug Bildirisi",
    5: "Şikayet",
    6: "Diğer"
}

function setTable(data) {
    var a, b, r, i;
    a = data.length;
    r = '';
    for (i = 0; i < a; i++) {
        b = data[i];
        r += '<tr><td>' +
            contact_categories[b.category] + '</td><td>' +
            b.name + '</td><td>' +
            b.email + '</td><td>' +
            b.message + '</td><td>' +
            b.time + '</td><td><button data-id="' +
            b.id + '" class="btn btn-delete icon-delete" onclick="setDelete(this)"></button></td></tr>';
    }
    return r;
}

firer.push(function() {
    table_url = user_api_url + 'get/contact';
    table_del_url = user_api_url + 'del/contact';
    detailedTable();
});