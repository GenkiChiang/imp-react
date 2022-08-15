import { render } from "./render";
import { Dom, ReactElement, ReactInstance } from "./types";
import { voidFunction } from "./utils";

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
    // TODO: deep compare
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

  state: S;
  displayName?: string;
  // TODO:
  refs: { [key: string]: ReactInstance } = {};
  _dom: Dom;

  protected constructor(public readonly props: Readonly<P>) {
    super(props);
  }
  // public defaultProps;

  setState(partialState: Partial<S>, callback: () => any = voidFunction): void {
    this.state = Object.assign({}, this.state, partialState);
    // update
    this.update();

    callback();
  }
  private update() {
    const nextElement = this.render();
    const oldDom = this.getDom();
    const container = oldDom.parentNode;

    render(nextElement, container, oldDom);
  }

  setDom(dom: Dom) {
    this._dom = dom;
  }
  getDom() {
    return this._dom;
  }

  isReactComponent = true;
  abstract render(): ReactElement;
}
Component.prototype.isReactComponent = true;

export abstract class PureComponent extends Component {
  shouldComponentUpdate(
    nextProps: Readonly<any>,
    nextState: Readonly<any>
  ): boolean {
    // TODO: shallow compare
    return super.shouldComponentUpdate(nextProps, nextState);
  }
}
