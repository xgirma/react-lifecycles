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

## TL;DR
In our case, we're just going
to console log something.

So the way we're going to do that,
is we're going to say wrapped,
that prototype,
and then we'll access
the particular method
that is being declared
here after our for each.


We're going to say set it
equal to a new function.
So we're going to override it and
we want to be able to
access all of the arguments
that are given to the original function
here within side of it.

And now what we're doing
within this function
is we are saying what we
want this new function to be
on our prototype.


So we're going to say let original
equal originals colon method.


So inside this function,
I want to be able to
access the particular copied function.

Just as an original.


I think that'll be an easier syntax.

And then I'm going to
say console dot group,
group collapsed and
I'm going to put a template literal here.


And say wrapped dot display name
called method.

So what we're doing right here
is we're using a chrome
dev tool feature called

Console dot group collapsed and
it's just a way to make our message
look a little bit
different in the console.


It'll allow us to make kind of an object
and then what we're doing
is we're giving that message
a title that says the name
of the wrapped component
and then, also the name of the
method that's being called.


The next part we're going to do
is we're just going to
call console dot group end
so that'll end sort of this like,
unique terminal console
window that we're opening up.


And now we're going to make sure that we
both bind and call the original method
that we copied.


So we're going to say if original.


We're going to say
original equals original
original dot bind this.


So we want to preserve
this for that method.


And we're going to say original,
we're actually going to evoke it.


And we're going to pass
along all the arguments that
we inputted up here.


So this I by far the
hardest piece of job script
in the course.


And don't worry we're not going
to write any more of this.

We wrote it once
and now it'll work for a component
and we'll maybe make a few
more additions to our logger
but this was the trickiest part.


And to recap what's going to happen here,
we copied the prototype method
and then we rewrote it, we overrode it.
And then now we're making
sure to call the original.


Okay, so let's save this.

And if this works as we intended,
we should, on our page,
see that when our component mounts,
it will also console log that it mounted.

Alright, we'll save this.
And it looks like we have an error here.
Just from making a small typo.

So we'll go in and fix that.

And once again, we got
caught by prototype.

Okay, so that should solve our problem.
And great.

So now if we go to our console,
we can see here that we have
blank is now loggified
and so we see that

it started to log it but
it didn't actually have a display name.
And the reason that is
is because, when we go back to our
App dot JS file, we see that
we deleted our display name.


So let's add that.
Here in line six, we'll
add our display name.
And we'll just call this App.
And we'll go back to our browser.


And cool, now we can see
that our logger works.
So it shows up on the top on the dom
that it's been wrapped
that it's now been loggified.

And when compenetWillMount
gets called by the wrapped component,
it calls that out for us.
So now we have our first life cycle method
being logged by our logger.

And it'll be called once for
each element in the array.
And then we're going to name each of those
elements in the array "method".

That's how we will refer
to them within this loop.

And we'll make an arrow function
and this is the arrow function
that's going to be called
for each element in the array.

And now we're going to
make an "if statement"
and we're going to say,
"if, wrapped, that prototype,
bracket, method,
then originals,
bracket, method,
equals, wrapped, that prototype,
bracket, method.


Okay, so this is maybe a little confusing.
And I'm going to explain
what's happening here.
Essentially what we're saying,
we'll add some spaces to make this
a little bit easier to read.
We're saying, okay, go through all
of the methods to log that
we've put in this array.


Now look at our original
wrapped prototype,
oops we have a small typo here.


Look at all of the methods
on the prototype of wrapped
so that original wrapped component.

Look at each of the
methods on it's prototype.

And if you find one, with on of the names
that we've listed on this array,
then just copy it into
this originals object.


Alright, so that's all we're doing here
on lines 12 through 16.

The next part, we're going to replace
the function that we just
copied off the original.

We're going to replace it with a new one
that we're going to write now.

That's going to have all
of the old functionality
because remember we preserved
the old functionality

by saving it onto this originals object.
And then we're going to add a
little bit of new functionality.