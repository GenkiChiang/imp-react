import { isBoolean, isNull, isObject, isUndefined } from "lodash/fp";
import { IElement } from "./types";
import { isFalsy } from "./utils";

/**
 * jsx parser fn，return virtual dom
 * @param type
 * @param props
 * @param children
 */
export const createElement = (
  type: IElement["type"],
  props = {},
  ...children: any[]
): IElement => {
  const childrenElements = [...children].reduce((previousValue, child) => {
    if (isFalsy(child)) {
      return previousValue;
    }

    if (isObject(child)) {
      previousValue.push(child);
    } else {
      previousValue.push(createElement("text", { textContent: child }));
    }

    return previousValue;
  }, []);

  return {
    type,
    props: Object.assign({ children: childrenElements }, props),
    children: childrenElements,
  };
};
