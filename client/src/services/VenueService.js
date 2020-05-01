const baseURL = 'https://daddynappychange.herokuapp.com/api/venues'

export default {
    getVenues() {
        return fetch(baseURL)
        .then(response => response.json())
    }
}