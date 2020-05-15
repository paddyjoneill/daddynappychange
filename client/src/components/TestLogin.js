import React, {useState, useEffect} from 'react';
import UserService from '../services/UserService';
import NavBar from './NavBar';

const TestLogin = ({history, jwt}) => {

    const [message, setMessage] = useState('waiting to log in')

    
    useEffect(() => {
        
        UserService.testLogin(jwt)
        .then(data => setMessage(data['message']))
        // eslint-disable-next-line
    }, [])

return(
<div>
    <NavBar history={history} />
    <p>Message: {message}</p>
</div>
)

}

export default TestLogin

