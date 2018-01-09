class Hello extends React.Component {
  render() {
    console.log(this.props);
    return <div>Hello {this.props.name}</div>
  }
}

Hello. defaultProps = { name: "Girma" };
