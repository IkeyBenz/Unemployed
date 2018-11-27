import React, { Component } from 'react';
import './PreviewPost.css';


class PreviewPost extends Component {
    constructor(props) {
        super(props);
      

    }

    render() {
        return (
            <div className="PreviewPost">
                <div className="post-header">
                    <h2 className="post-title">{ this.props.title }</h2>
                    <small className="post-date">mm/dd/yyyy</small>
                </div>
                <p className="post-content">{ this.props.content }</p>
                <div className="post-footer">
                    <h4 className="post-author">{ this.props.author }</h4>
                    <h4 className="post-category">category</h4>
                </div>
            </div>
        )
    }
}


export default PreviewPost;