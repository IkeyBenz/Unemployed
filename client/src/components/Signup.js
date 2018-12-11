import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import './Signup.css';


class Signup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            user: false
        }

        this.signupUser = this.signupUser.bind(this);
    }
    
    signupUser(e) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const email = data.get('email');
        const password = data.get('password');
        const name = data.get('name');
        const confirmPassword = data.get('confirmPassword');

        const newUser = {
            email: email,
            password: password,
            name: name
        }


        if ( confirmPassword === password ) {
           
            this.setState({
                formSubmitted: true,
                user: true
         },function() {
             this.props.dataToParent(this.state.user)
             console.log('User on signin component ===> ' + this.state.user);
 
         })
    
            axios({
                method: 'post',
                url: '/signup',
                data: newUser
            })
            .then(res => {
                console.log('user is logged in')
            })
            .catch(err => console.log(err));
        } else {
            console.log('Passwords do not match up.')
            alert('Passwords do not match up.');
        }
    
        }
        
    render() {
        if ( this.state.formSubmitted === true ) {
            return <Redirect push to="/" />
        }
        return (
            <div className="transparent-overlay-background">
                <div className="Signin-container">
                    <h2 className="auth-form-header">Sign Up Today</h2>
                    <form onSubmit={ this.signupUser } className="signin-form">
                        <label htmlFor="email" className="signin-form-labels">Email:</label>
                        <input className="auth-input" type="text" name="email" placeholder="Enter Your Email" />
                        <label htmlFor="name" className="signin-form-labels">Name:</label>
                        <input className="auth-input" type="text" name="name" placeholder="Enter Full Name Here" />
                        <label htmlFor="password" className="signin-form-labels" >Password:</label>
                        <input className="auth-input" name="password" type="password" placeholder="Enter Your Password" />
                        <label htmlFor="password" className="signin-form-labels" ></label>
                        <input className="auth-input" name="confirmPassword" type="password" placeholder="Confrim Your New Password" />
                        <div className="auth-btns-container">
                            <button className="auth-btn">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            
        )
    }
}

export default Signup;