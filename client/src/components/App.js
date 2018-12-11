import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import PostFeed from './Feed/PostFeed';
import PostForm from './PostForm';
import Signup from './Signup';
import Post from './PostPage/Post';
import Signin from './Signin';

//import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false
        }
        // this.signinUser = this.signinUser.bind(this);
        this.userFromChild = this.userFromChild.bind(this);
    }

    userFromChild(childData) {
        this.setState({
            user: childData
        }, function() {
            console.log('This is the user')
            console.log(this.state.user)
        })
    }
    

  render() {
      console.log(this.state.user)
    return (
   
    <BrowserRouter>
      <div className="App">
        <Route path='/' exact render={ props => {
            return(
                <PostFeed { ...this.state } />
            )
        }} />
        <Route path="/signin" exact render={ props => {
            return (
                <Signin dataToParent={ this.userFromChild } />
            )
        } }/>
         <Route path="/signup" exact render={ props => {
            return (
                <Signup dataToParent={ this.userFromChild } />
            )
        } }/>
        <Route path='/post-form' exact component={ PostForm } />
        <Route path='/posts/:postId' exact component={ Post } />
      </div>
     </ BrowserRouter>
    );
  }
}

export default App;
