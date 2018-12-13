import React, { Component } from 'react';
import './Comment.css';
import CommentWidget from './CommentWidget';


class Comment extends Component {


    render() {
        return (
        
            <div className="comment-container">
                <div className="comment-row small-text">
                    <h5>{ this.props.author.name }</h5>
                    <p>2 days ago</p>
                </div>
                <div className="comment-row big-text">
                    <p className="comment-content">{this.props.content}</p>
                </div>
                <div className="comment-row med-text">
                    <CommentWidget className="thumbs-widget" />
                </div>
            </div>

    
        )
    }
}

export default Comment;
