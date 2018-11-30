import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import PostFeed from './Feed/PostFeed';
import PostForm from './PostForm';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            user: ''
        }

        this.authUser = this.authUser.bind(this);
    }

    authUser() {
        axios.get('/auth/google')
        .then(res => {
            console.log('Whats up')
            if(res.status === 401) {
                console.log('error on login')
            } else {
                console.log('user logged in')
                return this.setState({
                    loggedIn: true,
                    user: res.data.user
                })
            }

        })
        .catch(err => console.log(err))
    }



  render() {
    return (
    <BrowserRouter>
      <div className="App">
        <Route path='/' exact  render={ props => {
            return (
                <PostFeed authUser={ this.authUser } />
            )
        }} />
        <Route path='/posts/new' exact component={ PostForm } />
      </div>
     </ BrowserRouter>
    );
  }
}

export default App;
