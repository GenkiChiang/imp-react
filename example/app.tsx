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
ImpReact.render(virtualDom, root);
