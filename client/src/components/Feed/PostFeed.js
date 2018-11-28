import React, { Component } from 'react';
import '../../PostFeed.css';
import PreviewPost from './PreviewPost';
import TopNav from '../TopNav';
import Sidebar from '../Sidebar';

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
            <div className="outer-most">
            <TopNav />
            <div className="big-flex">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="PostFeed-container">
                    <div className="posts-container">
                    {
                        !isLoading && posts.length > 0
                        ? posts.map(post => {
                            return (
                               <PreviewPost {...post} key={ post._id }/>
                            )
                        })
                        : null
                    }
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default PostFeed;
