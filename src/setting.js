/**
 * Created by cdtangchao on 2016/2/16.
 */
/**
 * Created by zhade on 15/7/12.
 */
//window.onload = function () {
//    function setDevStatus(val) {
//        var status;
//
//        if (val) {
//            status = 0;
//        }
//        else {
//            status = 1;
//        }
//
//        chrome.extension.sendMessage({
//            dev: status
//        }, function (data) {
//            if (data) {
//                localStorage["dev"] = status;
//            }
//        });
//    }
//
//    var devChk = document.getElementById("dev_chk");
//    devChk.addEventListener("click", function () {
//        setDevStatus(devChk.checked)
//    });
//};
$(function () {
    var $panel = $('.setting-panel');

    $('.switch').on('click', function () {
        if ($panel.hasClass('disable')) {
            $panel.removeClass('disable');
        }
        else {
            $panel.addClass('disable');
        }
    });
    //var $switchON = $('#switch_on');
    //var $switchOFF = $('#switch_off');
    //
    //$switchON.on('click', function () {
    //    $switchON.removeClass('on').addClass('off hide');
    //    $switchOFF.removeClass('off hide').addClass('on');
    //});
    //
    //$switchOFF.on('click', function () {
    //
    //});
});