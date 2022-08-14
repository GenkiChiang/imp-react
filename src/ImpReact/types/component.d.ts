import { ReactElement } from "./index";

export interface ComponentLifecycle<P = any, S = any> {
  new (props: P): ComponentLifecycle<P, S>;

  componentWillMount(): void;
  componentDidMount(): void;
  componentWillUnmount(): void;

  componentWillReceiveProps(nextProps: Readonly<P>): void;
  shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<S>
  ): boolean;
  componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>): void;
  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>): void;
}

export interface ClassComponent<P = any, S = any>
  extends ComponentLifecycle<P, S> {
  new (props: P): ClassComponent<P, S>;

  readonly state: S;
  defaultProps?: Partial<P>;
  displayName?: string;
  isReactComponent: boolean;
  render(): ReactElement;
  setDom(dom: HTMLElement): void;
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
