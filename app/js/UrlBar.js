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
                activeTab.setUrl(event.target.value);
                this.unfocus();
            }
        });

        this.url = null;

        //the following code is for displaying the title normally
        this.elem.focus(() => {
            this.elem.val(this.url);
            $(this).select();
        });
        this.elem.blur(() => {
            this.elem.val("");
        });
    }

    setTitle(title) {
        this.elem.attr("placeholder", title);
    }
    setUrl(url) {
        this.url = url;
    }

    focus() {
        this.elem.focus();
    }
    unfocus() {
        this.elem.blur();
    }
};

//finally init the UrlBar
$(() => UrlBar.getInstance());