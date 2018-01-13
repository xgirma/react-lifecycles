# 15. logging shouldComponentUpdate

[<<< 14. componentWillReceiveProps](https://github.com/xgirma/react-lifecycles/tree/master/chapters/14)

 `shouldComponentUpdate`, which is perhaps one of our most useful methods when it comes to **optimizing** our component. 


One important thing you need to know about shouldComponentUpdate is that it must **always return a value** and give it as a question. Should my component update? And you need to return **a true or a false**. 

    By default, shouldComponentUpdate is going to return a true. 

It's going to say oh yeah, when I get changes to props or state, I'm going to update the component. 

So, we `need to remember once we start modifying shouldComponentUpdate`, there might be ways where we are saying, okay, don't update, but `then later on, if you change your application` or you change that component, you might find later that you get `bugs`, because you told shouldComponentUpdate to not update in certain scenarios, but actually now, your desired behavior has changed, so you won't see your updates take effect in that component. So you need to `be careful` with that, and make sure that you are keeping track of when you tell shouldComponentUpdate to not update that component. 


So, let's add shouldComponentUpdate to our logger, and then we're going to go into our child component and give it some directions on when it doesn't need to update. 

When we set up our logger to note every time we made a call to shouldComponentUpdate, and when we did that, we found out that our app was calling it lots and lots of times. So we want to minimize the number of times that our component gets updated, so that we can make our app more performant. 

So let's go to our app, and there are **two different places where we can put shouldComponentUpdate**. 


Before I do that, though, I'm going to add one other thing. I'm going to stop logging for our app. 

... we're going to say `shouldComponentUpdate`, and we're going to look at **nextProps**, **nextState**. **Remember these are the two arguments we have available to us within shouldComponentUpdate**. We're going to write two checks that will, in the end, tell us whether or not it should update. 

    [1.] So the first one is, we're going to say, if nextProps.parentPoll is not equal to this.props.parentPoll, then return true. 

So make sure you update if the next parentPoll is not equal to the current parentPoll, so we're making sure if we get new data, then we update. 

    [2.] And then we're also going to say, if nextState.poll is not equal to this.state.poll, then return true. 
    
 So we're giving it another scenario where we want to make sure we always update. And we're finally going to say return false. 
 
    [3.] So we're going to say if neither of those situations are true, then we're going to return false, and we're not going to update our component. 
     
```diff
class PollChild extends React.Component {
  static displayName = "PollChild";

  state = {
    poll: Math.random()
  };

  componentDidMount(){
    // this.pollData();
  };

  componentWillUnmount(){
    clearInterval(this.pollInterval);
  }

+  shouldComponentUpdate(nextProps, nextState){
+    if(nextProps.parentPoll !== this.props.parentPoll){
+      return true
+    }
+
+    if(nextState.poll !== this.state.poll){
+      return true
+    }
+
+    return false;
+  }

  pollData = () => {
    this.pollInterval = setInterval(
      () => {
        console.log('Poll');
        this.setState({
          poll: getRandomInit(1,4)
        })
      }, 1000
    )
  };

  render(){
    console.log("pollChild re-render");
    return (
      <div>
        <h4>poll: {this.state.poll}</h4>
        <h4>parentPoll: {this.props.parentPoll}</h4>
      </div>

    )
  }
}
```

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/5876481/34905838-dce67796-f815-11e7-81a3-01e9c2bca58a.gif)

 So let's inspect this further. So we can see PollChild called componentWillReceiveProps, then PollChild called shouldComponentUpdate, and then PollChild rerendered. Okay, so that probably means that different data came down, but then, if we look right here, once again, new data got passed down, so componentWillReceiveProps got called, and then that means that shouldComponentUpdate got called, but then we notice that PollChild didn't re-render. And so that means we saved our application an additional rerender. So shouldComponentUpdate probably returned false because the data getting sent down was the same and we optimized our component. If you scroll down, you can see that there's lots of occasions where, after shouldComponentUpdate happens, we actually don't re-render, and that means we've made an optimization.

[>>> 16. componentWillUpdate](https://github.com/xgirma/react-lifecycles/tree/master/chapters/16)