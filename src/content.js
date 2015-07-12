/**
 * Created by zhade on 15/7/11.
 */
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request.greeting);
    }
);

$(function () {
    $("body").css("background-color", "#ff0000");
});