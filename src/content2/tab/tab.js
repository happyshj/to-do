import './tab.css';
import common from '../../common/common';

let commonFn = new common();

export default function tab() {

}

tab.prototype = {
    tabHtml: function () {
        let tabText = `<div class="tab-title">
                            <ul>
                               <li class="tab-item all tab-item-selected">所有</li>
                               <li class="tab-item uncompleted">未完成</li>
                               <li class="tab-item completed">已完成</li>
                            </ul>
                        </div>
                     <div class="tab-content">
                            <div class="tab-content-item">
                                 <div class="item-date">2015-05-01</div>
                                 <div class="item-date-list">
                                     <ul>
                                        <li class="item-data-item">todo-1</li>
                                        <li class="item-data-item">todo-1</li>
                                     </ul>
                                 </div>
                            </div>
                            <div class="tab-content-item">
                                 <div class="item-date">2015-05-01</div>
                                 <div class="item-date-list">
                                     <ul>
                                        <li class="item-data-item">todo-1</li>
                                        <li class="item-data-item">todo-1</li>
                                     </ul>
                                 </div>
                            </div>
                            <div class="tab-content-item">
                                 <div class="item-date">2015-05-01</div>
                                 <div class="item-date-list">
                                     <ul>
                                        <li class="item-data-item">todo-1</li>
                                        <li class="item-data-item">todo-1</li>
                                     </ul>
                                 </div>
                            </div>
                     </div>`;
        return tabText;
    },
    init: function () {
        /* 默认显示所有任务（代写） */
        /* 添加标题选择事件 */
        let tabTitle = document.querySelector('.tab-title');
        commonFn.addHandler(tabTitle,'click',function (e) {
            e.stopPropagation();
            // 改变样式
            if(e.target.nodeName.toLowerCase() === 'li'){
                let tabItem = document.querySelectorAll('.tab-item');
                if(!e.target.classList.contains('tab-item-selected')){
                    [...tabItem].forEach(function (item,index,array) {
                        if(item.classList.contains('tab-item-selected')){
                            item.classList.remove('tab-item-selected');
                        }
                    });
                    e.target.classList.add('tab-item-selected');
                }
            }
        });
    }
};
