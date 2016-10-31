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
                var input = event.target.value;
                activeTab.setUrl(this.inputToUrl(input));
                this.unfocus();
            }
        });

        this.url = null;

        //the following code is for displaying the title normally
        this.elem.focus(() => {
            this.elem.val(this.url);
            this.elem.select();
        });
        this.elem.blur(() => {
            this.elem.val("");
        });
    }

    inputToUrl(input) {
        input = input.trim();
        if (input.indexOf("://") != -1 && input.indexOf(" ") == -1) { // url
            return input;
        } else if (input.indexOf(" ") == -1 && input.indexOf(".") != -1) {  //domain
            return "http://" + input;
        } else { // search
            return "https://duckduckgo.com/?q=" + encodeURIComponent(input);
        }
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
}
;

//finally init the UrlBar
$(() => UrlBar.getInstance());