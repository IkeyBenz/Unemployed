import React, { Component } from 'react';
import './Post.css';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import axios from 'axios';
import TopNav from '../TopNav';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postId: '',
            title: '',
            content: '',
            author: '',
            comments: [],
            postType: '',
            date: '',
            isLoading: true
        }

        this.fetchPost = this.fetchPost.bind(this);
        this.getUser = this.getUser.bind(this);
    }
    componentDidMount() {
        this.fetchPost();
        this.getUser();
    }
    getUser() {
        axios('/authenticatedUser').then(res => {
            if(res.data) {
                this.setState({
                    userId: res.data._id,
                    userName: res.data.name
                });
            }   
        });
    }

    fetchPost() {
        const link = window.location.href;
        const id = link.slice(link.indexOf('/posts/') + 7);
        fetch(`/posts/${ id }`)
        .then(res => res.json())
        .then(post => this.setState({
            postId: post._id,
            title: post.title,
            content: post.content,
            author: post.author.name,
            date: post.createdAt,
            comments: post.comments,
            postType: post.postType,
            isLoading: false
        }))
        .catch(err => console.log(err.message))
    }

    
   
    render() {
        return (
            <div className="transparent-background">
            <TopNav { ...this.props} />
              <div className="Post-container">
                <div className="post-section">
                    <h2 className="post-title">{ this.state.title }</h2>
                    <p className="post-content">{ this.state.content }</p>
                    <div className="post-footer">
                        <small className="post-author">{ this.state.author }</small>
                        <small className="post-date">{ this.state.date }</small>
                        <small className="post-postType">{ this.state.postType }</small>
                    </div>
                </div>
                <div className="comment-section">
                {
                    this.props.user ? (
                        <div className="comment-form-section">
                            <CommentForm {...this.state} />
                        </div>
                    ) : null
                }
                    
                    <div className="comment-list-container">
                        <CommentList  { ...this.state } />
                    </div>
                </div>
            </div>
            </div>
            
          
        )
    }
}


export default Post;
