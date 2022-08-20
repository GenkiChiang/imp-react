import { Dom, MixinChildNode, OldDom, ReactElement, ReactKey } from "./types";
import { mountElement } from "./mountElement";
import { isComponent } from "./utils";
import { diffComponent } from "./diffComponent";
import { diffElement } from "./diffElement";
import { unmountNode } from "./unmountNode";
import { EFFECT_TAG } from "./types/effectTag";

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

    // console.log('isNot Components')
    // 有key的单独处理
    const oldHasKeyChildrenMap = new Map<ReactKey, MixinChildNode>();
    oldDom.childNodes.forEach((oldChildNode: MixinChildNode, index) => {
      // if (oldChildElement.type === "text") return;
      const oldKey = oldChildNode._element.key;
      // get elementChildren from new element
      if (oldKey !== null) {
        // 判断 新旧节点的key是不是一样的，如果不一样，调换位置
        oldHasKeyChildrenMap.set(oldKey, oldChildNode);
      }
    });

    element.props.children.forEach((childElement, index) => {
      const newKey = childElement.key;
      const oldChildNode = oldDom.childNodes[index] as MixinChildNode;

      // get elementChildren from new element
      if (newKey !== null) {
        const keyedOldChild = oldHasKeyChildrenMap.get(newKey);
        if (keyedOldChild) {
          if (oldChildNode !== keyedOldChild) {
            // 调换位置
            oldDom.insertBefore(keyedOldChild, oldChildNode);
          }

          oldHasKeyChildrenMap.delete(newKey);
        } else {
          // 新增
          childElement.effectTag = EFFECT_TAG.INSERT;
          mountElement(childElement, oldDom, oldChildNode);
        }
      }
      diff(childElement, oldDom, oldDom.childNodes[index]);
    });

    // 删除节点
    // TODO: 有key的单独处理？？
    const oldChildNodes = oldDom.childNodes;
    if (oldChildNodes.length > element.props.children.length) {
      // remove redundant old child
      while (oldChildNodes.length > element.props.children.length) {
        unmountNode(oldChildNodes[oldChildNodes.length - 1]);
      }
    }
  }
};
