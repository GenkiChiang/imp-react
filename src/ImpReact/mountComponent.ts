import { FC, IElement } from "./types";
import { isClassComponent } from "./utils";
import { Component } from "./Component";
import { mountElement } from "./mountElement";

const buildClassComponent = (element: IElement<{}, Component>) => {
  const { type, props } = element;
  // @ts-ignore
  const component = new type(props);
  const nextElement = component.render();
  nextElement.component = component;
  return nextElement;
};

const buildFnComponent = (element: IElement<{}, FC>) => {
  const { type, props } = element;
  return type(props);
};

export const mountComponent = (
  element: IElement,
  container: HTMLElement,
  oldElement?: IElement
) => {
  const { type } = element;
  let nextElement;
  let component;
  console.log(isClassComponent(type))
  console.dir((type))
  if (isClassComponent(type)) {
    // TODO: mount class component
    // @ts-ignore
    nextElement = buildClassComponent(element);
    component = nextElement.component;
  } else {
    // TODO: mount fn component
    // @ts-ignore
    nextElement = buildFnComponent(element);
  }

  mountElement(nextElement, container, oldElement);

  if (component) {
    component.componentDidMount();
  }
};
