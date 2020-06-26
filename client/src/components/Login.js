import React, { useState } from 'react';
import NavBar from './NavBar';

import UserService from '../services/UserService'

const Login = ({ history, setJwt }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        let userObject = {
            username: username,
            password: password
        }
        UserService.login(userObject)
        .then( data => setJwt(data['jwt']) )
        .then(history.push('/'))

    }



return(
    <div>
    <NavBar history={history}></NavBar>
    <div className="login-background">
        <br></br>
        <div className="login-form">
            <h2>Login</h2>
        
                {/* <label for="username">Username:</label> */}
                <input type="text" id="username" name="username" 
                className="form-input"
                placeholder="username"
                onChange={ event => setUsername(event.target.value)}>
                </input>
                <br></br>
                {/* <label for="password">Password:</label> */}
                <input type="password" id="password" name="password"
                className="form-input"
                placeholder="password"
                onChange={event => setPassword(event.target.value)}
                ></input>
                <br></br>
                <button className="login-button" onClick={handleLogin}>Login</button>
            <div>
                <button className="register-button" onClick={() => history.push("/signup")}>Not Registered? Sign up!</button>
            </div>
        </div>
    
  
    </div>
    </div>
)

}

export default Login