import './content-1.css';
import plusImg from './../common/plus.png';

export default function content1() {
    // 统计
    let count = '<div class="content-1-count">'
            +'<span>所有任务（<span id="count">11</span>）</span>'
            +'</div>';
    // 列表
    // 底部
    let add = '<div class="content-1-add">'
            +'<img src="'+plusImg+'" class="addImg">'
            +'<span class="add">新增分类</span>'
            +'</div>';
    return count+add;
}
