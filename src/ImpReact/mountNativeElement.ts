import { Dom, MixinChildNode, OldDom, ReactElement } from "./types";
import { createDomElement } from "./createDomElement";
import { unmountNode } from "./unmountNode";

export const mountNativeElement = (
  element: ReactElement,
  container: Dom,
  oldDom?: OldDom
) => {
  const newDomElement = createDomElement(element);

  if (oldDom) {
    container.insertBefore(newDomElement, oldDom);
    unmountNode(oldDom as MixinChildNode);
  } else {
    container.appendChild(newDomElement);
  }

  if (element.ReactInstance) {
    element.ReactInstance.setDom(newDomElement);
  }

};
