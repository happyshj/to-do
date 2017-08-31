import './content-1.css';
import plusImg from './../common/plus.png';
import common from '../common/common';
import tree from './tree/tree';

let commonFn = new common();


export default function content1() {

}

content1.prototype = {
    content1Html: function () {
        // 统计
        let count = `<div class="content-1-count">
                         <div>所有任务（<span id="count">11</span>）</div>
                         <div class="content-1-list">${new tree().treeHtml()}</div>
                     </div>`;

        // 底部
        let add = `<div class="content-1-add">
                       <img src="${plusImg}" class="addImg">
                       <span class="add">新增分类</span>
                    </div>`;
        return count+add;
    },
    init: function () {
        // 初始化信息
        let list = document.querySelector('.content-1-count');
        list.style.height = (commonFn.getPageSize().height - 101)+'px';

        // 监听resize事件
        commonFn.addHandler(window, 'resize', function () {
            let size = commonFn.getPageSize();
            list.style.height = (commonFn.getPageSize().height - 101)+'px';
        });

        // tree
        new tree().init();
    }
};

