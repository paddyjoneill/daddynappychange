// const placeDetailsURL = 'https://maps.googleapis.com/maps/api/place/details/json?'
// const photoDetailsURL = 'https://maps.googleapis.com/maps/api/place/photo?'
// const googleMapsApiKey = process.env.REACT_APP_GOOGLE_KEY

const baseURL = 'https://daddynappychange.herokuapp.com/api/photo/'

export default {
    
    getPhotoReference(placeId) {
        const URL = baseURL + placeId
        return fetch( URL )
            .then(res => res.json())
            // .then(json => json.result.photos[0].photo_reference)
    },

    // getDummyPhotoURL(){
    //     let photoReference = 'CmRaAAAArbs4hopk4cBmt1zfMFf2d8lQxBhno1B-zEhcRcGMkcOykRtAOc8imo1zeKWIyaSmsZ8PDY_ZiYWuwRfZAtmHM1fx7gquJgRK6IleNTXUsdm6z0wJ4cDQwOIu_L88tBeHEhBoyVQc4KefMhf_Ek8QB3CPGhRorkTgOJUFBax1g1pvl3tuMRvqFQ'
    //     let photoURL = photoDetailsURL + 'key=' + googleMapsApiKey + '&photoreference=' + photoReference + '&maxwidth=300'
    //     return photoURL
    // }

}

