import { Dom, MixinChildNode, OldDom, ReactElement } from "./types";
import { createDomElement } from "./createDomElement";
import { unmountNode } from "./unmountNode";
import { EFFECT_TAG } from "./types/effectTag";

export const mountNativeElement = (
  element: ReactElement,
  container: Dom,
  oldDom?: OldDom
) => {
  const newDomElement = createDomElement(element);

  if (oldDom) {
    container.insertBefore(newDomElement, oldDom);
    if (element.effectTag !== EFFECT_TAG.INSERT) {
      unmountNode(oldDom as MixinChildNode);
    }
  } else {
    container.appendChild(newDomElement);
  }

  if (element.ReactInstance) {
    element.ReactInstance.setDom(newDomElement);
  }
};
