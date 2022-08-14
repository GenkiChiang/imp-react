import ImpReact from "../src/ImpReact";
import { FC } from "../src/ImpReact/types/component";

interface Props {
  title: string;
  name: string;
  content: string;
}
const defaultProps = {
  title: "fn component",
  name: "",
  content: "fn component's text content",
};
const TestFnComponent: FC<Partial<Props>> = (props = defaultProps) => {
  let conditionRenderFlag = 1;
  return (
    <div className="fn-component-container">
      <h4>hello ,i'm {props.title}</h4>
      <p>{props.content}</p>
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
};
export default TestFnComponent;
