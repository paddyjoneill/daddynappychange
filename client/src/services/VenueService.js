const baseURL = 'https://daddynappychange.herokuapp.com/api/venues'

export default {
    getVenues() {
        return fetch(baseURL)
        .then(response => response.json())
    },

    postVenue(newVenue) {
        return fetch(baseURL, {
          method: "POST",
          body: JSON.stringify(newVenue),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
      },
    
    getVenue(placeId) {
      
    }

}