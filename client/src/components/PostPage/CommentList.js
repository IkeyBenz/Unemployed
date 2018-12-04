import React, { Component } from 'react';
import Comment from './Comment';
import './CommentList.css';



class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }

        this.fetchComments = this.fetchComments.bind(this);
    }

    componentDidMount() {
        this.fetchComments()
    }

    fetchComments() {
        const { match: { params } } = this.props;
        fetch(`/posts/${params.postId}/comments`)
        .then(res => res.json())
        .then(comments => this.setState({
            comments: comments
        }, 
        function() {
            console.log(this.state.comments)
        }))
        .catch(err => console.log(err))
    }

    
    render() {
        const { comments } = this.state;
        return (
            <div className="Comment-List">
                <h3 className="comments-header">Comments: </h3>
                <div className="comments-container">
                {
                        comments.length > 0
                        ? comments.map(comment => {
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
