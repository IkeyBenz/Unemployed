import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './Sidebar.css';
import axios from 'axios';



class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        
        this.fetchUser = this.fetchUser.bind(this);
    }
    //Calls the fetchUser method when the component mounts
    componentDidMount() {
        this.fetchUser();
    }

    //Fetches the current user and sets the state of usersname so we can set the text on the sidebar
    fetchUser() {
        axios('/api/auth/currentUser').then(res => {
            this.setState({
                name: res.data.name
            },
            function() {
                console.log(this.state.name);
            });
        });
        
    }

    render() {


            
            return (
                <BrowserRouter>
                    <div className="Sidebar">
                        <div className="user-info">
                            <h2><i className="fas fa-user"></i></h2>
                            <p className="users-name">{ this.state.name }</p>
                        </div>
                        <div className="btn-container">
                            <Link className="sidebar-btn" onClick={ this.forceUpdate } to="/post-form"><i className="fas fa-plus-circle"></i>New Post</Link>
                            <Link className="sidebar-btn" to="/"><i className="fas fa-user-friends"></i>Friends</Link>
                            <Link className="sidebar-btn" to="/"><i className="fas fa-user-circle"></i>My Profile</Link>
                        </div>
                    </div>
                </BrowserRouter>
            )
        } 
        
    
}

export default Sidebar;
