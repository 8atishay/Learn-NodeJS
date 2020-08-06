import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './component.css';

class Register extends React.Component{
    state={
        username:'',
        password:''
    }
    onChange = (e)=>{
        const state = this.state;
        state[e.target.name]=e.target.value;
        this.setState(state);
    }
    onSubmit = (e)=>{
        e.preventDefault();
        const {username, password}= this.state;
        axios.post('/api/auth/register',{username,password})
        .then((result)=>{
            this.props.history.push('/login');
        })
    }

    render(){
        const{username,password}=this.state;
        return(
            <div className='container'>
                <form onSubmit={this.onSubmit}>
                    <h2 className='form-signin-heading'>Please Register</h2>
                    <label for='inputEmail' className='sr-only'>Email Address</label>
                    <input type='email' className='form-control' placeholder='Enter Email Address' name='username' value={username} onChange={this.onChange} required></input>
                    <label for='inputEmail' className='sr-only'>Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' name='password' value={password} onChange={this.onChange} required></input>
                    <button className='btn btn-lg btn-primary btn-block' type='submit'>Register</button>
                </form>
            </div>
        )
    }
}

export default Register;