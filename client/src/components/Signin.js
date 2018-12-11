import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import './Signin.css';


class Signin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false
        }

        this.signinUser = this.signinUser.bind(this);
    }
    
    signinUser(e) {
        const form = e.target;
        const data = new FormData(form);
        const email = data.get('email');
        const password = data.get('password');
        const user = {
            email: email,
            password: password
        }
        this.setState({
            formSubmitted: true
        })

        

        axios({
            method: 'post',
            url: '/signin',
            data: user
        })
        .then((res) => {

            console.log(res)
            ////Get the JWT token and store it in local storage
            // const data = res.payload.data;
            // if ( res.payload.status === 200 ) {
            //     sessionStorage.setItem('UnToken', data.token);
            // } else {
            //     console.log('No token')
            // }
        })
        .catch(err => console.log(err));
    }

    render() {
        if ( this.state.formSubmitted === true ) {
            return <Redirect push to="/" />
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