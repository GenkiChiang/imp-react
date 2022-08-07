import { IElement } from "./types";
import { isFunction } from "lodash";
import { mountNativeElement } from "./mountNativeElement";
import { mountComponent } from "./mountComponent";

export const mountElement = (
  element: IElement,
  container: HTMLElement,
  oldElement?: IElement
) => {
  const { type, props, children } = element;

  if (!isFunction(type)) {
    // mount native element
    mountNativeElement(element, container, oldElement);
  } else if (isFunction(type)) {
    // mount component
    mountComponent(element, container, oldElement);
  }
};
