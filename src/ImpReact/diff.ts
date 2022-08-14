import { OldDom, ReactElement } from "./types";
import { mountElement } from "./mountElement";
import { isComponent } from "./utils";
import { diffComponent } from "./diffComponent";
import { diffElement } from "./diffElement";

export const diff = (
  element: ReactElement,
  container: HTMLElement,
  oldDom?: OldDom
) => {
  const { type, props } = element;
  const oldElement = oldDom?._element;
  const oldInstance = oldElement?.ReactInstance;

  console.log("oldDom");
  console.log(oldDom);

  if (!oldDom) {
    // mount element
    mountElement(element, container);
  } else if (isComponent(element.type)) {
    // 组件对比
    // diff and update component
    diffComponent(element, container, oldDom, oldInstance);
  } else {
    // diff and update element
    diffElement(element, oldDom);
  }
};

/**
 * TODO:
 // * 1. 更新DOM元素  VDom 对比  节点类型相同
 // * 2. 更新DOM元素  VDOM 对比：节点类型不同
 * 3. 更新DOM元素：删除节点
 * 4. 更新DOM元素：setState 实现类组件更新
 // * 5. 组件更新----不是同一个组件
 // * 6. 组件更新----是同一个组件
 * 7. implement ref get DOM and Component Instance
 * 8. key 属性进行节点对比
 * 9. 删除节点
 */
