import React, { Component } from 'react';
import '../PostFeed.css';

class PostFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true
        }

        this.fetchPosts = this.fetchPosts.bind(this);
    }
    componentDidMount() {
        console.log('mounted')
        this.fetchPosts();
    }

    fetchPosts() {
        fetch('/posts')
        .then(res => res.json())
        .then(parsedJson => parsedJson.map(post => ({
            key: post._id,
            title: post.title,
            content: post.content,
            type: post.postType
        })))
        .then(posts => this.setState({
            posts,
            isLoading: false
        }))
        .catch(err => console.log(err.message))
    }


    render() {
        const { isLoading, posts } = this.state;
        return (
            <div className="PostFeed-container">
                <h1 className="feed-header">Global Feed</h1>
                <div className="posts-container">
                {
                    !isLoading && posts.length > 0 ? posts.map(post => {
                        console.log(post);
                        return (
                            <div className="post-card" key={ post.key }>
                                <h2 className="post-title">{ post.title }</h2>
                                <p className="post-content">{ post.content }</p>
                                <div className="post-card-footer">
                                    <p className="post-category">Category</p>
                                    <p className="post-author">Author</p>
                                    <p className="post-type">{ post.postType }</p>
                                </div>
                            </div>
                        )
                    }) : null
                }
                </div>
            </div>
        )
    }
}

export default PostFeed;
