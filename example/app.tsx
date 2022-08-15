// test fn component

import ImpReact from "../src/ImpReact";
import TestClassComponent from "./TestClassComponent";
import TestFnComponent from "./TestFnComponent";

const root = document.getElementById("app");

const virtualDom = (
  <div className="container">
    <TestClassComponent />
    <TestFnComponent />
  </div>
);
let _ref;
ImpReact.render(
  <TestClassComponent
    ref={(ref) => (_ref = ref)}
    title="Class组件"
    content="Class组件的内容"
  />,
  root
);
setTimeout(() => {
  console.log(_ref);
});
// setTimeout(() => {
//   ImpReact.render(
//     <TestFnComponent title="改变后的函数组件" content="改变后的函数组件内容" />,
//     root
//   );
// }, 2000);
