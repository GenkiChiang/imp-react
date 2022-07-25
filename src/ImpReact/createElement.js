import { isBoolean, isNull, isObject, isUndefined } from "lodash/fp";

const createElement = (type, props = {}, ...children) => {
  const childrenElements = [...children].reduce((previousValue, child) => {
    if (isBoolean(child) || isNull(child) || isUndefined(child)) {
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

export default createElement;
