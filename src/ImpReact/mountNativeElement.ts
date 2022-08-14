import { OldDom, ReactElement } from "./types";
import { createDomElement } from "./createDomElement";
import { unmountNode } from "./unmountNode";

export const mountNativeElement = (
  element: ReactElement,
  container: HTMLElement,
  oldDom?: OldDom
) => {
  const newDomElement = createDomElement(element);

  if (oldDom) {
    container.insertBefore(newDomElement, oldDom);
    unmountNode(oldDom);
  } else {
    container.appendChild(newDomElement);
  }
};
