import React, { Component } from 'react';
import './PostWidget.css';

// NOTE: Need to add functionality to up and down vote buttons
class PostWidget extends Component {


    render() {
        return (
            <div className="PostWidget">
                <button className="widget-btn"><i className="fas fa-thumbs-up"></i></button>
                <button className="widget-btn"><i className="fas fa-thumbs-down"></i></button>
                <button className="widget-btn"><i className="fas fa-share-square"></i></button>
            </div>
        )
    }
}


export default PostWidget;
