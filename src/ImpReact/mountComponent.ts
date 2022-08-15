import { Dom, OldDom, ReactElement, ReactInstance } from "./types";
import { shouldConstruct } from "./utils";
import { mountElement } from "./mountElement";
import { ClassComponent, ComponentType, FC } from "./types/component";
import { setRef } from "./createRef";

const buildClassComponent = (
  element: ReactElement<any, ClassComponent>
): ReactElement => {
  const { type, props } = element;

  const instance = new type(props);
  const nextElement = instance.render();
  nextElement.ReactInstance = instance;
  return nextElement;
};

const buildFnComponent = (element: ReactElement<any, FC>): ReactElement => {
  const { type, props } = element;

  return type(props);
};

export const mountComponent = (
  element: ReactElement<any, ComponentType>,
  container: Dom,
  oldDom?: OldDom
) => {
  const { type } = element;
  let nextElement: ReactElement;
  let instance: ReactInstance;
  if (shouldConstruct(type)) {
    // TODO: mount class component
    nextElement = buildClassComponent(
      element as ReactElement<any, ClassComponent>
    );
    instance = nextElement.ReactInstance;
    instance.componentWillMount();
  } else {
    // mount fn component
    nextElement = buildFnComponent(element as ReactElement<any, FC>);
  }

  mountElement(nextElement, container, oldDom);

  if (instance) {
    instance.componentDidMount();
    setRef(element.ref, instance);
    // element.ref && element.ref(instance);
  }
};
