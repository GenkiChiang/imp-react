import { ClassComponent, ComponentType } from "./component";

type PropsWithChildren<P = any> = P & { children?: ReactElement[] };

export interface ReactElement<P = any, T = string | ComponentType<P>> {
  $$typeof?: symbol; // TODO:

  type: T;
  key?: ReactKey;
  ref?; // TODO:
  readonly props: PropsWithChildren<P>; // TODO:

  // Record the component responsible for creating this element.
  ReactInstance?: ReactInstance;
  _owner?; // TODO:
}

export interface NativeElement<P = any> extends ReactElement<P, string> {}

export type ReactKey = string | number;
export type ReactInstance = ClassComponent; // classComponent or Element;

export interface Element {}

//
// const ReactElement = function(type, key, ref, self, source, owner, props) {
//   const element = {
//     // This tag allows us to uniquely identify this as a React Element
//     $$typeof: REACT_ELEMENT_TYPE,
//
//     // Built-in properties that belong on the element
//     type: type,
//     key: key,
//     ref: ref,
//     props: props,
//
//     // Record the component responsible for creating this element.
//      ReactInstance
//     _owner: owner,
//   };

export type ReactNode =
  | null
  | boolean
  | number
  | string
  | ReactElement
  | Iterable<ReactElement>;
// | React$Element<any>
// | React$Portal
// | Iterable<?React$Node>;

export type OldDom = MixinTextDom | MixinChildNodeDom | MixinHTMLDom;
export type Dom = HTMLElement | Text | ChildNode;
export type MixinTextDom = Text &
  Partial<{
    _element: ReactElement;
  }>;
export type MixinChildNodeDom = ChildNode &
  Partial<{
    _element: ReactElement;
  }>;
export type MixinHTMLDom = HTMLElement &
  Partial<{
    _element: ReactElement;
  }>;
