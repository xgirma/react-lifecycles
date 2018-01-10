# 08. componentWillMount

[<<< 07. constructor](https://github.com/xgirma/react-lifecycles/tree/master/chapters/07)

Now, I'll be honest with you, **componentWillMount is probably the least used lifecycle method** and maybe one of the `least useful`. 

    It occurs only ONCE, before your component is about to mount, and you cannot set state within it. I'll say that again.

**It's important that you do not set state within componentWillMount**. You also shouldn't call functions that might result in setting state.

Now, you're maybe thinking, wait a second, I've done that or you've seen people do that and that's actually very possible. Oftentimes, you'll see people set up subscriptions
or make calls to remote APIs here within componentWillMount, **but, technically, this is not the best place to do that**.

    The reason for this is, before your component is mounted, it actually doesn't have a state, so you can't set a state.

:warning: So, if there were a scenario where you made a call to a remote API and the response got back before your component actually did mount, then that set state would fail. :warning: 

So, once again saying, when using componentWillMount, you shouldn't set state.

:round_pushpin: :round_pushpin: :round_pushpin: Now there is one good scenario where you might use **componentWillMount and that would be if you're running a universal React application or isomorphic React application or some sort of React application that is actually mounting on the server**.

:round_pushpin: :round_pushpin: :round_pushpin: So, one of the cool things about `componentWillMount` is that, if you are creating your React component on a server and then sending it to the client, **componentWillMount is the only lifecycle method that actually gets called on the server and not on a client**.

```javascript
let originals = {};
```
`originals` is where we're going to store some methods. We're actually going to store copies of functions that are a part of the Wrapped component that's being passed in.

```javascript
 const methodsToLog = ["componentWillMount"];
```
`methodsToLog` it's going to be an array and, in it, we're going to list all of the methods that we want to log. So, eventually, we'll have all of our React lifecycle methods in here, but, for right now, we're just going to start with componentWillMount.

Okay, so, I'm going to run you through kind of what our plan is
here, before we start doing it and the idea is that we are going to look at this Wrapped object that is being passed to us.

We're going to inspect its prototype and we're going to loop
through these methods that we intend to log and then we're actually going to modify each of those individual methods, the ones that are on the prototype, and we're going to change them to add a console.log to them, but then we're also going to make sure that we call the original one, so that the component still functions.

```diff
function loggify (Wrapped){

+  let originals = {};

+  const methodsToLog = ["componentWillMount"];

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

## disclaimer
I also want to raise a disclaimer here. If you go through the React documentation, it'll actually tell you that **you should not modify a component's lifecycles methods**. And that is true.

**If you are making a production component**, you're not going to want to modify the lifecycle methods. You could damage your components and, basically, make them unusable in a production environment.

I, however, know that what we're doing right now will work for our cases, for these educational cases, and it'll let us be able to see what those methods are doing.

So, remember this is something we can do to test out a component and it's good for helping us understand the way a component works, but you should not be modifying the methods of a component in a production environment. And with that disclaimer, we can get started on the next video.

[>>> 09. modifying the prototype](https://github.com/xgirma/react-lifecycles/tree/master/chapters/09)
