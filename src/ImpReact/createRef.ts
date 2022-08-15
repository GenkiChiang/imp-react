import { ReactRef, RefObject } from "./types";

export const createRef = <T = null>(instance: T = null): RefObject<T> => {
  const refObject = {
    current: instance,
  };
  Object.seal(refObject);

  return refObject;
};

export const setRef = (ref: ReactRef, instance) => {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(instance);
  } else {
    ref.current = instance;
  }
};
