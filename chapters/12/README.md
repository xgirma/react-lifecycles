# 12. componentWillUnmount

[<<< 11. componentDidMount](https://github.com/xgirma/react-lifecycles/tree/master/chapters/11)

**componentWillUnmount** is a great opportunity for us to tell our component to basically **clean up after itself**. 

Maybe we have some timers that we want to clear, or maybe we have some refs that we want to make sure are emptied. By strategically using componentWillUnmount, we can make sure we're putting an end to any processes that might hurt our apps performance. 

So in this video to test this out, we're going to make a sub-component that is going to be a child of our parent component and in it it's going to be doing a **polling** so, it's a common way of practice that you might have an API that you `pull for changes in data`. And a lot of times that will use something like `setTimeout` or `setInterval` `to periodically go and get information`. 

Now if you have an `interval that is set up on your application` but you `don't put an end to it when the component unmounts`, it might keep running and **there could be a scenario where you have tons and tons and tons of duplicate intervals running all at the same time** and `it eats up all your applications memory`. So let's try using componentWillUnmount in a situation like that. 

```html
<button onClick={() => {
  this.setState((prevState) => {
    return { showPollChild: !showPollChild }
  });
}}>
  {(showPollChild) ? "Hide" : "Show"} PollChild
</button>
```

And so when we click this button, we want it to call setState and we're going to use the **expanded syntax of setState** which we'll talk about more in a later video. But essentially what we're doing is we are **passing in a argument as the first part of this this.setState** and then we're returning an object that will reflect the changes we want to be made to state.

````javascript
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
````

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/5876481/34824871-1b907b64-f685-11e7-9850-eff7ecb78e0d.gif)

<img width="790" alt="screen shot 2018-01-11 at 4 11 15 am" src="https://user-images.githubusercontent.com/5876481/34824981-8690adbc-f685-11e7-9d26-5f12cc7269d4.png">


Okay, and let's try to show our pollChild again, great, and we can see its got an initial value, and then now every one second it is console locking poll, and it is changing this value. So, now let's **try hiding our pollChild**. And you can see right away, **we get an error**, 

> and that's because our interval is still running. And not only is our interval still running, every time it runs, it's trying to make a call to set state. But it's trying to call set state on a component that isn't mounted, and that is a no-go, or as our documentation says, this is a no-op. 

So, we need to make sure that we go in, and we leverage **componentWillUnmount** `to ensure that that interval gets cleared`, `and our component stops trying to access state, and stops running this process, when it's not on the page.`

So, let's go back to our component, and we'll call it **componentWillUnmount**. And this is our opportunity to use **clearInterval**, And now, whenever this component unmounts, it's going to make a call to this.

```diff
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

+  componentWillUnmount(){
+    clearInterval(this.pollInterval);
+  }

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
```

![untitled2](https://user-images.githubusercontent.com/5876481/34826127-36c953ce-f68a-11e7-8c37-e0c389cf2853.gif)

And then, I'm also going to scroll down to the bottom, and I'm going to use my logger to log my child component as well. 
 
Alright, let's save this, and go back to the browser, and we'll click show `pollChild`, and you can see here that each time it polls, pollChild is noting that in the console, and then when we call **hidePollchild**, in our console we see that **pollChild** called `componentWillUnmount`, and we also see that we're not getting those errors like before, because pollchild's use of componentWillUnmount got rid of that interval. 

> So I hope you can see from this example how componentWillUnmount is a great opportunity to make sure that your application continues to function in a performant manner, by `cleaning up any unneeded processes`.

[>>> 13. setState](https://github.com/xgirma/react-lifecycles/tree/master/chapters/13)