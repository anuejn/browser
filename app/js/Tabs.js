/**
 * Created by jaro on 28.10.16.
 */
window.$ = window.jQuery = require('jquery');
let Tab = require('../app/js/Tab');

let instance = null;
class Tabs {
    static getInstance() {
        if(instance) {
            return instance;
        } else {
            return new Tabs();
        }
    }

    constructor() {
        this.tabs = [];
        this.newTab();
    }

    newTab() {
        if(this.tabs.filter(tab => tab.isNewTab()).length < 1) {
            var tab = new Tab();
            this.tabs.push(tab);
            this.activateTab(tab.button);

            this.renderTabState();
        }
    }

    activateTab(tabButton) {
        var unActiveTabs = this.tabs.filter(tab => tab != tabButton);
        unActiveTabs.forEach(tab => tab.setUnActive());
        var activeTab = this.tabs.filter(tab => tab == tabButton);
        activeTab.forEach(tab => tab.setActive());
    }

    renderTabState() {
        //tab buttons
        var tabstream = $("#tabstream");
        tabstream.html("");
        this.tabs.forEach(tab => tabstream.append(tab.button));

        //webviews
        var festival = $("#festival");
        festival.html("");
        this.tabs.forEach(tab => festival.append(tab.webview));
    }
}