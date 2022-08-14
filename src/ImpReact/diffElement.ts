import { MixinHTMLDom, OldDom, ReactElement } from "./types";
import { updateTextNode } from "./updateTextNode";
import { updateDomProperties } from "./updateDomProperties";
import { isSameElementType } from "./utils";
import { createDomElement } from "./createDomElement";

export const diffElement = (element: ReactElement, oldDom: OldDom) => {
  const oldElement = oldDom._element;
  if (isSameElementType(element, oldElement)) {
    // 「元素节点」节点类型相同, 更新元素属性
    if (element.type === "text") {
      updateTextNode(oldDom, element, oldElement);
    } else {
      updateDomProperties(oldDom as MixinHTMLDom, element, oldElement);
    }
  } else {
    // 「元素节点」节点类型不同, 不需要diff，生成newDom 替换oldDom
    const newDom = createDomElement(element);
    oldDom.parentNode.replaceChild(newDom, oldDom);
  }
};
