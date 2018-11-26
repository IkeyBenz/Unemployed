import React, { Component } from 'react';
import axios from 'axios';
import '../PostForm.css';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const form = e.target;
        const data = new FormData(form);
        const postTitle = data.get('title');
        const postContent = data.get('content');
        const postType = data.get('postType');

        const newPost = {
            title: postTitle,
            content: postContent,
            postType: postType
        }
        console.log(newPost);

        axios({
            method: 'post',
            url: '/posts',
            data: newPost
        })
        .then(res => {
            console.log('Succesfully created new post ...')
            console.log(res)

        })
        .catch(err => {
            console.log(err.message)
        })
    }


    render() {
        return (
            <div className="PostForm-container">
                <h2 className="create-post-header">Create New Post</h2>
                <div className="form-div">
                <form className="new-post-form" onSubmit={ this.handleSubmit }>
                    <label className="post-form-label">Post Title</label>
                    <input type="text" className="post-title-input" name="title" placeholder="Post title goes here ..."/>
                    <label className="post-form-label">Post Content</label>
                    <textarea type="text" className="post-content-input" name="content" placeholder="Post content goes here ..."></textarea>
                    <input type="hidden" name="postType" value="user" />
                    <button type="submit" className="post-submit-btn">Create Post</button>
                </form>
                </div>
            </div>
        )
    }
}


export default PostForm;
