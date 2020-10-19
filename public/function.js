/**
 * 说明：判断是否为空
 */
function isEmpty(value) {
    if(value==''||value==undefined||value==null){
        return true
    }else {
        return false
    }
};
/**
 * 说明：从URl中获取某个Key的Value值
 */
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
};
/**
 * 说明：获取token
 */
function getToken() {
    return localStorage.getItem("token");
};