import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './Sidebar.css';



class Sidebar extends Component {
    // NOTE: Will need a constructor with user information so we can display profile image/user info

    render() {
        return (
            <BrowserRouter>
            <div className="Sidebar">
                <div className="user-info">
                    <h2><i className="fas fa-user"></i></h2>
                    <p className="users-name">name</p>
                </div>
                <div className="btn-container">
                    <Link className="sidebar-btn" to="/posts/new">New Post</Link>
                    <button className="sidebar-btn">Friends</button>
                    <button className="sidebar-btn">View Profile</button>
                </div>
            </div>
            </BrowserRouter>
        )
    }
}

export default Sidebar;
