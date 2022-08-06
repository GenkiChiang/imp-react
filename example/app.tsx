// test fn component

import ImpReact from "../src/ImpReact";

const root = document.getElementById("app");

let conditionRenderFlag = 1;

const virtualDom = (
  <div className="container">
    <h4>hello React</h4>
    <h4 data-test="test">自定义attribute</h4>
    <div className="multi-content">
      嵌套level 1
      <div>
        嵌套level 1.1
        <div>嵌套level 1.1.1</div>
      </div>
    </div>
    <h4>test: 条件表达式</h4>
    {conditionRenderFlag === 1 && <div>1===1渲染当前内容</div>}
    {conditionRenderFlag === 2 && <div>2===1渲染当前内容</div>}
    <span>这是一段内容</span>
    <button
      onClick={() => {
        console.log("button clicked");
      }}
    >
      点击我
    </button>
    <h4>这个将会被删除</h4>
    无标签包裹的的内容
    <input type="text" value="input.value" />
  </div>
);
ImpReact.render(virtualDom, root);