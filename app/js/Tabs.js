/**
 * Created by jaro on 28.10.16.
 */
window.$ = window.jQuery = require('jquery');
let Tab = require('../app/js/Tab');

let instance = null;
class Tabs {
    static getInstance() {
        if (!instance) {
            instance = new Tabs();
        }
        return instance;
    }

    constructor() {
        this.tabs = [];
        this.newTab();
    }

    newTab() {
        var tab = this.createNewTab();
        this.activateTab(tab.button);
    }

    createNewTab() {
        if (this.hasNewTab()) {
            var tab = new Tab();
            this.tabs.push(tab);
            this.renderTabState();
            return tab;
        } else {
            return this.tabs.filter(tab => tab.isNewTab())[0];
        }
    }

    hasNewTab() {
        return this.tabs.filter(tab => tab.isNewTab()).length < 1;
    }

    activateTab(tabButton) {
        var unActiveTabs = this.tabs.filter(tab => tab.button != tabButton);
        unActiveTabs.forEach(tab => tab.setUnActive());
        var activeTab = this.tabs.filter(tab => tab.button == tabButton);
        activeTab.forEach(tab => tab.setActive());
    }

    renderTabState() {
        //tab buttons
        this.createNewTab();
        var tabstream = $("#tabstream");
        tabstream.html("");
        this.tabs.reverse();
        this.tabs.forEach(tab => tabstream.append(tab.button));
        this.tabs.reverse();

        //webviews
        var festival = $("#festival");
        festival.html("");
        this.tabs.forEach(tab => festival.append(tab.webview));
    }
}

//finally init the tabs
$(() => Tabs.getInstance());
