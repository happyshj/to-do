import './style.css';
import plusImg from './imgs/plus.png';
import treeImg from './imgs/tree.png';
import nodeImg from './imgs/node.png';
import completedImg from './imgs/completed.png';
import editImg from './imgs/edit.png';
import common from './common/common';

let commonFn = new common();
// 全局变量

// 总布局
function all() {
    // 主容器
    let containerElement = document.createElement('div');
    containerElement.classList.add('container');

    // header
    let headerElement = `<header><span id="todoHeader" class="todo-header">Shj</span></header>`;

    // content
    /*content1*/
    // 题目
    let title = `<div class="cd-tree">分类列表</div>`;
    // 树
    let tree = `<div class="cv_fcv node">
                      <div class="tree">
                           <img src="${treeImg}" class="icon-tree">
                           <span class="tree-name">默认分类</span>
                           (<span class="tree-count">1</span>)
                           <span class="tree-delete">X</span>
                      </div>
                      <ul class="node">
                          <li>
                             <div class="tree" data-uid="${1}">
                                 <img src="${treeImg}" class="icon-tree">  
                                 <span class="tree-name">提示</span>
                                 (<span class="tree-count">1</span>)
                                 <span class="tree-delete">X</span>
                             </div>
                          </li>
                      </ul>
                   </div>`;
    // 统计
    let content1_count = `<div class="content-1-count">
                         <div>所有任务（<span id="count">11</span>）</div>
                         <div class="content-1-list">${title + tree}</div>
                     </div>`;
    // 底部
    let content1_add = `<div class="content-1-add">
                       <img src="${plusImg}" class="addImg">
                       <span class="add">新增分类</span>
                    </div>`;
    let content1 =  content1_count+content1_add;

    /* content2 */
    let tabText = `<div class="tab-title">
                            <ul>
                               <li class="tab-item all tab-item-selected">所有</li>
                               <li class="tab-item uncompleted">未完成</li>
                               <li class="tab-item completed">已完成</li>
                            </ul>
                        </div>
                     <div class="tab-content">
                            <div class="tab-content-item">
                                 <div class="item-date">2017-05-01</div>
                                 <div class="item-date-list">
                                     <ul>
                                        <li class="item-data-item">todo-1</li>
                                     </ul>
                                 </div>
                            </div>
                     </div>`;
    let content2_count = `<div class="content-2-count">
                           ${tabText}
                      </div>`;

    // 底部
    let content2_add = `<div class="content-2-add">
                       <img src="${plusImg}" class="addImg">
                       <span class="add">新增任务</span>
                    </div>`;
    let content2 = content2_count + content2_add;

    /** content3 **/
    let content3_title = `<div class="content-3-title">
                                <span class="title-name">to-do-6</span>
                                <span class="title-completed">
                                    <img src="${completedImg}">
                                 </span>
                                 <span class="title-edit">
                                    <img src="${editImg}">
                                 </span>
                           </div>`;
    let content3_date = `<div class="content-3-date">
                             任务日期：<span class="date-name">2017-05-01</span>
                          </div>`;
    let content3_content = `<div class="content-3-content">欢迎使用</div>`;
    let content3 = content3_title + content3_date + content3_content;

    /* 总代码 */
    let contentElement = `<div class="content">
                              <div class="content-1">
                                 ${content1}
                              </div>
                              <div class="content-2">
                                  ${content2}
                              </div>
                              <div class="content-3">${content3}</div>
                           </div>`;

    containerElement.innerHTML = headerElement + contentElement;

    return containerElement;
}

// 初始界面
document.body.appendChild(all());

let todo_data = [
   {
        name: "默认分类",
        selected: true,
        pid: 0,
        child: [
             {
                name: "提示",
                selected: false,
                pid:1,
                child: [
                    {
                        name: "todo-1",
                        date: "2017-05-01",
                        status: 0,
                        content: '欢迎使用'
                    }
                ]
             }
        ]
    }
];
let str = '';
function Content1() {

}
Content1.prototype = {
    initTreeDom: function (array,str) {
        let that = this;
        // 根据数据初始化dom结构
      //  console.log(array);
       // let temp = '';
        array.forEach(function (item, index, array) {
            if(item.child){
                // 是节点
                if(item.pid === 1){
                    str += '<li>';

                }else {

                }
                str += `<div class="tree">
                                 <img src="${treeImg}" class="icon-tree">
                                 <span class="tree-name">${item.name}</span>
                                (<span class="tree-count">0</span>)
                                 <span class="tree-delete">X</span>
                         </div>`;

                let flag = item.child.some(function (item,index,array) {
                    return item.child
                });
                if(flag){
                    // 有子节点
                    str += `<ul class="node">`;

                    that.initTreeDom(item.child,str);

                   // str += `</ul>`
                }else {
                    // 没有子节点
                }
                if(item.pid){
                    str += '</li>';

                }else {

                }
                console.log(str)
                // 当前节点为最后一个子节点，添加</ul>
                if(index === array.length - 1){
                    str += `</ul>`;
                   // console.log(str)
                }
            }else {
                // 文本节点

            }
        });

    },
    initTree: function () {
        /* 初始化图片 */
        let trees = document.getElementsByClassName('tree');
        [...trees].forEach(function (item,index,array) {
            let nextE = item.nextElementSibling;
            let imgElement = item.querySelector('.icon-tree');
            if(!nextE || nextE.nodeName.toLowerCase() !== 'ul'){
                // 添加tree图片
                imgElement.src = nodeImg;
            }else {
                imgElement.src = treeImg;
            }
        });
    },
    init: function () {
        let that = this;
        // let str = 'aaa';
        that.initTreeDom(todo_data,str);
        console.log(str);

        // 初始化信息
        let list = document.querySelector('.content-1-count');
        list.style.height = (commonFn.getPageSize().height - 101)+'px';

        // 监听resize事件
        commonFn.addHandler(window, 'resize', function () {
            let size = commonFn.getPageSize();
            list.style.height = (commonFn.getPageSize().height - 101)+'px';
        });

        // tree
        let trees = document.getElementsByClassName('tree');
        let cdTree = document.querySelector('.cd-tree');
        /* 初始化图片 */
        that.initTree();

        /* 展开与合并、删除、点击添加选中标志*/
        let tree = document.querySelector('.cv_fcv');
        commonFn.addHandler(tree,'click',function (e) {
            // 先判断是删除还是合并
            if(e.target.classList.contains('tree-delete')){
                // 删除
                e.stopPropagation();
                let flag = confirm('确定删除该分类吗？');
                if(flag){
                    // 删除自身tree，及后面的ul
                    let treeE = e.target.parentNode; // tree,div
                    let nextE = treeE.nextElementSibling;

                    // 若其父元素只有其一个节点，删除完整节点
                    if(treeE.parentNode.nodeName.toLowerCase() === 'li'){
                        let tempNext = treeE.parentNode.nextElementSibling; //li
                        let tempPrev = treeE.parentNode.previousElementSibling;
                        if(!tempNext && !tempPrev){
                            treeE.parentNode.parentNode.parentNode.removeChild(treeE.parentNode.parentNode); // 删掉ul
                        }else {
                            // 不是一个节点
                            treeE.parentNode.parentNode.removeChild(treeE.parentNode);
                        }
                    }else {
                        if(nextE && nextE.nodeName.toLowerCase() === 'ul'){
                            nextE.parentNode.removeChild(nextE);
                        }
                        treeE.parentNode.removeChild(treeE);
                    }
                }
                that.initTree();
            }else {
                // 展开与合并
                // 点击，若有子元素，且隐藏，则展开；若展开，则隐藏
                let nextElement = e.target.nextElementSibling;
                let selectedElement = e.target;
                if(!e.target.classList.contains('tree')){
                    nextElement = e.target.parentNode.nextElementSibling;
                    selectedElement = e.target.parentNode;
                }
                if(nextElement){
                    if(nextElement.style.display == 'none'){
                        nextElement.style.display = 'block';
                    }else {
                        nextElement.style.display = 'none'
                    }
                }

                // 点击选中事件
                [...trees].forEach(function (item,index,array) {
                    if(item.classList.contains('tree-selected')){
                        item.classList.remove('tree-selected');
                    }
                });
                cdTree.classList.remove('tree-selected');
                selectedElement.classList.add('tree-selected');
            }
        });

        /* 分类列表添加点击事件 */
        commonFn.addHandler(cdTree,'click',function () {
            [...trees].forEach(function (item,index,array) {
                if(item.classList.contains('tree-selected')){
                    item.classList.remove('tree-selected');
                }
            });
            cdTree.classList.add('tree-selected');
        });

        /* 鼠标划过时，出现删除按钮 */
        commonFn.addHandler(tree,'mouseover',function (e) {
            let treeDeleteE = e.target.querySelector('.tree-delete') || e.target.parentNode.querySelector('.tree-delete');
            treeDeleteE.style.display = 'inline-block';
        });
        /* 鼠标划走时，隐藏删除按钮 */
        commonFn.addHandler(tree,'mouseout',function (e) {
            let treeDeleteE = e.target.querySelector('.tree-delete') || e.target.parentNode.querySelector('.tree-delete');
            treeDeleteE.style.display = 'none';
        });

        /* 新增分类 */
        let addList = document.querySelector('.content-1-add');
        commonFn.addHandler(addList,'click',function (e) {
            e.stopPropagation();

            let listName = prompt('请输入分类名：');
            if(listName){
                // 查找被选中分类
                let treesE = document.querySelectorAll('.tree');
                let treeSelected = [...treesE].filter(function (item,index,array) {
                    return item.classList.contains('tree-selected');
                });
                // 为该分类添加新的分类
                if(treeSelected.length > 0){
                    let element = treeSelected[0];
                    if(element.nextElementSibling){
                        // 若已经有子元素
                        let addTreeE = ` <li>
                                 <div class="tree">
                                     <img src="${treeImg}" class="icon-tree">
                                     <span class="tree-name">${listName}</span>
                                     (<span class="tree-count">0</span>)
                                     <span class="tree-delete">X</span>
                                 </div>
                               </li>`;
                        element.nextElementSibling.innerHTML += addTreeE;

                        // 添加子元素，count为0；增加到数据里

                    }else {
                        // 若没有子元素
                        let addTreeE = `<ul class="node">
                                      <li>
                                        <div class="tree">
                                         <img src="${treeImg}" class="icon-tree"> 
                                          <span class="tree-name">${listName}</span>
                                         (<span class="tree-count">0</span>)
                                         <span class="tree-delete">X</span>
                                         </div>
                                       </li>
                                     </ul>`;
                        element.parentNode.innerHTML += addTreeE;
                    }
                    // 提示添加成功
                    alert('添加成功！！');
                    // 展开该分类
                    if(element.nextElementSibling){
                        element.nextElementSibling.style.display = 'block';
                    }
                    // 初始化分类
                    that.initTree();
                }else {
                    if(cdTree.classList.contains('tree-selected')){
                        // 添加总分类
                        let addTreeE = `<div class="tree">
                          <img src="${treeImg}" class="icon-tree">
                          <span class="tree-name">${listName}</span>
                          (<span class="tree-count">0</span>)
                          <span class="tree-delete">X</span>
                      </div>`;
                        tree.innerHTML += addTreeE;
                        // 提示添加成功
                        alert('添加成功！！');
                        that.initTree();
                    }else {
                        alert('没有分类被选中！！！');
                    }
                }
            }
        });
    }
};

function Content2() {

}
Content2.prototype = {
    init: function () {
        // 初始化信息
        let list = document.querySelector('.content-2-count');
        list.style.height = (commonFn.getPageSize().height - 101)+'px';

        // 监听resize事件
        commonFn.addHandler(window, 'resize', function () {
            let size = commonFn.getPageSize();
            list.style.height = (commonFn.getPageSize().height - 101)+'px';
        });

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

new Content1().init();
new Content2().init();
