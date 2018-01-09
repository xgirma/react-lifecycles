function Painter (OtherComponent){
  return class extends React.Component {
    static defaultProps = { color: "red" };
    render() {
      const color = this.props.color;
      const myStyle = { color };

      return <div style={myStyle}> <OtherComponent/> </div>
    }
  }
}
