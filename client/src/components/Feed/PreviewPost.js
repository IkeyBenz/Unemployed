import React, { Component } from 'react';
import './PreviewPost.css';
import PostWidget from './PostWidget';


class PreviewPost extends Component {


    render() {
        return (
            <div className="PreviewPost" key={ this.props._id } onClick={ () => this.props.method(this.props._id) }>
                <div className="post-header">
                    <h2 className="post-title">{ this.props.title }</h2>
                    <small className="post-date">mm/dd/yyyy</small>
                </div>
                <p className="post-content">{ this.props.content }</p>
                <div className="post-footer">
                    <div className="footer-info">
                        <h4 className="post-author">{ this.props.author.name }</h4>
                        <h4 className="post-category">category</h4>
                    </div>
                    <div className="footer-voting">
                        <PostWidget />
                    </div>
                </div>
            </div>
        )
    }
}


export default PreviewPost;
