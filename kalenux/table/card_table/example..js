table_del_text = '@are_you_sure_you_want_to_cancel_your_order@';

function setTable(data) {
    var a, b, c, r, m, l;
    a = data.length;
    r = '';
    for (i = 0; i < a; i++) {
        b = data[i];
        c = [];
        c.push('data-id="' + b.order_id + '"');
        if (b.order_type == 2) {
            c.push('data-product="' + packet_cats[18] + '"');
            c.push('data-account_id="' + b.product_id + '"');
        } else {
            c.push('data-product="' + packet_cats[b.product_id] + '"');
        }
        c.push('data-price="' + b.price + '"');
        c = c.join(' ');
        m = '';
        m += '<button class="ti-actions" ' + c + ' onclick="dreorder(this)"><span class="icon-payment"></span><p>@pay@</p></button>';
        m += '<button class="ti-actions" ' + c + ' onclick="setDelete(this)"><span class="icon-cancel_it"></span><p>@cancel@</p></button>';
        r += parseOrder(b);
        r += '<div class="ti-footer">' + m + '</div></div>'
    }
    return r;
}

firer.push(function() {
    table_url = user_api_url + 'get/my_orders';
    table_del_url = user_api_url + 'do/cancel_order';
    cardTable();
});