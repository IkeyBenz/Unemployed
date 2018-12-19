import React, { Component } from 'react';
import axios from 'axios';
import '../PostForm.css';
import TopNav from './TopNav';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    ///Takes the data submitted with the form and makes a POST request to the server
    handleSubmit(e) {
        e.preventDefault();
        console.log('Button clicked!')
        const form = e.target;
        const data = new FormData(form);
        const postTitle = data.get('title');
        const postContent = data.get('content');
        const postType = data.get('postType');
        console.log(this.props.curUser)
        const newPost = {
            title: postTitle,
            content: postContent,
            postType: postType,
            author: this.props.curUser
        }

        axios({
            method: 'post',
            url: '/api/posts',
            data: newPost
        })
        .then(res => {
            window.location.replace('/');
        })
        .catch(err => {
            console.log(err.message)
        })
       
    }


    render() {
        return (
            <div className="outer-post">
            <TopNav { ...this.props } />
            <div className="PostForm-container">
                <h2 className="create-post-header">Have Something To Say?</h2>
                <div className="form-div">
                <form className="new-post-form" onSubmit={ this.handleSubmit }>
                    <label className="post-form-label">Post Title:</label>
                    <input type="text" className="post-title-input" name="title" placeholder="Post title goes here ..."/>
                    <label className="post-form-label">Post Content:</label>
                    <textarea type="text" className="post-content-input" name="content" placeholder="Post content goes here ..."></textarea>
                    <input type="hidden" name="postType" value="user" />
                    <div className="form-btn-container">
                        <button type="submit" className="post-submit-btn">Add</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
            
        )
    }
}


export default PostForm;
