import { IElement } from "./types";
import { isFunction } from "lodash";
import { isClassComponent } from "./utils";
import { createDomElement } from "./createDomElement";
import { mountElement } from "./mountElement";

export const diff = (
  element: IElement,
  container: HTMLElement,
  oldElement?: IElement
) => {
  const { type, props, children } = element;
  if (!oldElement) {
    // TODO: mount element
    mountElement(element, container);
  } else {
    // TODO: diff and update element
  }
};
