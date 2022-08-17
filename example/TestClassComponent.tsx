import ImpReact from "../src/ImpReact";
import { Component } from "../src/ImpReact/Component";
import { createRef } from "../src/ImpReact/createRef";

interface Props {
  title: string;
  content: string;
}
interface State {
  count: number;
  conditionRenderFlag: number;
  list: number[];
}
export default class TestClassComponent extends Component<
  Partial<Props>,
  State
> {
  public readonly state = {
    conditionRenderFlag: 1,
    count: 1,
    list: [1, 2, 3, 4, 5],
  };

  constructor(props) {
    super(props);
    this.handleClick=this.handleClick.bind(this)
  }
  inputRef = createRef();

  componentDidMount() {
    console.log("mounted");
    // setTimeout(() => {
    //   this.setState({
    //     ...this.state,
    //     conditionRenderFlag: 3,
    //     count: 2,
    //   });
    // }, 2000);

    console.log(this.inputRef);
  }
  handleClick() {
    this.setState({
      ...this.state,
      conditionRenderFlag: 3,
      count: 2,
      list: this.state.list[3] === 4 ? [1, 2, 3, 5, 4] : [1, 2, 3, 4, 5],
    });
      console.log(this.state.list)
  }

  render() {
    return (
      <div className="class-component-container">
        <h4>hello ,i'm {this.props.title}</h4>
        <p>我的内容：{this.props.content}</p>
        <p>count：{this.state.count}</p>
        <h4 data-test="test">自定义attribute</h4>
        <div className="multi-content">
          嵌套level 1
          <div>
            嵌套level 1.1
            <div>嵌套level 1.1.1</div>
          </div>
        </div>
        <h4>test: 条件表达式</h4>
        {this.state.conditionRenderFlag === 1 && (
          <div>conditionRenderFlag===1渲染当前内容</div>
        )}
        {this.state.conditionRenderFlag === 2 && (
          <div>conditionRenderFlag===2渲染当前内容</div>
        )}
        <span>这是一段内容</span>
        <button onClick={this.handleClick}>点击我</button>
        <h4>这个将会被删除</h4>
        无标签包裹的的内容
        <input type="text" value="input.value" ref={this.inputRef} />
        {this.state.list.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    );
  }
}
