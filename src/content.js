/**
 * Created by zhade on 15/7/11.
 */

//接受消息
//chrome.extension.onMessage.addListener(
//    function (request, sender, sendResponse) {
//        console.log(request);
//    }
//);


var jsRequestList = [];

function loadJSlist() {
    createJS(jsRequestList[0]);

    jsRequestList.splice(0, 1);
}

function createJS(src) {
    var jsNode = document.createElement("script");
    jsNode.type = "text/javascript";
    jsNode.src = src;
    jsNode.onload = function () {
        if(jsRequestList.length!=0){
            loadJSlist();
        }
    };
    document.getElementsByTagName("head").item(0).appendChild(jsNode);
}

function createCss(href) {
    var styleNode = document.createElement("link");
    styleNode.type = "text/css";
    styleNode.rel = "stylesheet";
    styleNode.href = href;
    document.getElementsByTagName("head").item(0).appendChild(styleNode);
}

chrome.extension.sendMessage({state: "init"});

$(function () {
    chrome.extension.sendMessage({state: "ready"}, function (data) {

        data.forEach(function (arr) {
            arr.forEach(function (url) {
                if (url.indexOf(".js")) {
                    //createJS("http://localhost/" + url);
                    jsRequestList.push("http://localhost/" + url);
                }
                else if (url.indexOf(".css")) {
                    createCss("http://localhost/" + url);
                }
            });
        });

        if (jsRequestList.length != 0) {
            loadJSlist();
        }
    });
});

//$(function () {
//    $("body").css("background-color", "#ff0000");
//});