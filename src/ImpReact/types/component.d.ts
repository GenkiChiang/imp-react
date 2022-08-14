import { ReactElement } from "./index";
import { Component } from "../Component";

export interface ClassComponent<P = any, S = any> extends Component<P, S> {
  new (props: P): ClassComponent<P, S>;
  defaultProps: Partial<P>;
}

export interface FunctionComponent<P = any> {
  (props: P, context?): ReactElement<P> | null;

  defaultProps?: Partial<P>; // TODO:
  displayName?: string; // TODO:
}

export interface ComponentElement<P = any>
  extends ReactElement<P, ComponentType> {}

type ComponentType<P = any> = ClassComponent<P> | FunctionComponent<P>;

type FC<P = {}> = FunctionComponent<P>;
