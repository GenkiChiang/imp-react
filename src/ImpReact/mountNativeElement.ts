import {IElement} from "./types";
import {createDomElement} from "./createDomElement";

export const mountNativeElement = (element: IElement, container: HTMLElement,oldElement:IElement) => {
    const newDomElement = createDomElement(element)
}