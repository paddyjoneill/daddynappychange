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
    <div>
        <h2>Login Page</h2>
        
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" 
            onChange={ event => setUsername(event.target.value)}>
            </input>
            <br></br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"
            onChange={event => setPassword(event.target.value)}
            ></input>
            <br></br>
            <button onClick={handleLogin}>Login</button>
    </div>
    <div>
        <h3 onClick={() => history.push("/signup")}>Not Registered? Sign up!</h3>
    </div>
    </div>
)

}

export default Login