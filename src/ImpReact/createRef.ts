import {RefObject} from "./types";

export const createRef = <T = null>(instance: T = null): RefObject<T> => {
  const refObject = {
    current: instance,
  };
  Object.seal(refObject);

  return refObject;
};

