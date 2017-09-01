import './tree.css';
import common from '../../common/common';
import treeImg from './imgs/tree.png';
import nodeImg from './imgs/node.png';

let commonFn = new common();

export default function tree() {

}
tree.prototype = {
  treeHtml: function () {
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
      return title+tree;
  },
  init: function () {
      /* 初始化图片 */
      let trees = document.getElementsByClassName('tree');
      [...trees].forEach(function (item,index,array) {
         let nextE = item.nextElementSibling;
         // let imgElement = document.createElement('img');
         //  imgElement.classList.add('icon-tree');
          let imgElement = item.querySelector('.icon-tree');
         if(!nextE){
             // 添加tree图片
             imgElement.src = nodeImg;
         }else {
             imgElement.src = treeImg;
         }
          //item.insertBefore(imgElement, item.firstElementChild);
      });

      /* 展开与合并、删除、点击添加选中标志*/
      let tree = document.querySelector('.cv_fcv');
      commonFn.addHandler(tree,'click',function (e) {
          // 先判断是删除还是合并
          if(e.target.classList.contains('tree-delete')){
              // 删除
              e.stopPropagation();
              let flag = confirm('确定删除该分类吗？');
              console.log(flag);
              if(flag){
                  // 删除tree，及后面的ul
                  let treeE = e.target.parentNode;
                  let nextE = treeE.nextElementSibling;
                  if(nextE){
                      nextE.parentNode.removeChild(nextE);
                  }
                  treeE.parentNode.removeChild(treeE);
              }
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
              selectedElement.classList.add('tree-selected');
          }
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

  }  
};
