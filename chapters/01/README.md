# 01. Building a Higher-Order Component (HOC)

Higher-order components are functions that accepts a component (or multiple components) as an argument and return a new modified component.  

Example: a HOC that changes the text of a component it received. 
```javascript
const Painter = (Message) => {
  return class extends React.Component {
   render (){
     return (<div style={{color: 'red'}}> <Message/> </div>)
   }
  }
};
```

```javascript
const Hello = () => {
  return <div>{ "Hello World" }</div>;
};
```

```html
<script type="text/jsx" data-presets="es2015,react">
    Hello = Painter(Hello);
    ReactDOM.render(<Hello/>, document.getElementById('root'));
</script>
```
[>>> 02. Virtual DOM](https://github.com/xgirma/react-lifecycles/tree/master/chapters/02)