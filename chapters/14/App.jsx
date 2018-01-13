class App extends React.Component {

  state = {
    data: 'No data yet !!!',
    parentPoll: "No parent poll data yet",
  };

  fetchData = () => {
    console.log("Going to fetch data!");

    setTimeout(
      () => {
        console.log("Data retrieved");
        this.setState({
          data: Math.random()
        })
      }, 1500
    )
  };

  componentDidMount(){
    this.fetchData();
    this.createParentPoll();
    const canvasCtx = this.refs.appCanvas.getContext('2d');
    canvasCtx.fillStyle = "blue";
    canvasCtx.arc(75,75,50,0,2 * Math.PI)
    canvasCtx.fill()
  }

  createParentPoll = () => {
    this.pollInterval = setInterval(
      () => {
        this.setState({parentPoll: getRandomInit(1,5)})
      }, 1000
    )
  };

  render() {
    let { showPollChild, parentPoll, data } = this.state;
    return (
      <div>
        Hello from the App
        <h4>{data}</h4>
        <h4>{parentPoll}</h4>
        <canvas
          ref={"appCanvas"}
          hight={100}
          width={200}
        />

        <button onClick={() => {
          this.setState((prevState) => {
            return { showPollChild: !showPollChild }
          });
          {console.log(this.state.data)}
        }}>
          {(showPollChild) ? "Hide" : "Show"} PollChild
        </button>
        {(showPollChild) ? (
          <PollChild
            parentPoll={parentPoll}
          />
        ) : null }
      </div>
    )
  }
}

class PollChild extends React.Component {
  static displayName = "PollChild";

  state = {
    poll: Math.random()
  };

  componentDidMount(){
    this.pollData();
  };

  componentWillUnmount(){
    clearInterval(this.pollInterval);
  }

  pollData = () => {
    this.pollInterval = setInterval(
      () => {
        console.log('Poll');
        this.setState({
          poll: Math.random()
        })
      }, 1000
    )
  };

  render(){
    return (
      <div>
        <h4>poll: {this.state.poll}</h4>
        <h4>parentPoll{this.props.parentPoll}</h4>
      </div>

    )
  }
}

function getRandomInit(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

App.displayName = "~Application~";
