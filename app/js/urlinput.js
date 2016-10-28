/**
 * Created by jaro on 29.10.16.
 */
$(() => {
    $("#topbar > input[type=url]").keydown(event => {
        if (event.keyCode == 13) {
            var tabs = Tabs.getInstance();
            var activeTab = tabs.getActiveTab();
            activeTab.setUrl(event.target.value)
        }
    });
});