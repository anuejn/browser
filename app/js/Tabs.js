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

    hasNewTab() {
        return this.tabs.filter(tab => tab.isNewTab()).length < 1;
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

    newTab() {
        var tab = this.createNewTab();
        this.activateTab(tab);
    }

    activateTab(givenTtab) {
        var unActiveTabs = this.tabs.filter(tab => tab != givenTtab);
        unActiveTabs.forEach(tab => tab.setUnActive());
        var activeTab = this.tabs.filter(tab => tab == givenTtab);
        activeTab.forEach(tab => tab.setActive());
    }

    getActiveTab() {
        return this.tabs.filter(tab => tab.isActive)[0];
    }

    renderTabState() {
        //tab buttons
        this.createNewTab();
        var tabstream = $("#tabstream");
        tabstream.html("");
        this.tabs.reverse();
        this.tabs.forEach(tab => tabstream.append(tab.button));
        this.tabs.reverse(); //TODO: find better way

        //webviews
        var festival = $("#festival");
        festival.html("");
        this.tabs.forEach(tab => tab.button.click(tab.onButtonClick));
        this.tabs.forEach(tab => festival.append(tab.webview));
    }
}

//finally init the tabs
$(() => Tabs.getInstance());
