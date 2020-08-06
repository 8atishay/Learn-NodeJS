import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './component.css';
var ExtractJwt = require('passport-jwt').ExtractJwt;

class Login extends React.Component{
    state={
        username:'',
        password:'',
        message:''
    }
    onChange = (e)=>{
        const state = this.state;
        state[e.target.name]=e.target.value;
        this.setState(state);
    }
    onSubmit = (e)=>{
        e.preventDefault();
        const {username, password}= this.state;
        axios.post('/api/auth/login',{username,password})
        .then((result)=>{
            localStorage.setItem('jwtToken',result.data.token);
            this.setState({message:''});
            this.props.history.push('/');/* for App component*/
            
        }).catch((error)=>{
            console.log('login error');
            console.log(error);
            throw error;
            // if (error.console.status===401){
            //     this.setState({message:'Login failed. You are not authorised'})
            // }
        })
    }

    render(){
        const{username,password,message}=this.state;
        return(
            <div className='container'>
                <form onSubmit={this.onSubmit}>
                    {   
                        message !==''
                        && 
                        <div className='alert alert-warning alert-dismissible' role='alert'>
                            {message}
                        </div>
                    }
                    <h2 className='form-signin-heading'>Please Login</h2>
                    <label for='inputEmail' className='sr-only'>Email Address</label>
                    <input type='email' className='form-control' placeholder='Enter Email Address' name='username' value={username} onChange={this.onChange} required></input>
                    <label for='inputEmail' className='sr-only'>Password</label>
                    <input type='password' className='form-control' placeholder='Enter Password' name='password' value={password} onChange={this.onChange} required></input>
                    <button className='btn btn-lg btn-primary btn-block' type='submit'>Login</button>
                    <p>
                        Not a member?
                        <Link to ="/register">Register</Link>
                    </p>
                </form>
            </div>
        )
    }
}

export default Login;