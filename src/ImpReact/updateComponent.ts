import { OldDom, ReactElement, ReactInstance } from "./types";
import { diff } from "./diff";

export const updateComponent = (
  element: ReactElement,
  container: Node,
  oldDom: OldDom,
  oldInstance: ReactInstance
) => {

  const nextProps = element.props;
  // TODO: nextState
  const nextState = oldInstance.state;

  oldInstance.componentWillReceiveProps(nextProps);
  if (oldInstance.shouldComponentUpdate(nextProps, nextState)) {
    const prevProps = oldDom._element.props;

    oldInstance.componentWillUpdate(nextProps, nextState);
    const nextElement = oldInstance.render();
    nextElement.ReactInstance = oldInstance;
    diff(nextElement, container, oldDom);

    // TODO: prevState
    oldInstance.componentDidUpdate(prevProps, nextProps);

  }
};
