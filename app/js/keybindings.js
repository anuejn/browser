/**
 * Created by jaro on 31.10.16.
 */

$(document).keydown((event) => {
    if (event.key === "t" && event.ctrlKey) {
      Tabs.getInstance().newTab();
    } else if (event.keyCode == 116) { //116 is the keycode for f5
      Tabs.getInstance().getActiveTab().reload();
    } else {
      // I don't know what that is for...
    }
});
