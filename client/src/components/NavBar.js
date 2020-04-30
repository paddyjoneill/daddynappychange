import React from 'react';

const NavBar = () => {


    return(
        <div className="navbar">
            <h2 className="title">Daddy Nappy Change Finder</h2>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/login" >Login/Sign-up</a></li>
                <li><a href="/addlocation" >Add Location</a></li>
            </ul>
        </div>
    )
}

export default NavBar