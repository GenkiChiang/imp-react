import { isSameComponent } from "./utils";
import { OldDom, ReactElement, ReactInstance } from "./types";
import { ComponentType } from "./types/component";
import { mountElement } from "./mountElement";
import { updateComponent } from "./updateComponent";

export const diffComponent = (
  element: ReactElement,
  container: HTMLElement,
  oldDom: OldDom,
  oldInstance: ReactInstance
) => {
    // console.log(element, oldInstance)
    // console.log(isSameComponent(element, oldInstance))
  if (isSameComponent(element, oldInstance)) {
    // 相同class组件,做组件更新操作
    updateComponent(element, container, oldDom, oldInstance);
  } else {
    // 不同组件，重新mount
    mountElement(element, container, oldDom);
  }
};
