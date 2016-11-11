/**
 * Tab
 * Created by jaro on 28.10.16.
 */

window.$ = window.jQuery = require('jquery');

module.exports = class Tab {
    constructor(url = "browser://newtab", invocedBy = null) {
        this.invocedBy = invocedBy;
        this.isActive = false;
        this.favicons = [];
        this.title = "";
        this.isPinned = false;

        //These two variables were added by Loïc at November, 7. - 20:43
        //this.history = new Array();
        //this.historyPointer = 0;

        this.button = $('<button type="button" id="addtab"><object>+</object></button>\n');
        this.onButtonClick = event => {
            var tabs = Tabs.getInstance();
            if (event.button == 2 && !this.isNewTab()) {
                this.togglePin();
            } else if (event.button == 1 && !this.isNewTab()) {
                this.close();
            } else {
                tabs.activateTab(this);
            }
        };

        this.webview = $('<webview src="' + url + '">');

        var wv = this.webview[0];
        var gettingRealTabListener = (event) => {
            if (!this.isNewTab()) {
                wv.removeEventListener('did-start-loading', gettingRealTabListener);
                this.isGettingRealTab();
            }
        };

        wv.addEventListener('page-title-updated', (title) => {
            this.title = title.title;
            Tabs.getInstance().renderTitlebar();
        });
        wv.addEventListener('did-navigate', (url) => {
            Tabs.getInstance().renderTitlebar();
        });
        wv.addEventListener('page-favicon-updated', (favicons) => {
            this.favicons = favicons.favicons;
            this.setIcon(this.favicons[this.favicons.length - 1]);
        });

        wv.addEventListener('did-start-loading', () => {
            if (!this.isNewTab()) {
                this.setIcon("assets/icons/loading.svg");
            }
        });
        wv.addEventListener('did-finish-load', () => {
            if (!this.isNewTab()) {
                this.setAltText(this.getTitle().substr(0, 1).toUpperCase());
            }
        });
        wv.addEventListener('did-fail-load', (errorCode, errorDescription, validatedURL) => {
            console.log(errorCode);
            this.setIcon("");
            this.setAltText(":(");
            //TODO: render error page
        });

        wv.addEventListener('did-start-loading', gettingRealTabListener);

        wv.addEventListener('new-window', e  => {
            var url = e.url;
            console.log(url);
            Tabs.getInstance().createTab(url, this);
        });
    }

    isNewTab() {
        return this.getUrl() == "browser://newtab";
    }

    isGettingRealTab() {
        this.button.removeAttr("id");
        this.setAltText("");

        var tabs = Tabs.getInstance();
        tabs.renderTabState();
    }

    getUrl() {
        return this.webview.attr("src");
    }

    setUrl(newUrl) {
        /*currentUrl = this.getUrl();
        if(newUrl != currentUrl) {
          this.addToHistory(currentUrl, this.getTitle());
        }*/

        this.webview.attr("src", newUrl);
    }

    /*addToHistory(title, url) {
      this.history.push(title + ":" + url);
    }

    getHistory() {
      return this.history;
    }*/

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
        return this.title;
    }

    setIcon(url) {
        var object = this.button.children('object');
        object.attr("data", url);
        this.button.html(this.button.html());
    }

    setAltText(altText) {
        this.button.children('object').html(altText);
    }

    pin() {
        this.isPinned = true;
        Tabs.getInstance().renderTabState();
    }

    unPin() {
        this.isPinned = false;
        Tabs.getInstance().renderTabState();
    }

    togglePin() {
        this.isPinned = !this.isPinned;
        Tabs.getInstance().renderTabState();
    }

    reload() {
      this.setUrl(this.getUrl());
    }

    close() {
        var tabs = Tabs.getInstance();
        console.log(tabs.tabs.find(tab => this == tab));
        tabs.tabs = tabs.tabs.filter(tab => this != tab);

        tabs.renderTabState();
    }
};
