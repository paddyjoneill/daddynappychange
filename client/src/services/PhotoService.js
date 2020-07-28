// const placeDetailsURL = 'https://maps.googleapis.com/maps/api/place/details/json?'
// const photoDetailsURL = 'https://maps.googleapis.com/maps/api/place/photo?'
// const googleMapsApiKey = process.env.REACT_APP_GOOGLE_KEY

const baseURL = 'https://daddynappychange.co.uk/api/photo/'

export default {
    
    getPhotoReference(placeId) {
        const URL = baseURL + placeId
        return fetch( URL )
            .then(res => res.json())
    }

}

