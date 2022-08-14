import { Dom, OldDom, ReactElement } from "./types";
import { mountNativeElement } from "./mountNativeElement";
import { mountComponent } from "./mountComponent";
import { ComponentType } from "./types/component";
import { isComponent } from "./utils";

export const mountElement = (
  element: ReactElement,
  container: Dom,
  oldDom?: OldDom
) => {
  const { type } = element;

  if (isComponent(type)) {
    // mount component
    mountComponent(
      element as ReactElement<any, ComponentType>,
      container,
      oldDom
    );
  } else {
    // mount native element
    mountNativeElement(element, container, oldDom);
  }
};
