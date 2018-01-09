# Virtual DOM

[<<< 01. Higher Order Component](https://github.com/xgirma/react-lifecycles/tree/master/chapters/01)

## Lifecycle Overview
When we think of the React lifecycle methods, we can break them into three distinct categories. We have our methods that happen during the **creating**, **mounting**, and `updating` phases.

<img width="1670" alt="lifecycle" src="https://user-images.githubusercontent.com/5876481/34714735-36da58d8-f4df-11e7-98a5-350fd44bb453.png">

Some of these methods called in multiple cycles. So, render for instance, happens in both `mounting` and `updating`. 

# How does React update the DOM?
Virtual DOM it is a JavaScript object in memory that represents what the website looks like. So a lot of the speed bonuses that you get for using React is because it is **diffing the Virtual DOM versus the real DOM** and try **to minimize the number of changes it makes to the Real DOM**. 

React is performant by itself, but by leveraging `lifecycle methods` we can improve that out of the box speed. 

<img width="1639" alt="screen shot 2018-01-09 at 2 04 50 am" src="https://user-images.githubusercontent.com/5876481/34715434-8c1c1550-f4e1-11e7-92e8-032de392488b.png">

A good understanding of the lifecycle methods will allow us to ensure our components have the `right functionality` with the most `efficient amount of code` and help us `avoid quirky, asynchronous problems` involving state changes.

[>>> 03. displayName](https://github.com/xgirma/react-lifecycles/tree/master/chapters/03)

## Footnote

![1_sn-ftowp0_vvrbeuafecma](https://user-images.githubusercontent.com/5876481/34715835-d1187ab2-f4e2-11e7-849b-44a8b927989e.png)

[Source](https://hackernoon.com/reactjs-component-lifecycle-methods-a-deep-dive-38275d9d13c0)