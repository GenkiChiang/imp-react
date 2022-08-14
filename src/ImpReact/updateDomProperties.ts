import { MixinHTMLDom, ReactElement } from "./types";
import { getEventName, isEventProps } from "./utils";
import { Maybe } from "./types/utils";

export const updateDomProperties = (
  oldDom: MixinHTMLDom,
  element: ReactElement,
  oldElement?: Maybe<ReactElement>
) => {
  const { props } = element;
  const oldProps = oldElement?.props;

  Object.entries(props).forEach(([propName, propValue]) => {
    const oldPropValue = oldProps?.[propName];
    if (oldPropValue !== propValue) {
      if (isEventProps(propName)) {
        const eventName = getEventName(propName);
        oldDom.addEventListener(eventName, propValue as EventListener);
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
        const eventName = getEventName(oldPropsName);
        oldDom.removeEventListener(eventName, oldPropsValue as EventListener);
      } else if (oldPropsName === "value" || oldPropsName === "checked") {
        oldDom[oldPropsName] = "";
      } else {
        oldDom.removeAttribute(oldPropsName);
      }
    }
  });
};
