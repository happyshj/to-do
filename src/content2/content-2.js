import './content-2.css';
import plusImg from './../common/plus.png';
import common from '../common/common';

let commonFn = new common();

export default function content2() {

}

content2.prototype = {
    contentHtml: function () {
        // 统计
        let count = `<div class="content-2-count">
                           ${ `aaaaa`}
                      </div>`;

        // 底部
        let add = `<div class="content-2-add">
                       <img src="${plusImg}" class="addImg">
                       <span class="add">新增任务</span>
                    </div>`;
        return count+add;
    },
    init: function () {
        // 初始化信息
        let list = document.querySelector('.content-2-count');
        list.style.height = (commonFn.getPageSize().height - 101)+'px';

        // 监听resize事件
        commonFn.addHandler(window, 'resize', function () {
            let size = commonFn.getPageSize();
            list.style.height = (commonFn.getPageSize().height - 101)+'px';
        });
    }
};