# 17. componentDidUpdate

[16. componentWillupdate](https://github.com/xgirma/react-lifecycles/tree/master/chapters/16)

**componentDidUpdate**, unlike componentWillUpdate, is going to be looking at **prevProps** and **prevState** for arguments and so it's going to be `occurring after your component updated`. 

Now componentDidUpdate is maybe a bit more useful than component will update in that it allows you to access items that have just been rendered. componentDidUpdate might be a good opportunity to scroll to a specific space on the page or to update a ref because now everything has been rendered and all of the objects on your dom are now available. 

[18. Using react-addons-per](https://github.com/xgirma/react-lifecycles/tree/master/chapters/18)