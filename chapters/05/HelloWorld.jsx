class Hello extends React.Component {
  state = {
    last: 'Nigusse'
  };

  render() {
    console.log(this.state);
    return <div>Hello Mr. {this.state.last}, {this.props.name} {this.props.middle}</div>
  }
}

Hello. defaultProps = { name: "Girma" };
