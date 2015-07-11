/**
 * Created by zhade on 15/7/11.
 */
+function(){
    chrome.tabs.onUpdated.addListener(function(data){
        console.log(data);
    });
}();
