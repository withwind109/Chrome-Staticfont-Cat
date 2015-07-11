/**
 * Created by zhade on 15/7/11.
 */
var debugJson = {};
var removeAddress = "http://127.0.0.1/";

var currTabId = -1;

function requestJSON() {

    $.ajax({
        type: "get",
        url: removeAddress + "debugMap.js",
        dataType: "text",
        success: function (data) {
            if (data == "") {
                return;
            }

            try {
                debugJson = JSON.parse(data);
                console.log("update json data");
            }
            catch (err) {

            }
        },
        error: function () {

        }
    });
}

setInterval(requestJSON, 1000);

chrome.tabs.onUpdated.addListener(function (tabId) {
    currTabId = tabId;
});


chrome.webRequest.onBeforeRequest.addListener(
    function (detail) {
        if (detail.url.indexOf(".js") != -1 || detail.indexOf(".css") != -1) {
            if (detail.url == "http://static.360buyimg.com/panda_cube/dist/v20150630/ued.import-min.js") {
                //chrome.tabs.getCurrent(function(data){
                //    var aa=data;
                //});
                chrome.tabs.executeScript(currTabId, { file: 'src/test.js' });
                //chrome.tabs.executeScript(currTabId, { code: 'alert($("body").remove())'} );
                //chrome.tabs.insertCSS(currTabId, {file: 'skin.css'});
                return {cancel: true};
                //return {redirectUrl: "http://static.360buyimg.com/panda_cube/dist/v20150630/ued.import"};
            }
        }
        else {
            return true;
        }

        //{cancel: details.url.indexOf("://cn.bing.com/") != -1};
    },
    {urls: ["<all_urls>"]},
    ["blocking"]);

