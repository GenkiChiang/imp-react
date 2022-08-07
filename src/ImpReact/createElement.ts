import { isBoolean, isNull, isObject, isUndefined } from "lodash/fp";
import { FC, IElement } from "./types";
import { isFalsy } from "./utils";
import { Component } from "./Component";

/**
 * jsx parser fn，return virtual dom
 * @param type
 * @param props
 * @param children
 */
export const createElement = (
  type: string | FC | Component,
  props = {},
  ...children: any[]
): IElement => {
  const childrenElements: IElement[] = [...children].reduce(
    (previousValue, child) => {
      // 忽略 undefined null boolean [] {}
      if (isFalsy(child)) {
        return previousValue;
      }

      if (isObject(child)) {
        previousValue.push(child);
      } else {
        previousValue.push(createElement("text", { textContent: child }));
      }

      return previousValue;
    },
    []
  );

  return {
    type,
    props: Object.assign({ children: childrenElements }, props),
    children: childrenElements,
  };
};
