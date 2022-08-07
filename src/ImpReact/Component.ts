import { IElement, IElementProps } from "./types";
export interface Component<P = {}, S = {}> {}

export abstract class Component<P = {}, S = {}> {
  public state: S;
  protected constructor(public props: P) {
    // TODO:
  }
  setState(partialState: Partial<S>, callback: () => void): void {
    // TODO:
  }

  componentDidMount() {}
  abstract render(): IElement;
}
