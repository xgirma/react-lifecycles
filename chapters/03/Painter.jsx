function Painter (OtherComponent){
  return class extends React.Component {
    static displayName = "Painter Wrapper (HOC)";
    render() {
      return (<div style={{color: 'red'}}> <OtherComponent/> </div>)
    }
  }
}
