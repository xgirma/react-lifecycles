# 10. render
[<<< 09. modifying the prototype](https://github.com/xgirma/react-lifecycles/tree/master/chapters/09)

So unlike componentWillMount, which is perhaps the least used of the React lifecycle methods, **render is definitely the most used**. 

It's probably the most iconic. When you think of a React component, you think of that render a statement that then has the **JSX/HTML elements in it that represent what you're actually going to put onto the page**. 

One thing that's important to know about render is that **you cannot make any untriggered calls to setState in your render function**. 
    
    1. no setState() inside render

So let's go here to app.js, and I decided that right here, I'm going to delete what's on line nine. If I decided that I wanted to say, okay, when you render, **call this.setState** and make newThing equal to some string. If I wanted to do that, `that is not a good idea`. It's not just not a good idea. You can't do it. It'll **crash your app, because it's going to create an infinite chain of setting state and re-rendering, setting state and re-rendering**. **Because a re-render will occur whenever there's a change to state or there's a change to props**. So don't do something like this. 

    2. you must return something from render
    
Another thing to understand is that a **render statement expects for you to return something** at the end of it. So that maybe seems obvious, but if you're going to have a render statement that you've decided for some reason isn't going to make a component. **It's not going to put anything on the page. Then you should have it returns a null value**, or **you need to have it return an empty element**. But either way, you need to make sure that your render is returning something. 

    3. render is a function, so you can do few things before you return

Another important piece of information that is used with render is that even though you can't call setState within this render body, **I think sometimes we forget that render itself is a function** that does have an opportunity for you to do more operations here before you end up returning something. So a lot of times what you'll see is people will **disassemble some object that is in the state**. So a lot of times people will use this as an `opportunity to make their code a little bit more readable`, and they'll disassemble some object that's in the state. But you might also be able to do some calculations here or do something that you want to happen that occurs each time your component renders. That would be completely fine to do that here as long as you don't set state. And so now I know that you are excited to add render to our logger, but actually, there are some difficulties with that, because we don't want to modify the render function on the prototype. 


I know that I said in the previous video it's actually not a great idea to render any of the methods on a prototype in a production environment, but we're choosing to do that for our educational and logging reasons. But actually, `you can't even do it with the render`. `You'll break your component`. **So unfortunately we are going to leave the render out of our logger**, `but the nice thing about render is it is one thing that actually shows you when it happens`, so you'll be able to see it on the page. 

All right, so that concludes our discussion about render. We will talk about render a bit more when we get into our update lifecycle methods, because render actually is unique in that, it occurs both in the mounting lifecycle methods and in the updating lifecycle methods. So learn to love it, and we will talk about render again in a little bit.

[>>> 11. componentDidMount](https://github.com/xgirma/react-lifecycles/tree/master/chapters/11)