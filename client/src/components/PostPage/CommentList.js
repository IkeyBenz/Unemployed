import React, { Component } from 'react';
import Comment from './Comment';
import './CommentList.css';



class CommentList extends Component {
    

    
    render() {
        return (
            <div className="Comment-List">
                <div className="comments-container">
                {
                        this.props.comments.length > 0
                        ? this.props.comments.map(comment => {
                            return(
                                <Comment { ...comment} key={ comment._id} />
                            )
                        })
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default CommentList;
