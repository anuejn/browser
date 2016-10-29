# Browser
![Screenshot of a clickdummy version of the Browser](documentation/clickdummy.jpg)

## Goal
The main aim of this project is to develop a browser that fits a browsing workflow with many tabs.
The main idea behind it is, that you never have to cloe a tab again. **Never**.
Both in the UI and the browser Backend should be able to be usable without closing tabs.

## Design
On the UI side, this should be reached by having a vertical bar of tabs, 
which consists of to parts: 
1. On the one hand, it consist 
of tabs, the user opens from time to time in his daily research. Those tabs are no longer important 
after a few minutes. This group of tabs is called the "tabstream". Tabs who are in the tabstream
can be unloaded, to save resources. At this point of Time, a sceenshot is taken and
the browser should try to serialize the state of that tab to make it restoreable for later.
2. On the other hand, there are the pinned tabs. Those tabs mustn't be unloaded by the browser.
Examples for tabs you may want to pin are music player apps, instant messengers or 
issue boards. The pinned tabs are pinned at the bottom of the tab bar and are quickly accessible at any
given point of time.

The forwards and backward buttons should work unlike in other browsers chross tab.
So when you click backward on a tab, yaou opened from an other tab, you should get
the tab, from whom you opened your tab shown.

In the default view, every Tab is represented by the favicon of the website.
When no favicon is present, some alternative Icon should be generated to identify the page.
The problem with representing evey tab with an icon is, that they are sometimes not unique enough:
Lets assume you have 5 tabs of website A open. How could you differentiate between them.
For this Case there should be an other View: the "OverView" ;). In this view, the tab bar will get 
inflated and the Page titles will appear next to the icons. The current View wil get smaller and in 
the case you hover over an unloaded tab there will be the screenshot instead of the active tab.
Moreover there should be a search bar with which you can filter your tabs by the title, the url,
the date, etc...

Almost all the things, you need to use a webbrowser in your daily life are not specified here.
Those things should be also implemented, to make it usable, but maybe less complete and less
advanced than in mainstream browsers to save development time and be able to concentrate on the
new and exciting things. 

## Technology
The browser will be written in Webstack technologies using [electron](http://electron.atom.io/).
The main reason is thet it is easier to write a webbrowser in web technologies than in any other
technology stack. This saves much development time but trades it for a worse performance. That
means, that keeping the performance and resource amount used at an acceptable level is a great challenge.

## Current Status & Contributing
Currently a clickdummy and the beginning of a firs version of the Browser are excising.
When you want to get information about the current issues and progress, gust watch this repo
and look at the [issue tracker](https://gitlab.com/nein/browser).
All the thing described in this document are only ideas and can change during the further development.
Feel free do bring in your own ideas and thoughts :). Moreover feel free to fork this project, develop on it,
hack it, and submit pull requests.
