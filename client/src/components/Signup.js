import React, { useState } from 'react';
import NavBar from './NavBar';

import UserService from '../services/UserService'

const Signup = ({history}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const handleSignup = () => {
        if (password === confPassword ){
            let signupObject = {
                username: username,
                email: email,
                password: password
            }
            UserService.postUser(signupObject)
        } else {
            // error message
            // passwords not matching
        }


    }

return(
    <div>
    <NavBar history={history}></NavBar>
    <div className="signup-background">
        <br></br>
        <div className="signup-form">
        <h2>Sign Up</h2>
            {/* <label for="username">Username:</label> */}
            <input type="text" id="username" name="username" 
            className="form-input"
            placeholder="username"
            onChange={ event => setUsername(event.target.value)}>
            </input>
            {/* <br></br> */}
            {/* <label for="email">email:</label> */}
            <input type="text" id="email" name="email"
            className="form-input"
            placeholder="email"
            onChange={event => setEmail(event.target.value)}           
            ></input>
            {/* <br></br> */}
            {/* <label for="password">Password:</label> */}
            <input type="password" id="password" name="password"
            className="form-input"
            placeholder="password"
            onChange={event => setPassword(event.target.value)}
            ></input>
            {/* <br></br> */}
            {/* <label for="confirmpassword">Confirm Password:</label> */}
            <input type="password" id="confirmpassword" name="confirmpassword"
            className="form-input"
            placeholder="confirm password"
            onChange={event => setConfPassword(event.target.value)}            
            ></input>
            {/* <br></br> */}
            <button className="login-button"onClick={handleSignup}>Sign Up</button>
    </div>
    </div>
    </div>
)

}

export default Signup