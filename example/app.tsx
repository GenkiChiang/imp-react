// test fn component

import ImpReact from "../src/ImpReact";
import TestClassComponent from "./TestClassComponent";
import TestFnComponent from "./TestFnComponent";

const root = document.getElementById("app");

let conditionRenderFlag = 1;

const virtualDom = (
  <div className="container">
    <TestClassComponent />
    <TestFnComponent />
  </div>
);
ImpReact.render(
  <TestFnComponent title="函数组件" content="函数组件内容" />,
  root
);

setTimeout(() => {
  ImpReact.render(
    <TestFnComponent title="改变后的函数组件" content="改变后的函数组件内容" />,
    root
  );
}, 2000);
