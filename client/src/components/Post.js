import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            author: '',
            comments: [],
            postType: '',
            isLoading: true
        }

        // this.fetchPost = this.fetchPost.bind(this);
        // this.fetchComments = this.fetchComments.bind(this);

    }

    // fetchPost() {
     
    // }

    // fetchComments() {
        
    // }


    render() {
        return (
            <div className="Post-container">
                <div className="post-section">

                </div>
                <div className="comment-section">

                </div>
            </div>
        )
    }
}
