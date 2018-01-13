# 14. componentWillReceiveProps

[<<< 13. setState](https://github.com/xgirma/react-lifecycles/tree/master/chapters/13)

    componentWillReceiveProps; is first of our update live cycle methods. 


    ComponentWillReceiveProps is called when your component will receive props. 


Now, I also want to point out that while `componentWillRecieveProps` is primarily called when your component will receive props, **there are also occasions where it might get called because of a state change on a parent componen**t. So, if you have something that's happening in `componentWillReceiveProps`, and you're getting problems where maybe it's getting called one too many times, that's something you should be aware of. So, whatever is happening in `componentWillReceiveProps`, you should make sure that it's basically a function of the props that are being passed to that component. And if an extra call to it gets made, it won't throw a problem in your application. 


Okay, so one of the **primary applications of componentWillReceiveProps** is to handle some change to state because you have a **state variable that is dependent on the props** that are being passed to it. 

**Example:** So you can imagine you've decided to keep **a dollar value in state**, and that dollar value is **based on two different variables that are being passed to props**, and so **when those get passed,** y**ou calculate that new state** variable. Okay, that might be an instance where you would use `componentWillReceiveProps`. 

[>>> 15. logging shouldComponentUpdate](https://github.com/xgirma/react-lifecycles/tree/master/chapters/15)
