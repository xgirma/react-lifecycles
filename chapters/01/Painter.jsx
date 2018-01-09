const Painter = (Message) => {
  return class extends React.Component {
   render (){
     return (<div style={{color: 'red'}}> <Message/> </div>)
   }
  }
};
