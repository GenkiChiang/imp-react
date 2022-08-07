// virtual dom
import { Component } from "../Component";

export type Key = number | string;

export interface IElement<
  P extends Partial<IElementProps> = any,
  T extends string | FC | Component = any
> {
  type: T;
  props: P;
  children: IElement[];
}

export interface IElementProps {
  [key: string]: any;
  textContent: string;
  key: Key;
  children: IElement[];
}

type FC<P = {}> = FunctionComponent<P>;

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): IElement | null;
  // propTypes?: WeakValidationMap<P> | undefined;
  // contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
type PropsWithChildren<P> = P & { children?: IElement };
