import React, { Component } from 'react';
import './Comment.css';


class Comment extends Component {


    render() {
        return (
            <div className="comment-container">
                <p className="comment-content">{ this.props.content}</p>
                <div className="comment-footer">
                    <small className="comment-author">{ this.props.author.name }</small>
                    <small className="comment-date">{ this.props.createdAt }</small>
                </div>
            </div>
        )
    }
}

export default Comment;
