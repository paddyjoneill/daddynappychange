import React, {useState, useEffect} from 'react';
import UserService from '../services/UserService';

const TestLogin = ({history, jwt}) => {

    const [message, setMessage] = useState('waiting to log in')

    useEffect(() => {
        UserService.testLogin(jwt)
        .then(data => setMessage(data['message']))
    }, [])

return(
<div>
<p>Message: {message}</p>
</div>
)

}

export default TestLogin

