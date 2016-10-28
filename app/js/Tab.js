/**
 * Tab
 * Created by jaro on 28.10.16.
 */

window.$ = window.jQuery = require('jquery');

module.exports = class Tab {
    constructor() {
        this.invocedBy = null;

        this.button = $('<button type="button" id="addtab">+</button>\n');
        this.webview = $('<webview src="browser://newtab">');
    }

    isNewTab() {
        return this.getUrl() == "browser://newtab";
    }

    getUrl() {
        return this.webview.attr("src");
    }
    setUrl(newUrl) {
        this.webview.attr("src", newUrl);
    }

    setActive() {
        this.button.addClass("active");
        this.webview.addClass("active");
    }

    setUnActive() {
        this.button.removeClass("active");
        this.webview.removeClass("active");
    }
}