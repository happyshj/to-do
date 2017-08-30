import './style.css';
import content1 from './content1/content-1';
import content2 from './content2/content-2';

// 全局变量
let content1Element = new content1();
let content2Element = new content2();

// 总布局
function all() {
    let content1Element = new content1();
    let content2Element = new content2();

    // 主容器
    let containerElement = document.createElement('div');
    containerElement.classList.add('container');

    // header
    let headerElement = '<header><span id="todoHeader" class="todo-header">Shj</span></header>';

    // content
    let contentElement = '<div class="content">'
            +'<div class="content-1">'
            +content1Element.content1Html()
            +'</div>'
            +'<div class="content-2">'+content2Element.contentHtml()+'</div>'
            +'<div class="content-3">aaa</div>'
        +'</div>';

    containerElement.innerHTML = headerElement + contentElement;

    return containerElement;
}

document.body.appendChild(all());
content1Element.init();
content2Element.init();
