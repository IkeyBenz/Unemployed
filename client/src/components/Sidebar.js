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
                    <p className="users-name">John Doe</p>
                </div>
                <div className="btn-container">
                    <Link className="sidebar-btn" to="/posts/new"><i className="fas fa-plus-circle"></i>New Post</Link>
                    <Link className="sidebar-btn" to="/"><i className="fas fa-user-friends"></i>Friends</Link>
                    <Link className="sidebar-btn" to="/"><i className="fas fa-user-circle"></i>My Profile</Link>
                </div>
            </div>
            </BrowserRouter>
        )
    }
}

export default Sidebar;
