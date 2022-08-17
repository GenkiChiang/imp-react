import { isObject } from "lodash/fp";
import {
  PropsWithChildren,
  ReactElement,
  ReactKey,
  ReactRef,
  RefFn,
} from "./types";
import { hasValidKey, hasValidRef, isFalsy } from "./utils";
import { REACT_ELEMENT_TYPE } from "./reactSymbols";
import { ComponentType } from "./types/component";

const RESERVED_PROPS = {
  key: true,
  ref: true,
};
/**
 * jsx parser fn，return react virtual dom
 * @param type
 * @param config
 * @param children
 */
export const createElement = <P = any>(
  type: string | ComponentType<P>,
  config,
  ...children: any[]
): ReactElement<P> => {
  const props: PropsWithChildren = {};

  let key: ReactKey = null;
  let ref: ReactRef = null;

  if (config !== null) {
    if (hasValidKey(config)) {
      key = config.key;
    }
    if (hasValidRef(config)) {
      ref = config.ref;
    }

    Object.entries(config).forEach(([propName, propValue]) => {
      // console.log(propName)
      if (!RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = propValue;
      }
    });
  }
  // resolve virtual dom's children
  const childrenElements: ReactElement[] = []
    .concat(...children)
    .reduce((previousValue, child) => {
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
    }, []);
  Object.freeze(childrenElements);
  props.children = childrenElements;

  // resolve default props
  if (typeof type === "function" && type.defaultProps) {
    const defaultProps = type.defaultProps;
    Object.entries(defaultProps).forEach(([propName, propValue]) => {
      if (props[propName] === undefined) {
        props[propName] = propValue;
      }
    });
  }

  return ReactElementFactory(type, key, ref, props);
};

const ReactElementFactory = (type, key: ReactKey, ref, props): ReactElement => {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,

    type,
    key,
    ref,
    props,
  };

  Object.defineProperty(element.props, "children", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: props.children,
  });
  Object.freeze(element.props);
  // Object.freeze(element);

  // console.log(element.props);
  return element;
};
