import React, { Component } from 'react';
import './TopNav.css';


class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }

    }


    render() {
        return (
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
                    <button className="auth-btn" onClick={ this.props.onClick }>Sign In</button>
                    <button className="auth-btn" onClick={ this.props.onClick }>Sign Up</button>
                </div>
            </div>
        )
    }
}


export default TopNav;
