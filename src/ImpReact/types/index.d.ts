// virtual dom
export type Key = number | string;
export interface IElement {
  type: string | Function;
  props: IElementProps;
  children: IElement[];
}

export interface IElementProps {
  [key: string]: any;
  key?: Key;
  textContent?: string;
  children: IElement[];
}
