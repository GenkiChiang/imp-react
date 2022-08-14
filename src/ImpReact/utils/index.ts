import {
  isArray,
  isBoolean,
  isNull,
  isObject,
  isPlainObject,
  isUndefined,
} from "lodash/fp";
import { ComponentType } from "../types/component";
import { ReactElement, ReactInstance } from "../types";

export const shouldConstruct = (type: ComponentType) => {
  const prototype = type.prototype;
  return !!(prototype && prototype.isReactComponent);
};
export const hasValidKey = (props) => props.key !== undefined;
export const hasValidRef = (props) => props.ref !== undefined;

export const isClassComponent = (type: ComponentType) => {
  if (typeof type === "function")
    return !!type.prototype && type.prototype.isReactComponent;
};
export const isComponent = (type: ReactElement["type"]) => {
  return typeof type === "function";
};

export const isSameComponent = (
  element: ReactElement,
  oldInstance: ReactInstance
) => {
  return oldInstance && element.type === oldInstance.constructor;
};

export const isSameElementType = (
  element: ReactElement,
  oldElement: ReactElement
) => {
  return element.type === oldElement.type;
};

export const isEventProps = (propsName: string) => propsName.startsWith("on");
export const getEventName = (propsName: string) =>
  propsName.slice(2).toLowerCase();
const isFalsyObject = (value) => {
  if (!isObject(value)) return false;
  if (!isPlainObject(value)) return false;
  return Object.keys(value).length === 0;
};
export const isFalsy = (value: any) => {
  if (isArray(value) && value.length === 0) {
    return true;
  } else if (isFalsyObject(value)) {
    return true;
  } else if (isNull(value)) {
    return true;
  } else if (isUndefined(value)) {
    return true;
  } else if (isBoolean(value)) {
    return true;
  }
  return false;
};
