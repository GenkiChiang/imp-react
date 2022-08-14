import { ReactElement, ReactInstance } from "./types";

export abstract class ComponentLifecycle<P = any, S = any> {
  abstract readonly state: S;
  protected constructor(public readonly props: P) {}

  componentWillMount(): void {}
  componentDidMount(): void {}
  componentWillUnmount(): void {}

  componentWillReceiveProps(nextProps: Readonly<P>): void {}
  shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<S>
  ): boolean {
    return nextProps !== this.props || nextState !== this.state;
  }
  componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>): void {}

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>): void {}
}

export abstract class Component<P = any, S = any> extends ComponentLifecycle<
  P,
  S
> {
  static defaultProps;

  readonly state: S;
  displayName?: string;
  // TODO:
  refs: { [key: string]: ReactInstance } = {};
  _dom: HTMLElement;

  protected constructor(public readonly props: Readonly<P>) {
    // TODO:
    super(props);
  }
  // public defaultProps;

  setState(partialState: Partial<S>, callback: () => any): void {
    // TODO:
  }

  setDom(dom: HTMLElement) {
    this._dom = dom;
  }

  isReactComponent = true;
  abstract render(): ReactElement;
}
Component.prototype.isReactComponent = true;

// TODO: pureComponent
