import React, { Component } from 'react';
import '../../PostFeed.css';
import PreviewPost from './PreviewPost';

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
                    !isLoading && posts.length > 0 
                    ? posts.map(post => {
                        return (
                           <PreviewPost {...post} /> 
                        )
                    })
                    : null
                }
                </div>
            </div>
        )
    }
}

export default PostFeed;
