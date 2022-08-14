import { ReactElement } from "./types";
import { diff } from "./diff";

/**
 *
 * @param element JSX 被 jsxFactory() 或者 babel-preset-react() 解析后生成的类型
 * @param container
 * @param oldDom
 */
export const render = (
  element: ReactElement,
  container: HTMLElement,
  oldDom: ChildNode = container.firstChild
) => {
  // 根据类型创建真实Dom，渲染到container下
  diff(element, container, oldDom);
};
