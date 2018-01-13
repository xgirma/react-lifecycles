# 16. componentWillupdate

[15. logging shouldComponentUpdate](https://github.com/xgirma/react-lifecycles/tree/master/chapters/15)

ComponentWillUpdate is an opportunity to make any changes to the DOM before the component is actually updated. 

**But we should note that you can't call this.setState here**. It's a little bit like calling this.setState inside of your actual render function. If you call setState during componentWillUpdate, you'll set up an infinite chain of updates that will crash your app. So we shouldn't do that.

[17. logging shouldComponentUpdate](https://github.com/xgirma/react-lifecycles/tree/master/chapters/17)
