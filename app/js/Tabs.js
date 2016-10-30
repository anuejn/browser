/**
 * Created by jaro on 28.10.16.
 */
window.$ = window.jQuery = require('jquery');
let Tab = require('../app/js/Tab');
let UrlBar = require('../app/js/UrlBar');

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
        return this.tabs.filter(tab => tab.isNewTab()).length == 1;
    }
    createNewTab() {
        if (!this.hasNewTab()) {
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
        UrlBar.getInstance().focus();
    }

    getActiveTab() {
        return this.tabs.filter(tab => tab.isActive)[0];
    }
    activateTab(givenTtab) {
        var unActiveTabs = this.tabs.filter(tab => tab != givenTtab);
        unActiveTabs.forEach(tab => tab.setUnActive());
        var activeTab = this.tabs.filter(tab => tab == givenTtab);
        activeTab.forEach(tab => tab.setActive());

        this.renderTitlebar();
    }
    renderTabState() {
        //tab buttons
        this.createNewTab();
        var tabstream = $("#tabstream");
        var tabs = [];
        this.tabs.reverse();
        this.tabs.forEach(tab => tabs.push(tab.button));
        this.tabs.reverse();
        tabstream.html(tabs);
        this.tabs.forEach(tab => tab.button.mousedown(tab.onButtonClick));

        //add missing webviews
        var festival = $("#festival");
        this.tabs.forEach(tab => {
            if(festival.find(tab.webview).length == 0) {
                festival.append(tab.webview);
            }
        });

        //remove old webviews
        /*festival.children().forEach(webview => {
            if (this.tabs.map(tab => tab.webview).indexOf(webview) === -1) {
                //festival.remove(webview);
                console.log("asdf");
            }
        });*/
    }
    renderTitlebar() {
        var tab = this.getActiveTab();
        var urlBar = UrlBar.getInstance();

        urlBar.setUrl(tab.getUrl());
        urlBar.setTitle(tab.getTitle());
    }
}

//finally init the tabs
$(() => Tabs.getInstance());
