import './tree.css';
import common from '../../common/common';

let commonFn = new common();

export default function tree() {

}
tree.prototype = {
  treeHtml: function () {
      // 题目
      let title = `<div class="cd-tree">分类列表</div>`;
      // 树
      let tree = `<div class="cv_fcv node">
                      <div class="tree">默认分类</div>
                      <ul class="node">
                          <li>
                             <div class="tree">IFE</div>
                             <ul class="node">
                               <li>
                                 <div class="tree">IFE</div>
                               </li>
                             </ul>
                          </li>
                      </ul>
                      
                      <div class="tree">默认分类</div>
                         <ul class="node">
                           <li>
                            <div class="tree">IFE</div>
                          </li>
                         </ul>
                   </div>`;
      return title+tree;
  },
  init: function () {
      let tree = document.querySelector('.cv_fcv');
      commonFn.addHandler(tree,'click',function (e) {
          console.log(e.target);
          // 点击，若有子元素，且隐藏，则展开；若展开，则隐藏
          console.log(e.target.nextElementSibling);
          let nextElement = e.target.nextElementSibling;
          if(nextElement){
              if(nextElement.style.display == 'none'){
                  nextElement.style.display = 'block';
              }else {
                  nextElement.style.display = 'none'
              }
          }
      });
  }  
};
