import { IElement } from "./types";

export const updateDomProperties = (dom: HTMLElement, element: IElement) => {
  const { props } = element;
  Object.entries(props).map(([propName, propValue]) => {
    if (propName.startsWith("on")) {
      const eventName = propName.slice(2).toLowerCase();
      dom.addEventListener(eventName, propValue);
    } else if (propName === "value" || propName === "checked") {
      dom[propName] = propValue;
    } else if (propName === "className") {
      dom.setAttribute("class", propValue);
    } else if (propName !== "children") {
      dom.setAttribute(propName, propValue);
    }
  });
};
