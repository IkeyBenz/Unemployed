import React, { Component } from 'react';
import './CommentWidget.css';


class CommentWidget extends Component {
    

    render() {
        return (
            <div className="CommentWidget">
                <button className="comment-widget-btn"><i className="fas fa-thumbs-up"></i></button>
                <button className="comment-widget-btn"><i className="fas fa-thumbs-down"></i></button>
            </div>
        )
    }
}


export default CommentWidget;