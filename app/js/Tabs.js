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

    createTab(url, invokedBy) {
        var tab = new Tab(url, invokedBy);
        this.tabs.push(tab);
        this.renderTabState();
        return tab;
    }

    createNewTab() {
        if (!this.hasNewTab()) {
            return this.createTab();
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

    activateTab(givenTab) {
        var unActiveTabs = this.tabs.filter(tab => tab != givenTab);
        unActiveTabs.forEach(tab => tab.setUnActive());
        var activeTab = this.tabs.filter(tab => tab == givenTab);
        activeTab.forEach(tab => tab.setActive());

        this.renderTitlebar();
    }

    renderTabState() {
        //tab buttons
        this.createNewTab();


        this.tabs.reverse();

        var streamTabs = [];
        this.tabs.filter(tab => !tab.isPinned).forEach(tab => streamTabs.push(tab.button));
        $("#tabstream").html(streamTabs);

        var pinnedTabs = [];
        this.tabs.filter(tab => tab.isPinned).forEach(tab => pinnedTabs.push(tab.button));
        $("#pinedtabs").html(pinnedTabs);

        this.tabs.reverse();
        this.tabs.forEach(tab => tab.button.off("mousedown"));
        this.tabs.forEach(tab => tab.button.mousedown(tab.onButtonClick));

        //add missing webviews
        var festival = $("#festival");
        this.tabs.forEach(tab => {
            if (festival.find(tab.webview).length == 0) {
                festival.append(tab.webview);
            }
        });
        /*TODO: remove old webviews; below you'll find an non working aproach to this see #10
         festival.children().forEach(webview => {
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
