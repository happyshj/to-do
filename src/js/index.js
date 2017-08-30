function Todo() {
    this.classfityContainer = document.querySelector('.classify-container');
    this.taskContainer = document.querySelector('.task-container');
    this.taskContent = document.querySelector('.content-container');
}

Todo.prototype = {
    init: function () {
        let that = this;
        this.sameToWindow(that.getPageSize());
        // 监听resize事件
        this.addHandler(window, 'resize', function () {
            let size = that.getPageSize();
            that.sameToWindow(size)
        });
    },

    sameToWindow: function (size) {
        // 尺寸与窗口相同
        this.classfityContainer.style.height = (size.height - 92)+'px';
        this.taskContainer.style.height = (size.height - 92)+'px';
        this.taskContent.style.height = (size.height - 152)+'px';
    },
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

let todo = new Todo();
todo.init();

