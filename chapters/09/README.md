# 09.  modifying the prototype

[<<< 08. componentWillMount](https://github.com/xgirma/react-lifecycles/tree/master/chapters/08)

So as I
mentioned in the last video,
our game plan here is that we're going to
create this object that
we've called "originals"
and it's going to hold copies of
the wrapped components original methods.


And then we also have this very
bold initial, it's an array.
And in it, it's going to contain the names
of all them methods we're
going to want to loop through.


So we're going to look at
all of the methods of
our wrapped component
but we only actually want to modify
the ones that we have here in this array.


Alright so let's start.
We're going to call methods to log
that for each, so for each is
a method that's available on an array.

```diff
function loggify(Wrapped) {

  let originals = {};

  const methodsToLog = ["componentWillMount"];

+  methodsToLog.forEach((method) => {
+
+    if (Wrapped.prototype[method]) {
+      originals[method] = Wrapped.prototype[method]
+    }
+
+    Wrapped.prototype[method] = function (...args) {
+      let original = originals[method];
+
+      console.groupCollapsed(`${Wrapped.displayName} called ${method}`);
+      console.groupEnd();
+
+      if (original) {
+        original = original.bind(this);
+        return original(...args)
+      }
+    };
+  });

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

<img width="1188" alt="screen shot 2018-01-10 at 2 48 35 am" src="https://user-images.githubusercontent.com/5876481/34768810-d1d8f6f6-f5b0-11e7-80b6-5436159604af.png">

[>>> 10. render](https://github.com/xgirma/react-lifecycles/tree/master/chapters/10)
