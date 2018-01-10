class Hello extends React.Component {
  constructor(props){
    super(props);
    this.oldSchoolFunction = this.oldSchoolFunction.bind(this);
  }
  state = {
    last: 'Nigusse'
  };

  oldSchoolFunction(){
    console.log('old school function');
    console.log('props', this.props);
  };

  newSchoolFunction = () => {
    console.log('new school function');
    console.log('props', this.props);
  };

  render() {
    return <div>
      Hello Mr. {this.state.last}, {this.props.name} {this.props.middle}
      <button onClick={this.oldSchoolFunction}>Old School</button>
      <button onClick={this.newSchoolFunction}>New School</button>
      </div>
  }
}

Hello. defaultProps = { name: "Girma" };
