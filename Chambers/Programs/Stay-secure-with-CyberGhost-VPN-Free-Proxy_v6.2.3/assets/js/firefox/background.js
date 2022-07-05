if ((typeof browser !== "undefined")) {

    browser.proxy.register("assets/js/firefox/pac.js").then(function () {
        //console.log("REGISTER DONE");
    }).catch(function (reason) {
        console.log("ERROR", reason);
    });
}