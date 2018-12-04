import React, { Component } from 'react';
import './CommentForm.css';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.postComment = this.postComment.bind(this);
    }

    postComment(e) {
        const form = e.target;
        const data = new FormData(form);
        console.log(data);
    }

    render() {
        return (
            <div className="CommentForm">
                <h3 className="comment-form-header">Add Comment:</h3>
                <form onSubmit={ this.postComment }>
                    <textarea className="comment-input" placeholder="Jump in the conversation, add a comment!"></textarea><br />
                    <button className="comment-btn"><i className="fas fa-plus"></i>Comment</button>
                </form>
            </div>
        )
    }
}

export default CommentForm;