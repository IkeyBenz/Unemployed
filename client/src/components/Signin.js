import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import './Signin.css';
import axios from 'axios';


class Signin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            user: false
        }
        this.signinUser = this.signinUser.bind(this);

    }
    
    signinUser(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const email = data.get('email');
        const password = data.get('password');
        const user = {
            email: email,
            password: password
        }

        
        

        axios({
            method: 'post',
            url: '/signin',
            data: user
        })
        .then((res) => {
            if(res.status === 200) {
                this.setState({
                    formSubmitted: true,
                    user: true
             },function() {
                 console.log('User on signin component ===> ' + this.state.user);
                 this.forceUpdate();
     
             }
             )
            } else {
                alert('Wrong username or password')
            }
            
        })
        .catch(err => console.log(err));
    }
    
   
     

    render() {
        if ( this.state.formSubmitted === true ) {
            window.location.replace('/');
        }
        return (
            <div className="transparent-overlay-background">
                <div className="Signin-container">
                    <h2 className="auth-form-header">Get Signed In</h2>
                    <form onSubmit={ this.signinUser } className="signin-form">
                        <label htmlFor="email" className="signin-form-labels">Email:</label>
                        <input className="auth-input" type="text" name="email" placeholder="Enter Your Email" />
                        <label htmlFor="password" className="signin-form-labels" >Password:</label>
                        <input className="auth-input" name="password" type="password" placeholder="Enter Your Password" />
                        <div className="auth-btns-container">
                            <button className="auth-btn">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
            
        )
    }
}

export default Signin;