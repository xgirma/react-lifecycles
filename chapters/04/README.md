# 04. defaultProps

[<<< 03. displayName](https://github.com/xgirma/react-lifecycles/tree/master/chapters/03)

Default props is another **static method** that's available to any React component, and it's also a method that, once again, might not necessarily be known as a member of the lifecycle methods, but it does happen each time a React component is created.

The purpose of default props is to ensure that **when a component begins its existence**, i**t has certain props available to it right away**. So default props will be used instead of pass down props, `if the pass down props are undefined`.

```html
<body>
  <div id="root"></div>
  <script type="text/jsx" data-presets="es2015,react">
    Hello = Painter(Hello);

    ReactDOM.render(<Hello/>, document.getElementById('root'));

  </script>
</body>
```

```javascript
class Hello extends React.Component {
  render() {
    console.log(this.props);
    return <div>Hello {this.props.name}</div>
  }
}

Hello. defaultProps = { name: "Girma" };
```

```javascript
function Painter (OtherComponent){
  return class extends React.Component {
    static defaultProps = { color: "red" };
    render() {
      const color = this.props.color;
      const myStyle = { color };

      return <div style={myStyle}> <OtherComponent/> </div>
    }
  }
}
```

Once again, just like with display name, we can set it in two different ways. 

<img width="1199" alt="screen shot 2018-01-09 at 3 15 02 am" src="https://user-images.githubusercontent.com/5876481/34718456-8ce94a3e-f4eb-11e7-8cb8-e19cebcdbf67.png">

One thing that I want to call out again is that the `defaultProps` aren't necessarily a part of the lifecycle methods. That means they're not going to get called over and over again. They're actually just going to be called once, when your code is initially run. That's an important thing to remember.

<img width="1178" alt="screen shot 2018-01-09 at 3 15 42 am" src="https://user-images.githubusercontent.com/5876481/34718458-8cfcb6c8-f4eb-11e7-99a4-fff90d284fff.png">

[>>> 04. Initial state](https://github.com/xgirma/react-lifecycles/tree/master/chapters/04)
