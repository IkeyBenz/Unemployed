import React, { Component } from 'react';
import './TopNav.css';
import { BrowserRouter, Link } from 'react-router-dom';
import logo from '../images/Unemployed_Logo.png';


class TopNav extends Component {
    constructor(props) {
        super(props);
        this.signoutUser = this.signoutUser.bind(this);
    }
    
    ////Makes GET request to server and clears cookies/logs user out
    signoutUser() {
        fetch('/api/auth/signout')
        .then(res => {
            window.location.reload();
            console.log('Something is going on')
        })
        .catch(err => console.log(err))
    }
   

    render() {
        const user = this.props.user;
        return (
            <BrowserRouter>
                 <div className="TopNav">
                <div className="branding-div">
                    <Link to="/" onClick={ this.forceUpdate }><img className="un-branding" alt="UN" src={ logo } /></Link>
                </div>
                <div className="search-div">
                    <span>
                    <input className="nav-search" type="text" placeholder="Search Something ..." />
                    <button className="search-btn" type="submit"><i className="far fa-check-circle"></i></button>
                    </span>
                </div>
                
                { user ? (
                    <div className="auth-nav">
                        <button className="auth-btn" onClick={ this.signoutUser }>Sign Out</button>
                    </div>
                ) : (
                    <div className="auth-nav">
                        <Link className="auth-btn" to="/signin" onClick={ this.forceUpdate }>Sign In</Link>
                        <Link className="auth-btn" to="/signup" onClick={ this.forceUpdate }>Sign Up</Link>
                    </div>
                )}
                    
            </div>
            </BrowserRouter>
           
        )
    }
}


export default TopNav;
