import React, { Component } from 'react';
import './TopNav.css';
import { BrowserRouter, Link } from 'react-router-dom';


class TopNav extends Component {

    render() {
        return (
            <BrowserRouter>
                 <div className="TopNav">
                <div className="branding-div">
                    <h2 className="un-branding">UN</h2>
                </div>
                <div className="search-div">
                    <span>
                    <input className="nav-search" type="text" placeholder="Search Something ..." />
                    <button className="search-btn" type="submit"><i className="far fa-check-circle"></i></button>
                    </span>
                </div>
                <div className="auth-nav">
                    <Link className="auth-btn" to="/signin" onClick={ this.forceUpdate }>Sign In</Link>
                    <Link className="auth-btn" to="/signup" onClick={ this.forceUpdate }>Sign Up</Link>
                </div>
            </div>
            </BrowserRouter>
           
        )
    }
}


export default TopNav;
