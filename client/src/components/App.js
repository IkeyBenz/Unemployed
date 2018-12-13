import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import PostFeed from './Feed/PostFeed';
import PostForm from './PostForm';
import Signup from './Signup';
import Post from './PostPage/Post';
import Signin from './Signin';
import axios from 'axios';

//import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: false,
            ...this.props
        }
        // this.signinUser = this.signinUser.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }
    getUser() {
        axios('/api/auth/currentUser').then(res => {
            if (res.data) {
                this.setState({
                    user: true
                });
            }
        });
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
                <Signin />
            )
        } }/>
         <Route path="/signup" exact render={ props => {
            return (
                <Signup />
            )
        } }/>

        <Route path='/post-form' exact render={ () => {
            return (
                <PostForm { ...this.state } />
            )
        }} />
        <Route path='/posts/:postId' exact render={ () => {
            return(
                <Post { ...this.state } />
            )
        }} />
      </div>
     </ BrowserRouter>
    );
  }
}

export default App;
