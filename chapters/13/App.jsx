class App extends React.Component {

  state = {
    data: 'No data yet !!!'
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
    const canvasCtx = this.refs.appCanvas.getContext('2d');
    canvasCtx.fillStyle = "blue";
    canvasCtx.arc(75,75,50,0,2 * Math.PI)
    canvasCtx.fill()
  }

  render() {
    let { showPollChild } = this.state;
    return (
      <div>
        Hello from the App
        <h4>{this.state.data}</h4>
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
        {(showPollChild) ? <PollChild /> : null }
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

  render(){ return <h4>poll: {this.state.poll}</h4>}
}

App.displayName = "~Application~";
