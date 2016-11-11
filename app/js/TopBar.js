/*
 * Created by Loïc on 09.11.2016
 */

$("#reloadButton").mousedown(function() {
  Tabs.getInstance().getActiveTab().reload();
});
