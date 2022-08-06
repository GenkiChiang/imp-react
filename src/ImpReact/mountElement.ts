import { IElement } from "./types";
import { isFunction } from "lodash";
import { createDomElement } from "./createDomElement";
import { isClassComponent } from "./utils";

export const mountElement = (element: IElement, container: HTMLElement) => {
  const { type, props, children } = element;

  if (!isFunction(type)) {
    // TODO:  mount native element
    const newDom = createDomElement(element);

    container.appendChild(newDom);
    // return;
  } else if (isClassComponent(type)) {
    // TODO: mount class component
  } else {
    // TODO: mount fn component
  }
};
