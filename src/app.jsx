// test fn component
import ImpReact from "./ImpReact";

const root = document.getElementById("#app");

const virtualDom = <div>hello, i'm test virtual dom</div>;

ImpReact.render(virtualDom, root);
