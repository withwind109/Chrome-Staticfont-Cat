/**
 * Created by zhade on 15/7/12.
 */
window.onload = function () {
    function setDevStatus(val) {
        var status;

        if (val) {
            status = 0;
        }
        else {
            status = 1;
        }

        chrome.extension.sendMessage({
            dev: status
        }, function (data) {
            if (data) {
                localStorage["dev"] = status;
            }
        });
    }

    var devChk = document.getElementById("dev_chk");
    devChk.addEventListener("click", function () {
        setDevStatus(devChk.checked)
    });
};