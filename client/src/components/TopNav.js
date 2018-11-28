import React, { Component } from 'react';
import './TopNav.css';


class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: ''
        }

        this.authUser = this.authUser.bind(this);
    }
    //makes req to backend that will authenticate a user
    authUser() {
        fetch('/auth/google')
        .then(res => {
            if(res.status === 200) {
                //update state of loggedIn
                this.setState({
                    loggedIn: true,
                    username: res.data.name
                })
            }
        }).catch(err => console.log(err))
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
                    <button className="auth-btn" onClick={ this.authUser }>Sign In</button>
                    <button className="auth-btn" onClick={ this.authUser }>Sign Up</button>
                </div>
            </div>
        )
    }
}


export default TopNav;
