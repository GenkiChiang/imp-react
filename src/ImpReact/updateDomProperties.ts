import { ReactElement } from "./types";
import { Maybe } from "./types/utils";
import { addEvent, isEventProps, removeEvent } from "./utils/eventHelper";

export const updateDomProperties = (
  oldDom: HTMLElement,
  element: ReactElement,
  oldElement?: Maybe<ReactElement>
) => {
  const { props } = element;
  const oldProps = oldElement?.props;

  Object.entries(props).forEach(([propName, propValue]) => {
    const oldPropValue = oldProps?.[propName];
    if (oldPropValue !== propValue) {
      console.log(oldPropValue, propValue);

      if (isEventProps(propName)) {
        addEvent(propName, propValue, oldDom);
      } else if (propName === "value" || propName === "checked") {
        oldDom[propName] = propValue;
      } else if (propName === "className") {
        oldDom.setAttribute("class", propValue as string);
      } else {
        oldDom.setAttribute(propName, propValue as string);
      }
    }
  });

  // 处理props被删除的情况
  if (!oldProps) return;
  Object.entries(oldProps).forEach(([oldPropsName, oldPropsValue]) => {
    const propValue = props[oldPropsName];
    if (propValue === undefined) {
      if (isEventProps(oldPropsName)) {
        removeEvent(oldPropsName, propValue, oldDom);
      } else if (oldPropsName === "value" || oldPropsName === "checked") {
        oldDom[oldPropsName] = "";
      } else {
        oldDom.removeAttribute(oldPropsName);
      }
    }
  });
};
