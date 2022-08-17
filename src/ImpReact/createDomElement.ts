import { MixinHTMLDom, MixinTextDom, ReactElement } from "./types";
import { updateDomProperties } from "./updateDomProperties";
import { mountElement } from "./mountElement";
import {setRef} from "./utils";

export const createDomElement = (element: ReactElement) => {
  const { type, props } = element;
  // console.log(element)
  const children = props.children as ReactElement[];
  // 文本节点
  let newDom: MixinHTMLDom | MixinTextDom;
  if (type === "text") {
    //
    newDom = document.createTextNode(props.textContent);
  } else {
    // 元素节点
    newDom = document.createElement(type as string);
    updateDomProperties(newDom, element);
  }
  // save virtual dom
  newDom._element = element;

  children.forEach((child) => {
    mountElement(child, newDom as HTMLElement);
  });

  if (element.ref) {
    // element.ref(newDom);
    setRef(element.ref, newDom);
  }
  return newDom;
};
