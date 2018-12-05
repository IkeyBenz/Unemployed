import React, { Component } from 'react';
import './Post.css';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: '',
            author: '',
            postType: '',
            date: '',
            isLoading: true
        }

        this.fetchPost = this.fetchPost.bind(this);
        this.toggleCommentForm = this.toggleCommentForm.bind(this);
    }
    componentDidMount() {
        return this.fetchPost();
    }

    fetchPost() {
        const { match: { params } } = this.props;
        fetch(`/posts/${ params.postId }`)
        .then(res => res.json())
        .then(post => this.setState({
            id: post._id,
            title: post.title,
            content: post.content,
            author: post.author.name,
            date: post.author.createdAt,
            postType: post.postType,
            isLoading: false
        }))
        .catch(err => console.log(err.message))
    }

    toggleCommentForm() {

    }
   
    render() {
        return (
            <div className="transparent-background">
              <div className="Post-container">
                <div className="post-section">
                    <h2 className="post-title">{ this.state.title }</h2>
                    <p className="post-content">{ this.state.content }</p>
                    <div className="post-footer">
                        <small className="post-author">{ this.state.author }</small>
                        <small className="post-date">{ this.state.date }</small>
                        <small className="post-postType">{ this.state.postType }</small>
                    </div>
                </div>
                <div className="comment-section">
                    <div className="comment-form-section">
                        <CommentForm {...this.props} />
                    </div>
                    <div className="comment-list-container">
                        <CommentList  { ...this.props } />
                    </div>
                </div>
            </div>
            </div>
          
        )
    }
}


export default Post;
