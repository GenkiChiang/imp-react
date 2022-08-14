import { Dom, OldDom, ReactElement } from "./types";
import { mountElement } from "./mountElement";
import { isComponent } from "./utils";
import { diffComponent } from "./diffComponent";
import { diffElement } from "./diffElement";

export const diff = (
  element: ReactElement,
  container: Dom,
  oldDom?: OldDom
) => {
  const { type, props } = element;
  const oldElement = oldDom?._element;
  const oldInstance = oldElement?.ReactInstance;

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

  // console.log(element)
  // diff子节点
  element.props.children.forEach((child, index) => {
    diff(child, oldDom, oldDom.childNodes[index]);
  });
};

/**
 * TODO:
 * 3. 更新DOM元素：删除节点
 * 4. 更新DOM元素：setState 实现类组件更新
 * 7. implement ref get DOM and Component Instance
 * 8. key 属性进行节点对比
 * 9. 删除节点
 */
