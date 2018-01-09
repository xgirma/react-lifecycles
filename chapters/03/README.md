# 03. displayName 

[<<< 02. Lifecycle Overview](https://github.com/xgirma/react-lifecycles/tree/master/chapters/02)

`displayName` isn't technically a part of the React lifecycle method, but it is a part of the React component API. 

It's a **static method** that's going to give us some developer functionality, and it's especially useful when we'll be `debugging` using a `perf library` that I'll show later, and it's also useful when we're using the `React dev console tools`. 

The displayName string is used in debugging messages. Usually, you don’t need to set it explicitly because it’s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component. [Source](https://reactjs.org/docs/react-component.html#displayname).

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
    return <div>Hello Again</div>
  }
}

Hello.displayName = "Hello World component";
```

```javascript
function Painter (OtherComponent){
  return class extends React.Component {
    static displayName = "Painter Wrapper (HOC)";
    render() {
      return (<div style={{color: 'red'}}> <OtherComponent/> </div>)
    }
  }
}
```

There are two ways we can add `displayName` as shown above, inside and outside of the component or class.  



[>>> 04. defaultProps](https://github.com/xgirma/react-lifecycles/tree/master/chapters/04)