/**
 * Tab
 * Created by jaro on 28.10.16.
 */

window.$ = window.jQuery = require('jquery');

module.exports = class Tab {
    constructor() {
        this.invocedBy = null;
        this.isActive = false;

        this.button = $('<button type="button" id="addtab">+</button>\n');
        this.webview = $('<webview src="browser://newtab">');
        this.webview.on("change", event => {
            console.log(event);
        });
    }

    isNewTab() {
        return this.getUrl() == "browser://newtab";
    }

    getUrl() {
        return this.webview.attr("src");
    }
    setUrl(newUrl) {
        this.webview.attr("src", newUrl);
        this.onUrlChange();
    }

    onUrlChange() {
        this.button.html('<img src="assets/icons/loading.svg">');
        Tabs.getInstance().renderTabState();
    }

    setActive() {
        this.isActive = true;
        this.button.addClass("current");
        this.webview.addClass("current");
    }

    setUnActive() {
        this.isActive = false;
        this.button.removeClass("current");
        this.webview.removeClass("current");
    }

    getTitle() {
        return this.webview[0].getTitle();
    }
};