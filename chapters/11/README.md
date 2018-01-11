# 11. componentDidMount

[<<< 10. render](https://github.com/xgirma/react-lifecycles/tree/master/chapters/10)

When we call componentDidMount, it means that our HTML elements have now been officially rendered to the page, and we may access them.
 
This means that we can 
 
    1. use refs for particular elements, and 
    
    2. we can also make calls to setState. 
    
    3. external API call
 
 
This is also a **great place for us to make an external call to an API if the result of that call will end with a state change**. `ComponentDidMount` is a great chance to make a call to a remote API, so I said `componentWillMount` and render, maybe not the best cases, but `componentDidMount`, this is a good opportunity to do that. 

So, let's make a just kind of dummy function that will pretend to fetch data from a remote API. It's just going to start by console logging, "We're going to fetch data," and then we're just going to use a timeout, with setTimeout, to simulate an asynchronous request. 


So, we're going to say console.log, data retrieved, and then we're going to call setState here. So, we're imagining we made a call to our remote API, and we got back some data, and we'll just put in a random number using Math.random. And we'll have this happen a second and a half, so 1500 milliseconds after it gets called, so that's how long it'll take for our request to complete. 

And we're going to try putting this in `componentDidMount`. Okay, so what we are looking into here is is it okay to setState in response to something that happens in `componentDidMount`? All right, let's give it a shot. 

```javascript
class App extends React.Component {

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
  }

  render() {
    return (<div>Hello from the App</div>)
  }
}

App.displayName = "~Application~";
``` 

<img width="1187" alt="componentDidMount" src="https://user-images.githubusercontent.com/5876481/34809111-d03428a6-f647-11e7-8fd6-94a86ce664c1.png">

So, let's try logging this. Before we begin to log this, I'm just going to add one element to our page so that we can just see when we get that data. We'll just put it there on the page. All right, now we're going to go to our loggify.js file, and we're going to add componentDidMount to our array that contains the methods we intend to log. We'll save our file, and now let's open things up again and see what happens. And `it looks like we're getting an error,` and **that's because it can't read the property data of null**.

```diff
class App extends React.Component {

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
  }

  render() {
    return (
      <div>
        Hello from the App
+        <h4>{this.state.data}</h4>
      </div>
    )
  }
}

App.displayName = "~Application~";
```


<img width="1193" alt="screen shot 2018-01-10 at 8 54 10 pm" src="https://user-images.githubusercontent.com/5876481/34809208-769120fa-f648-11e7-8db9-5b0250bd62f1.png">


Ah, this is a good thing to remember. If we're going to be accessing an element of state in our render function, **we need to make sure that we have a default**. So right now, that key data doesn't exist on our state object, so we need to make sure we set an initial state, like we did in a previous video. Remember, we could do that **inside the constructor**, but I like to use the syntax, where we just say **state =.** 

```diff
class App extends React.Component {

+  state = {
+    data: 'No data yet !!!'
+  };

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
  }

  render() {
    return (
      <div>
        Hello from the App
        <h4>{this.state.data}</h4>
      </div>
    )
  }
}

App.displayName = "~Application~";

```

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/5876481/34809398-9e0b6112-f649-11e7-8b86-27634b7cbb1f.gif)


So now let's go back to our page and see how things work. We'll refresh it, and you can see that there's no data yet, and then it changes to our new Math.random data once it arrived. And, we also see in our console that it says app called componentDidMount, so our logger is successfully notifying us every time componentDidMount gets called, and this fits with what I think. 

It should, first, it will say `WillMount`, and then it does `componentDidMount`. 

## refs

Another good application of **componentDidMount is to access refs**, or **this.refs**. If you're not familiar with refs, know that **they're a specific reference to an HTML element**, and they could be **accessed with this.refs**. You might `use them in the case of a stateless input, or a stateless text area`, you might also use them to get at a canvas. So, I'll show you how you can use `this.refs` in `componentDidMount` to access a canvas element. 

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
+    const canvasCtx = this.refs.appCanvas.getContext('2d');
+    canvasCtx.fillStyle = "blue";
+    canvasCtx.arc(75,75,50,0,2 * Math.PI)
+    canvasCtx.fill()
  }

  render() {
    return (
      <div>
        Hello from the App
        <h4>{this.state.data}</h4>
+        <canvas
+          ref={"appCanvas"}
+          hight={200}
+          width={200}
+        />
      </div>
    )
  }
}

App.displayName = "~Application~";
```
<img width="1124" alt="screen shot 2018-01-11 at 3 15 57 am" src="https://user-images.githubusercontent.com/5876481/34823042-dcd705e8-f67d-11e7-8e70-65311137cc52.png">

This is more just and demonstrate that componentDidMount is a good place to access refs.

[>>> 12. cleaning up intervals](https://github.com/xgirma/react-lifecycles/tree/master/chapters/12)