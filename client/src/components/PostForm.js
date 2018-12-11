import React, { Component } from 'react';
import axios from 'axios';
import '../PostForm.css';

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios('/authenticatedUser').then(res => {
            this.setState({
                userId: res.data._id,
                userName: res.data.name
            }, function () {
                console.log(this.state);
            });
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const postTitle = data.get('title');
        const postContent = data.get('content');
        const postType = data.get('postType');
        this.setState({
            redirect: true
        })
        const newPost = {
            title: postTitle,
            content: postContent,
            postType: postType,
            author: this.state.userId
        }
        console.log(newPost);

        axios({
            method: 'post',
            url: '/posts',
            data: newPost
        })
        .then(res => {
            // window.location.reload();
        })
        .catch(err => {
            console.log(err.message)
        })
    }


    render() {
        if (this.state.redirect === true) {
            window.location.replace('/');
        }
        return (
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
                        <button type="submit" className="post-submit-btn">Create Post</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}


export default PostForm;
