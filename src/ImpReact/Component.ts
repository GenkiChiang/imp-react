import { IElement } from "./types";

export  abstract class Component<P = {}, S = {}> {
  public state: S;
  constructor(public props: P) {
    // TODO:
  }
  setState(partialState: Partial<S>, callback: () => void): void {
    // TODO:
  }

  abstract render(): IElement;
}
