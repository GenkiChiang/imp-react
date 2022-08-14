import { OldDom } from "./types";

export const updateTextNode = (oldDom: OldDom, element, oldElement) => {
  if (element.props.textContent !== oldElement.props.textContent) {
    oldDom.textContent = element.props.textContent;
    oldDom._element = element;
  }
};
