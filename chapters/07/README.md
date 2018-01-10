# 06. creating your logger

[<<< 06. constructor](https://github.com/xgirma/react-lifecycles/tree/master/chapters/05)

Laying out the logger framework. 

```diff
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Higher Order Component</title>

  <title>Title</title>
  <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
+  <script src="https://cdnjs.cloudflare.com/ajax/libs/styled-components/2.4.0/styled-components.js"></script>

  <script src="App.jsx" type="text/jsx" data-presets="es2015,react"></script>
  <script src="Loggify.jsx" type="text/jsx" data-presets="es2015,react"></script>

</head>

<body>
  <div id="root"></div>
  <script type="text/jsx" data-presets="es2015,react">
+    App = loggify(App);

    ReactDOM.render(<App/>, document.getElementById('root'));

  </script>
</body>

</html>
``` 

```html
class App extends React.Component {
  render() {
    return (<div>Hello from the App</div>)
  }
}

App. displayName = "~Application~";
```

```javascript
function loggify (Wrapped){
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
<img width="1201" alt="screen shot 2018-01-10 at 1 13 25 am" src="https://user-images.githubusercontent.com/5876481/34764487-89e7e792-f5a3-11e7-9eef-61fcad16b77b.png">

    Loggify => LoggerContainer => H2/Application  

[>>> 08. componentWillMount](https://github.com/xgirma/react-lifecycles/tree/master/chapters/08)