import {
  isArray,
  isBoolean,
  isNull,
  isObject,
  isPlainObject,
  isUndefined,
} from "lodash/fp";
import { Component } from "../Component";
import { FC } from "../types";

export const isClassComponent = (type: any) => {
  console.log(type);
  return type?.prototype?.render;
};

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
