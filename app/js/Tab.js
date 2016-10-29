/**
 * Tab
 * Created by jaro on 28.10.16.
 */

window.$ = window.jQuery = require('jquery');

module.exports = class Tab {
    constructor() {
        this.invocedBy = null;
        this.isActive = false;
        this.favicons = [];
        this.title = "";

        this.button = $('<button type="button" id="addtab">+</button>\n');
        this.onButtonClick = event => {
            var tabs = Tabs.getInstance();
            tabs.activateTab(this);
        };

        this.webview = $('<webview src="browser://newtab">');

        var wv = this.webview[0];
        var gettingRealTabListener = (event) => {
            if (!this.isNewTab()) {
                wv.removeEventListener('did-start-loading', gettingRealTabListener);
                this.isGettingRealTab();
            }
        };

        this.webview[0].addEventListener('page-title-updated', (title) => {
            this.title = title.title;
            Tabs.getInstance().renderTitlebar();
        });
        this.webview[0].addEventListener('did-navigate', (url) => {
            Tabs.getInstance().renderTitlebar();
        });
        this.webview[0].addEventListener('page-favicon-updated', (favicons) => {
            this.favicons = favicons.favicons;
            this.button.html('<img src="' + this.favicons[this.favicons.length - 1] + '">')
        });


        wv.addEventListener('did-start-loading', gettingRealTabListener);
    }

    isNewTab() {
        return this.getUrl() == "browser://newtab";
    }

    isGettingRealTab() {
        this.webview[0].addEventListener('did-start-loading', () => {
            this.button.html('<img src="assets/icons/loading.svg">');
        });
        this.webview[0].addEventListener('did-finish-load', () => {
            if (!this.favicons) {
                this.button.html(this.getUrl().split('//')[1].substr(0, 2));
            }
        });
        this.webview[0].addEventListener('did-fail-load', (errorCode, errorDescription, validatedURL) => {
            console.log(errorCode);
            this.button.html(":(");

            //TODO: render error page
        });

        this.button.removeAttr("id");

        Tabs.getInstance().renderTabState();
    }

    getUrl() {
        return this.webview.attr("src");
    }

    setUrl(newUrl) {
        this.webview.attr("src", newUrl);
    }

    setActive() {
        this.isActive = true;
        this.button.addClass("current");
        this.webview.removeClass("hidden");
        this.webview.get(0).hidden = false;
    }

    setUnActive() {
        this.isActive = false;
        this.button.removeClass("current");
        this.webview.addClass("hidden");
        this.webview.get(0).hidden = true;
    }

    getTitle() {
        return this.title;
    }
};