# 13. setState

[<<< 12. cleaning up intervals](https://github.com/xgirma/react-lifecycles/tree/master/chapters/12)

In this chapter, we're going to be looking at some of the **lifecycle methods that occur when our component gets updated**, and one of the chief ways that you might trigger an update is by using **setState**. 

## setState: expanded syntax
So when we're inside React, as I'm sure you're aware, you can do this.setState, and oftentimes, you'll see people do someKey, and then they'll put in newValue. So this is sort of the `concise syntax for this.setState`.

```javascript
this.setState({ key: value});
```

You might see it even shorter. You might see people say this.setState and they might go like this, right? Because we can just pass in the key-value pair with ES7, and these are functionally the same.

```javascript
this.setState({ key }); // ES7
```

But if you need to be more precise, you can use an expanded setState syntax, and it's good for us to know this, because we're going to need to be aware of it when we add it to our logger. So you could say this.setState, and then, you actually have **two different arguments** that can be passed in.

    1. So the **first is a function** that accepts **previous state** and **props**, and the first argument is a function that has previous state and props as arguments, and this function should, in the end, return a new object that represents changes to state, and you can perform any operations you need here, and you have access to the previous state.
    
    2. The **second argument** that setState has is an **anonymous function** that you can use as basically a **callback**. So `once the setState call has been carried out, and once these changes have taken effect`, then this callback will be triggered.

```javascript
this.setState(
  (prevState, props) => {
    // perform any operation you need here
    return {
      // new object that represent changes to a state
    }
  },
  () => { 
    // my callback function 
   }
)
```

Example usage: in App.js, I made use of this expanded syntax because I wanted to take the opposite of what it was, I wanted to toggle.
```javascript
<button onClick={() => {
  this.setState((prevState) => {
    return { showPollChild: !showPollChild }
  });
}}>
```

:exclamation: :exclamation: :exclamation:**It's important to remember that setting state is actually an asynchronous action**. :exclamation: :exclamation: :exclamation: So, because of the way the React API works, React's always trying to do its own sort of `performance enhancements`, and what that means is it's trying to **batch your calls** `to setStates`. So if it sees that you've got one call to setState here and one call to setState there, and it can figure out a way to `batch them into one setState call`, then it's going to do that. And :fire: :fire: :fire: **that means that if you're not using this expanded syntax, you might actually find that you have some problems, where if you're trying to access state within setState, which you shouldn't do, it's going to cause an error**. :fire: :fire: :fire: So that's why you should use the expanded syntax and **make use of previous state**. 
   
   
:hatched_chick: :hatched_chick: :hatched_chick: Remember, you can still use this more concise version, but if you want to make sure you have more control and you're avoiding any asynchronous problems, the expanded version is also good. 
    
    
    
Okay, so now let's add setState to our _logger_. This one is not so easy as just adding it to methodsToLog. We have to do a little bit more fanciness. 

```diff
function loggify(Wrapped) {

  let originals = {};

  const methodsToLog = ["componentWillMount", "componentDidMount", "componentWillUnmount"];

  methodsToLog.forEach((method) => {

    if (Wrapped.prototype[method]) {
      originals[method] = Wrapped.prototype[method]
    }

    Wrapped.prototype[method] = function (...args) {
      let original = originals[method];

      console.groupCollapsed(`${Wrapped.displayName} called ${method}`);
      console.groupEnd();

      if (original) {
        original = original.bind(this);
        return original(...args)
      }
    };

+    Wrapped.prototype.setState = function(partialState, callback){
+      console.groupCollapsed(`${Wrapped.displayName} setState`);
+      console.log('partialState ', partialState);
+      console.log('callback ', callback);
+      console.groupEnd();
+      this.updater.enqueueSetState(this, partialState, callback, 'setState');
+    }
  });

  return class extends React.Component {
    static displayName = "~Loggify~";

    render() {
      return (
        <LoggerContainer>
          <H2>
            {Wrapped.displayName} is now loggified:
          </H2>
          <Wrapped {...this.props}/>
        </LoggerContainer>
      )
    }
  }
}

const LoggerContainer = styled.default.div`
  background-color: aliceblue;
  boarder: 2px grooved aquamarine;
  border-radious: 5px;
`;

LoggerContainer.displayName = "~LoggerContainer~";

const H2 = styled.default.h2`
  color: blueviolet
`;

H2.displayName = "~H2~";
```
Okay, and so if you're curious where I got this information, I got this from looking at their React API, their source documents, and I also want to make sure that you know that **this is not something you should do in a production environment**. This is for educational purposes, so we can sort of see some of the workings of our setState. Otherwise, you don't want to be messing with the updater or enqueueSetState unless you really know what you're doing.

So let's save this, and let's see how it takes effect on our webpage.

![ezgif com-video-to-gif 2](https://user-images.githubusercontent.com/5876481/34870100-eee9b012-f73d-11e7-82a6-35076b859ad1.gif =1582x)

Alright, if we refresh the page, we can see, cool, when our app called setState, it actually logged it for us, and we got to see what the **partialState** change was going to be, and then if we do show PollChild, we can see that once again that setState appeared in our log and each of these individual ones that are being called every time our Child polls are also being called. Okay, great, so now we have setState inside of our logger, and we have a little bit more idea about the expanded syntax that we can use with setState. And in the next few videos, we're going to be talking about what happens after you set the state, what happens after you make a change to your component and how it updates.

<img width="1582" alt="screen shot 2018-01-12 at 2 14 47 am" src="https://user-images.githubusercontent.com/5876481/34870533-32383e28-f73f-11e7-84df-959ec53fedf7.png">

[>>> 14. componentWillReceiveProps](https://github.com/xgirma/react-lifecycles/tree/master/chapters/14)