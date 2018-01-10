function Painter (OtherComponent){
  return class extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        middle: "Enideg"
      }
    }

    static defaultProps = { color: "red" };

    render() {
      const color = this.props.color;
      const myStyle = { color };

      return <div style={myStyle}> <OtherComponent middle={this.state.middle}/> </div>
    }
  }
}
