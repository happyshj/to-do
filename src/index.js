import './style.css';
import plusImg from './imgs/plus.png';
import treeImg from './imgs/tree.png';
import nodeImg from './imgs/node.png';
import completedImg from './imgs/completed.png';
import editImg from './imgs/edit.png';
import common from './common/common';

// 全局变量
let commonFn = new common();
// 存储所有节点
// let all_data = [
//     {
//         id: 1,
//         pid: 0,
//         name: "默认分类",
//         children: [{
//             id: 2,
//             pid: 1,
//             name: "提示",
//             children: []
//         }]
//     },
// ];
let temp_data = [
    {
        id: 1,
        name: "默认分类",
        pid: 0,
        count: 1,
        child: [2]
    },
    {
        id: 2,
        name: "提示",
        pid: 1,
        count: 1,
        child: []
    }
]; // 默认数据

if(!localStorage.getItem('data')){
    localStorage.setItem('data',JSON.stringify(temp_data));
}

// 存储所有任务
let task_data = [
    {
        id: 1,                 // 任务id/
        pid: 2,                // 任务所属id
        name: "todo-1",      // 任务名称
        date: "2017-04-02", // 任务日期
        status: 0,            // 任务完成状态（0表示未完成，1表示已完成）
        content: "欢迎使用"  // 任务内容
    }
];

if(!localStorage.getItem('task')){
    localStorage.setItem('task',JSON.stringify(task_data));
}
// 存储节点数量
// let count = 2;

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
    let tree = `<div class="cv_fcv node"></div>`;
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

function Content1() {

}
Content1.prototype = {
    nodeToTree: function (array, idStr, pidStr, childrenStr) {
       let r = [], hash = {}, len = array.length, id = idStr, pid = pidStr, children = childrenStr;
       for(let i = 0; i < len; i ++){
           hash[array[i][id]] = array[i];
           hash[array[i][id]][children] = [];
       }
       for(let j = 0; j < len; j ++){
           let aVal = array[j], hashVP = hash[aVal[pid]];
           if(hashVP){
               if(!hashVP[children]){
                   hashVP[children] = [];
               }
               hashVP[children].push(aVal);
           }else {
               r.push(aVal);
           }
       }
        return r;
    },
    initTreeDom:function (array) {
    let str = '';
    let that = this;
    for(let i = 0; i < array.length; i++){
        if(array[i].pid !== 0){
            str += `<li>`;
        }
        if(array[i].children.length > 0){
            // 有子元素
            str += `<div class="tree" data-nid="${array[i].id}">
                                 <img src="${treeImg}" class="icon-tree">
                                 <span class="tree-name">${array[i].name}</span>
                                (<span class="tree-count">${array[i].count}</span>)
                                 <span class="tree-delete">X</span>
                         </div>`;
            str += `<ul class="node">`;
            str += that.initTreeDom(array[i].children, str);
        }else {
            str += `<div class="tree" data-nid="${array[i].id}">
                                 <img src="${nodeImg}" class="icon-tree">
                                 <span class="tree-name">${array[i].name}</span>
                                (<span class="tree-count">${array[i].count}</span>)
                                 <span class="tree-delete">X</span>
                         </div>`;
        }
        if(array[i].pid !== 0){
            str += `</li>`;
            if(i === array.length -1){
                str += `</ul>`;
            }
        }
    }
    return str;
},
    initCount:function () {

    },
    init: function () {
        let that = this;
        // 初始化信息
        let list = document.querySelector('.content-1-count');
        list.style.height = (commonFn.getPageSize().height - 101)+'px';
        // 监听resize事件
        commonFn.addHandler(window, 'resize', function () {
            let size = commonFn.getPageSize();
            list.style.height = (commonFn.getPageSize().height - 101)+'px';
        });

        let tree = document.getElementsByClassName('cv_fcv')[0]; // 总分类

        let a = JSON.parse(localStorage.getItem('data'));
        tree.innerHTML = that.initTreeDom(that.nodeToTree(a,'id','pid','children')); // 初始化DOM tree

        let trees = document.getElementsByClassName('tree'),// 所有树节点
        cdTree = document.querySelector('.cd-tree'); // 分类列表

        /* 展开与合并、删除、点击添加选中标志*/
        commonFn.addHandler(tree,'click',function (e) {
            // 先判断是删除还是合并
            if(e.target.classList.contains('tree-delete')){
                // 删除
                e.stopPropagation();
                let flag = confirm('确定删除该分类吗？');
                if(flag){
                    let treeE = e.target.parentNode, // 要删除的tree节点
                         nid = parseInt(treeE.dataset.nid),// 删除的节点id
                         dataTemp = JSON.parse(localStorage.getItem('data'));
                    dataTemp = dataTemp.filter(function (item,index,array) {
                        console.log(item.id != nid);
                        return item.id != nid;
                    });
                    tree.innerHTML = that.initTreeDom(that.nodeToTree(dataTemp,'id','pid','children'));
                    localStorage.setItem('data',JSON.stringify(dataTemp)); // 存储数值
                }
            }else {
                // 点击，若有子元素，且隐藏，则展开；若展开，则隐藏
                let selectedElement = e.target;
                if(!e.target.classList.contains('tree')){
                    selectedElement = e.target.parentNode;
                }

                let nextE = selectedElement.nextElementSibling;
                if(nextE && nextE.nodeName.toLocaleLowerCase() === 'ul'){
                    if(nextE.style.display === 'none'){
                        nextE.style.display = 'block';
                    }else {
                        nextE.style.display = 'none';
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

                // 选中事件后，中间联动显示
                // 1、找到了id，然后去task里找pid为id的项目，显示出来
                let selectedId = selectedElement.dataset.nid,
                     taskTemp = JSON.parse(localStorage.getItem('task')),
                     a = that.nodeToTree(a,'id','pid','children');
                let tempArray = [];
                taskTemp.forEach(function (item,index,array) {
                    if(item.pid == selectedId){
                        tempArray.push(item);
                    }
                });
                if(nextE && nextE.nodeName.toLocaleLowerCase() === 'ul'){
                   // 非叶子节点1、先查找自身，然后查找children
                    // 挨个遍历节点，先找到该id
                    a.forEach(function (item,index,array) {

                    })
                }

                // 显示出来
                let tab_content = document.querySelector('.tab-content'),
                    tab_str = ``;
                if(tempArray.length > 0){
                    tab_str = `<div class="tab-content-item">
                    <div class="item-date">2017-05-01</div>
                    <div class="item-date-list">
                    <ul>`;
                    tempArray.forEach(function (item,index,array) {
                        tab_str+= `<li class="item-data-item">${item.name}</li>`;
                    });
                    tab_str+=`</ul>
                    </div>
                    </div>`;
                }
                tab_content.innerHTML = tab_str;
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
                // 查找被选中分类,1.判断分类列表被选中
                // 2.获取此时data值，给它添加元素，再存储
                let dataTemp = JSON.parse(localStorage.getItem('data')), // 此时的dataTemp值
                    lenTemp = dataTemp.length;
                if(cdTree.classList.contains('tree-selected')){
                    // tree.innerHTML += `<div class="tree" data-nid="${lenTemp + 1}">
                    //              <img src="${nodeImg}" class="icon-tree">
                    //              <span class="tree-name">${listName}</span>
                    //             (<span class="tree-count">0</span>)
                    //              <span class="tree-delete">X</span>
                    //      </div>`;
                    let temp = {
                        id: lenTemp + 1,
                        name: listName,
                        pid: cdTree.dataset.nid,
                        count: 0
                    };
                    dataTemp.push(temp);
                    localStorage.setItem('data',JSON.stringify(dataTemp));// 存储数据值
                    tree.innerHTML = that.initTreeDom(that.nodeToTree(dataTemp,'id','pid','children'));
                }else {
                   // 3.分类节点被选中，遍历树节点，查找到被选中的节点
                    for(let i = 0, len = trees.length; i < len; i ++){
                        if(trees[i].classList.contains('tree-selected')){
                         //    let nextE = trees[i].nextElementSibling;
                         //    if(nextE && nextE.nodeName.toLocaleLowerCase() === 'ul'){
                         //       nextE.innerHTML += `<li><div class="tree" data-nid="${lenTemp + 1}">
                         //         <img src="${nodeImg}" class="icon-tree">
                         //         <span class="tree-name">${listName}</span>
                         //        (<span class="tree-count">0</span>)
                         //         <span class="tree-delete">X</span>
                         // </div></li>`;
                         //    }else {
                         //        // 没有子元素
                         //        trees[i].parentNode.innerHTML += `<ul class="node"><li><div class="tree" data-nid="${lenTemp + 1}">
                         //         <img src="${nodeImg}" class="icon-tree">
                         //         <span class="tree-name">${listName}</span>
                         //        (<span class="tree-count">0</span>)
                         //         <span class="tree-delete">X</span>
                         // </div></li></ul>`
                         //    }
                            let temp = {
                                id: lenTemp + 1,
                                name: listName,
                                pid: trees[i].dataset.nid,
                                count: 0
                            };
                            dataTemp.push(temp);
                            localStorage.setItem('data',JSON.stringify(dataTemp));// 存储数据值
                            tree.innerHTML = that.initTreeDom(that.nodeToTree(dataTemp,'id','pid','children'));
                            break;
                        }
                    }
                }
                // 提示添加成功
                alert('添加成功！！');
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