# 06. constructor

[<<< 05. initial state](https://github.com/xgirma/react-lifecycles/tree/master/chapters/05)

I touched a bit on the constructor function in the video where we spoke about setting on initial state.

That's definitely a great use case for the constructor function, but another common way you're going to see developers use this is by calling the **.bind this method on any functions you might be using inside your component**.

Now, .bind this is not a method that's exclusive to React, in fact, actually, it's just a method that's available to all JavaScript arrays. But you often see it because `React uses the class syntax, and people want to change the context of` **this**.

```javascript
class Hello extends React.Component {
  state = {
    last: 'Nigusse'
  };

  oldSchoolFunction(){
    console.log('old school function');
    console.log('props', this.props); // this = null
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
```
Click [New School] first and [Old School] next. Give the below error.
<img width="1202" alt="screen shot 2018-01-09 at 11 19 12 pm" src="https://user-images.githubusercontent.com/5876481/34760209-9da16d54-f593-11e7-989e-f30ac3e2ddc0.png">


So the reason it's giving us an error is **because it cannot read property props of null**.
So that means that **this** within `oldSchoolFunction` function is **null**.

What's happening with test use arrow function, `newSchoolFunction`? **this is not null**. `this.props` = `{middle: "Enideg", name: "Girma"}`. 

Why that's happening? **An arrow function (newSchoolFunction) preserves the context of its parent (of the wrapping) function**. Whereas `oldSchoolFunction` function does not. `this` within `oldSchoolFunction` function is different from what it is outside of.

So one solution for us to fix this problem is to make our functions into arrow functions. Another, which you'll often see, is to use the **bind** method in the constructor. 

If I want one function to be able to access the right context of this when it's called within render, I can, in the constructor, `this.oldSchoolFunction = this.oldSchoolFunction.bind(this);`.

<img width="1217" alt="screen shot 2018-01-09 at 11 36 30 pm" src="https://user-images.githubusercontent.com/5876481/34760778-f74011d8-f595-11e7-8a35-146f7f7d099a.png">

What we're doing here is we're using the bind method, which is available to all functions, to pass in a new context that will be the context of this for `oldSchoolFunction` function, all right.

## summary
The constructor is a great opportunity to set your components' initial state, but it's also a great opportunity to bind this to any functions that might not be using arrow functions.

[>>> 07. creating your logger](https://github.com/xgirma/react-lifecycles/tree/master/chapters/07)