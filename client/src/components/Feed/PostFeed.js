import React, { Component } from 'react';
import '../../PostFeed.css';
import PreviewPost from './PreviewPost';
import TopNav from '../TopNav';
import { Redirect } from 'react-router';
import Sidebar from '../Sidebar';

class PostFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            isLoading: true,
            redirect: false,
            url: ''
        }

        this.fetchPosts = this.fetchPosts.bind(this);
        this.goToPost = this.goToPost.bind(this);
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

    goToPost(key) {
        console.log('Started')
        this.setState({
            redirect: true,
            url: `/posts/${key}`
        })
        console.log('Something is going on ')
    }




    render() {
        if (this.state.redirect) {
            return <Redirect push to={ this.state.url} />
        }
        const { isLoading, posts } = this.state;
        return (
            <div className="outer-most">
            <TopNav onClick={ this.props.authUser } />
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
                               <PreviewPost {...post} key={ post._id } method={ this.goToPost } />
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
