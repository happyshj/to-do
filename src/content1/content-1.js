import './content-1.css';
import plusImg from './../common/plus.png';
import common from '../common/common';
import treeImg from './tree/imgs/tree.png';
import nodeImg from './tree/imgs/node.png';

let commonFn = new common();


export default function content1() {

}

content1.prototype = {
    content1Html: function () {
        // 题目
        let title = `<div class="cd-tree">分类列表</div>`;
        // 树
        let tree = `<div class="cv_fcv node">
                      <div class="tree">
                           <img src="${treeImg}" class="icon-tree">
                           <span class="tree-name">默认分类</span>
                           (<span class="tree-count">11</span>)
                           <span class="tree-delete">X</span>
                      </div>
                      <ul class="node">
                          <li>
                             <div class="tree">
                                 <img src="${treeImg}" class="icon-tree">  
                                 <span class="tree-name">IFE</span>
                                 (<span class="tree-count">11</span>)
                                 <span class="tree-delete">X</span>
                             </div>
                             <ul class="node">
                               <li>
                                 <div class="tree">
                                     <img src="${treeImg}" class="icon-tree">
                                     <span class="tree-name">IFE</span>
                                     (<span class="tree-count">11</span>)
                                     <span class="tree-delete">X</span>
                                 </div>
                               </li>
                               <li>
                                 <div class="tree">
                                     <img src="${treeImg}" class="icon-tree">
                                     <span class="tree-name">IFE</span>
                                     (<span class="tree-count">11</span>)
                                     <span class="tree-delete">X</span>
                                 </div>
                               </li>
                             </ul>
                          </li>
                      </ul>
                      
                      <div class="tree">
                          <img src="${treeImg}" class="icon-tree">
                          <span class="tree-name">默认分类</span>
                          (<span class="tree-count">11</span>)
                          <span class="tree-delete">X</span>
                      </div>
                         <ul class="node">
                           <li>
                            <div class="tree">
                                <img src="${treeImg}" class="icon-tree">
                                <span class="tree-name">IFE</span>
                                (<span class="tree-count">11</span>)
                                <span class="tree-delete">X</span>
                            </div>
                          </li>
                         </ul>
                   </div>`;
        // 统计
        let count = `<div class="content-1-count">
                         <div>所有任务（<span id="count">11</span>）</div>
                         <div class="content-1-list">${title + tree}</div>
                     </div>`;

        // 底部
        let add = `<div class="content-1-add">
                       <img src="${plusImg}" class="addImg">
                       <span class="add">新增分类</span>
                    </div>`;
        return count+add;
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
                                     <span class="tree-name">IFE</span>
                                     (<span class="tree-count">11</span>)
                                     <span class="tree-delete">X</span>
                                 </div>
                               </li>`;
                    element.nextElementSibling.innerHTML += addTreeE;
                }else {
                    // 若没有子元素
                    let addTreeE = `<ul class="node">
                                      <li>
                                        <div class="tree">
                                         <img src="${treeImg}" class="icon-tree"> 
                                          <span class="tree-name">IFE</span>
                                         (<span class="tree-count">11</span>)
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
                          <span class="tree-name">默认分类</span>
                          (<span class="tree-count">11</span>)
                          <span class="tree-delete">X</span>
                      </div>`;
                    tree.innerHTML += addTreeE;
                    that.initTree();
                }else {
                    alert('没有分类被选中！！！');
                }
            }
        });
    }
};

