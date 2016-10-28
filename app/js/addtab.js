/**
 * Created by jaro on 28.10.16.
 */
window.$ = window.jQuery = require('jquery');

$(function () {
    $("#addtab").click(newTab);
});

function newTab() {
    var url = tabs[activeTab] ? tabs[activeTab].url : null;
    if(url != "browser://newtab") {  // otherwise user is currently in newtab
        tabs.push({
            url: "browser://newtab",

            icon: null,
            title: "newTab",
            invokedBy: null,

            _id: "addtab"
        });
    }
}