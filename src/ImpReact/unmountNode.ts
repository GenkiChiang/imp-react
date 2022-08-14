import { MixinChildNode, MixinNode, OldDom } from "./types";
import { hasValidRef, isClassComponent } from "./utils";
import { entries, forEach } from "lodash";
import { isEventProps, removeEvent } from "./utils/eventHelper";
import { Maybe } from "./types/utils";

export const unmountNode = (oldDom: MixinChildNode) => {
  // TODO:
  const oldElement = oldDom._element;
  // 1.文本节点，直接删除
  if (oldElement.type === "text") {
    oldDom.remove();
    return;
  }

  // 2.如果是class节点，调用生命周期
  if (isClassComponent(oldElement.type)) {
    const instance = oldElement.ReactInstance;
    instance.componentWillUnmount();
  }

  // TODO: 3.是否有ref
  if (hasValidRef(oldElement.props)) {
  }

  // 4.是否有注册有event,如果有remove event
  entries(oldElement.props).forEach(([propName, propValue]) => {
    if (isEventProps(propName)) {
      removeEvent(propName, propValue, oldDom);
    }
  });
  // 5.递归子节点，并且unmount子节点
  while (oldDom.childNodes.length > 0) {
    unmountNode(oldDom.childNodes[0]);
  }
  // 删除
  oldDom.remove();
};
