import './style.css';
import content1 from './content1/content-1';

function Todo() {

}
Todo.prototype = {
    init: function () {

    }
};


// 总布局
function all() {
    // 主容器
    let containerElement = document.createElement('div');
    containerElement.classList.add('container');

    // header
    let headerElement = '<header><span id="todoHeader" class="todo-header">Shj</span></header>';

    // content
    let contentElement = '<div class="content">'
            +'<div class="content-1">'
            +content1()
            +'</div>'
            +'<div class="content-2">aaa</div>'
            +'<div class="content-3">aaa</div>'
        +'</div>';

    containerElement.innerHTML = headerElement + contentElement;

    return containerElement;
}

document.body.appendChild(all());