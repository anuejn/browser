/**
 * Created by jaro on 28.10.16.
 */
window.$ = window.jQuery = require('jquery');
/*
a tab is a data structure, that looks as follows:
var tab = {
    url: "https://duckduckgo.com",

    icon: "https://duckduckgo.com/favicon.ico",
    title: "search the world with duckduckgo",
    invokedby: {otherTabObject},

    screenshot: {screenshotimage},
    serializedState: {serializedStateObjectToRestoreTab}
};
 */

/*******
 globals
 ******/
//the following array is representing all the unActiveTabs of the browser
var unActiveTabs = new Proxy([], {
    set: function(target, property, value) {
        target[property] = value;
        renderTabs();
        return true; // accept the changes
    }
});

//the following variable holds the index of the tab, that is currently active
var activeTab = new Proxy({index: 0}, {
    set: function(target, property, value) {
        target[property] = value;
        setActiveState();
        return true; // accept the changes
    }
});


/*****
 logic
 ****/
function renderTabs() {
    console.log(unActiveTabs);

    // update tabList
    var newTabs = "";
    newTabs += '<button type="button" id="addtab">+</button>\n';
    unActiveTabs = unActiveTabs.filter(function (value) {
        return value.url != "browser://newtab"
    });
    unActiveTabs.forEach(function (elem) {
        var buttonContent;
        if(elem.icon) {
            buttonContent = '<img src="' + elem.icon + '">';
        } else {
            buttonContent = elem.url.split('//')[1].substr(0, 2);
        }
        newTabs += '<button type="button" id="' + elem._id + '">' + buttonContent + '</button>\n';
    });
    $("#tabstream").html(newTabs);

    //updateWebvies
    //TODO
}

function setActiveState() {
    console.log(activeTab);

    //update tabList
    $("side button").removeClass("selected");
    $("#" + unActiveTabs[activeTab.index]._id);
}