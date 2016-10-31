/**
 * Created by jaro on 31.10.16.
 */

$(document).keydown((event) => {
    console.log(event);
    if (event.key === "t" && event.ctrlKey) {
        Tabs.getInstance().newTab();
    } else {
        console.log(event);
    }
});