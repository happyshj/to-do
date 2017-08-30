export default function common() {

}

common.prototype = {
    getPageSize: function () {
        // 获取页面视口大小
        let pageWidth = window.innerWidth,
            pageHeight = window.innerHeight;
        if(typeof pageWidth !== "number"){
            pageWidth = document.documentElement.clientWidth || document.body.clientWidth;
            pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
        }
        return {
            width: pageWidth,
            height: pageHeight
        }
    },
    addHandler: function (element, type, fn) {
        // 添加事件监听器
        if(element.addEventListener){
            element.addEventListener(type,fn,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,fn);
        }else {
            element["on"+type] = fn;
        }
    }
};