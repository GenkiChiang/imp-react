import { IElement } from "./types";
import { updateDomProperties } from "./updateDomProperties";
import { mountElement } from "./mountElement";

export const createDomElement = (element: IElement) => {
  const { type, props, children } = element;
  // 文本节点
  let newDom: HTMLElement | Text;
  if (type === "text") {
    newDom = document.createTextNode(props.textContent);
  } else {
    // 元素节点
    newDom = document.createElement(type as string);
    updateDomProperties(newDom, element);
  }

  children.forEach((child) => {
    mountElement(child, newDom as HTMLElement);
  });

  return newDom;
};
