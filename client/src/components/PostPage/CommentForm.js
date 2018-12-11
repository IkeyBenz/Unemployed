import React, { Component } from 'react';
import './CommentForm.css';
import axios from 'axios';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.postComment = this.postComment.bind(this);
    }

    postComment(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        console.log(data);
        const commentContent = data.get('content');
        const newComment = {
            content: commentContent,
            author: this.props.userId,
            postId: this.props.postId,



        }
        console.log(newComment);
          
        axios({
            method: 'post',
            url: `/posts/${ this.props.postId }/comments`,
            data: newComment
        })  
        .then(res => {
            console.log(res)
            this.props.comments.unshift(res)

            window.location.replace(`/posts/${this.props.postId}`);
            console.log('something worked')
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="CommentForm">
                <h3 className="comment-form-header">Add Comment:</h3>
                <form onSubmit={ this.postComment }>
                    <textarea className="comment-input" name="content" placeholder="Jump in the conversation, add a comment!"></textarea><br />
                    <button className="comment-btn" type="submit"><i className="fas fa-plus"></i>Comment</button>
                </form>
            </div>
        )
    }
}

export default CommentForm;