import React from 'react';

import '../App.css'

const NavBar = ({history}) => {


    return(
        <div className="navbar">
            <h2 className="title">Daddy Nappy Change Finder (Work in Progress)</h2>
            <ul className="nav-list">
                <li onClick={() => history.push("/")}>Home</li>
                <li onClick={() => history.push("/login")}>Login</li>
                <li onClick={() => history.push("/addlocation")}>Add Location</li>
                {/* <li onClick={() => history.push("/testlogin")}>Test Login</li> */}
            </ul>
        </div>
    )
}

export default NavBar