import React from 'react';

const LocateButton = ({panTo}) => {


    return(
        <button className="locate" onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            }, 
            () =>  null)
        }}>
            Go to My Location
        </button>
    )


}

export default LocateButton