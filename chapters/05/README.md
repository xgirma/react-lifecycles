# 05. initial state

[<<< 04. defaultProps](https://github.com/xgirma/react-lifecycles/tree/master/chapters/04)

History: there used to be a React method that called `initial state` and would actually set your component's initial state. depreciated.

So, let's look at the two different ways we can give our component an initial state.

Now, setting the initial state of your component is `not a static method` like `displayName` or `defaultProps`.

**[1]** That actually makes it even more simple to set it, so you can just say **state equals make an object** and then pass in your values.

```javascript
class Hello extends React.Component {
  state = {
    last: 'Nigusse'
  };

  render() {
    console.log(this.state);
    return <div>Hello Mr. {this.state.last}, {this.props.name}</div>
  }
}

Hello. defaultProps = { name: "Girma" };
```

**[2] Constructor** is a function that all classes have access to, not just react components, all classes have access to constructor and it's called when they are instantiated.

So, **when that particular instance of that class is created, that's when constructor is called**. So, that's a good place for us to **setState** if we want to use the constructor method.

Now, another thing we should know is that **if you want to access the default props** during the constructor, you need to **make sure that you're passing the props** into the constructor and **then you're calling super on those props**. 

Essentially what we're doing here is that we are taking the props which are an argument that are being passed into our created component and we're making sure that those props get passed along to the base class that component is being extended from. 

```javascript
function Painter (OtherComponent){
  return class extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        middle: "Enideg"
      }
    }

    static defaultProps = { color: "red" };

    render() {
      const color = this.props.color;
      const myStyle = { color };

      return <div style={myStyle}> <OtherComponent middle={this.state.middle}/> </div>
    }
  }
}
```

:warning: Warning: :warning: do not call `setState` in your constructor. That won't work.

One other thing that I want to point out is that in **the constructor method is the only time you should ever directly mutate state**. In the **rest** of your component, you should `use the this.setState method`, but in your constructor, this is the only time you can directly change state.

So, now we have a good idea of how we can effect the initial state of our component.

[>>> 06. constructor](https://github.com/xgirma/react-lifecycles/tree/master/chapters/06)