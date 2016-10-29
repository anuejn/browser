/**
 * Created by jaro on 29.10.16.
 */

let instance = null;
module.exports = class UrlBar {
    static getInstance() {
        if (!instance) {
            instance = new UrlBar();
        }
        return instance;
    }
    constructor() {
        this.elem = $("#topbar > input[type=url]");
        this.elem.keydown(event => {
            if (event.keyCode == 13) {
                var tabs = Tabs.getInstance();
                var activeTab = tabs.getActiveTab();
                activeTab.setUrl(event.target.value)
            }
        });
    }

    setTitle(title) {
        this.elem.attr("placeholder", title);
    }
    setUrl(url) {
        this.elem.value = url;
    }

    focus() {
        this.elem.focus();
    }
};

//finally init the UrlBar
$(() => UrlBar.getInstance());