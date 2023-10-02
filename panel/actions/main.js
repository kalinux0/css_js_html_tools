function startAction(a) {
    var b, c, d, e;
    console.log(a);
    if (a.dataset.before) {
        eval(a.dataset.before.replace("(this)", "(" + getVarName({ a }) + ")"));
    }
    b = document.getElementById(a.dataset.action);
    b.dataset.state = "open";
    c = Object.keys(a.dataset);
    for (d in c) {
        e = c[d];
        b.dataset[e] = a.dataset[e];
    }
    if (a.dataset.after) {
        eval(a.dataset.after.replace("(this)", "(" + getVarName({ a }) + ")"));
    }
    a = b.getElementsByClassName("ti-actions");
    if (a.length) {
        a[0].focus();
    }
}