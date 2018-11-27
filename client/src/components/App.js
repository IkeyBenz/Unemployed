import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import PostFeed from './PostFeed';
import PostForm from './PostForm';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
      <div className="App">
        <Route path='/' exact component={ PostFeed } />
        <Route path='/posts/new' exact component={ PostForm } />
        <Route path='/posts/:postId' exact component={ Post } />
      </div>
     </ BrowserRouter>
    );
  }
}

export default App;
