/**
 * Created by zhade on 15/7/11.
 */
var debugJson = {};
var removeAddress = "http://127.0.0.1:8080/";

var currTabId = -1;
var stReg = new RegExp(/-min.js$|-min.css$/);
var stMap = [];

function requestJSON() {
    $.ajax({
        type: "get",
        url: removeAddress + "debugMap.js?" + (new Date()).getTime(),
        dataType: "text",
        success: function (data) {
            if (data == "") {
                return;
            }

            try {
                debugJson = JSON.parse(data);
            }
            catch (err) {
                console.log('读取JSON格式错误')
            }
        },
        error: function () {
            console.log('本地HTTP请求错误')
        }
    });
}

setInterval(requestJSON, 1000);

chrome.tabs.onCreated.addListener(function (tabId) {

});


chrome.tabs.onUpdated.addListener(function (tabId) {
    currTabId = tabId;
});

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    if(request.state){
        switch (request.state){
            //页面初始化
            case "init":

                break;
            //页面准备完成
            case "ready":
                if(stMap.length!=0){
                    sendResponse(stMap);
                    stMap=[];
                }
                break;
        }
    }

    //if (request.state &&
    //    request.state == "ready" &&
    //    stMap.length != 0
    //) {
    //    sendResponse(stMap);
    //}
});
//chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
//    try {
//        if (request.dev) {
//            switch (request.dev) {
//                //开启调试
//                case 0:
//                    break;
//                //关闭调试
//                case 1:
//                    break;
//            }
//        }
//
//        sendResponse(true);
//    }
//    catch (err) {
//        sendResponse(false);
//    }


//console.log(request);
//console.log(sender);
//console.log("Request comes from content script " + sender.tab.url);

//if (request.greeting === "hello to extention!"){
//    sendResponse(resOK);
//}else{
//    sendResponse(resError);
//}
//});

chrome.webRequest.onBeforeRequest.addListener(
    function (detail) {
        //拦截静态文件请求
        if (stReg.test(detail.url) && debugJson.length != 0 && currTabId != -1) {
            var urlKey = detail.url.substring(detail.url.lastIndexOf("/") + 1, detail.url.length)

            var fileMap = debugJson[urlKey];
            if (fileMap) {
                //chrome.tabs.sendMessage(currTabId, {greeting: 'test'});
                //chrome.tabs.sendMessage(currTabId, {"fileMap": "test"});
                stMap.push(fileMap);

                return {cancel: true};
            }
            else {
                return {cancel: false};
            }
        }
        else {
            return {cancel: false};
        }

        //if (detail.url.indexOf("-min.js") != -1 || detail.indexOf("-min.css") != -1) {
        //    //if (detail.url == "http://static.360buyimg.com/panda_cube/dist/v20150630/ued.import-min.js") {
        //        //chrome.tabs.getCurrent(function(data){
        //        //    var aa=data;
        //        //});
        //        //chrome.tabs.executeScript(currTabId, { file: 'src/test.js' });
        //        //chrome.tabs.executeScript(currTabId, { code: 'alert($("body").remove())'} );
        //        //chrome.tabs.insertCSS(currTabId, {file: 'skin.css'});
        //        //return {cancel: true};
        //        //return {redirectUrl: "http://static.360buyimg.com/panda_cube/dist/v20150630/ued.import"};
        //    //}
        //}
        //else {
        //    return true;
        //}

        //{cancel: details.url.indexOf("://cn.bing.com/") != -1};
    },
    {urls: ["<all_urls>"]},
    ["blocking"]);

