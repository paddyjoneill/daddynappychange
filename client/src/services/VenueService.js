const baseURL = 'https://daddynappychange.herokuapp.com/api/venues'
// const baseURL = 'http://ec2-35-179-93-3.eu-west-2.compute.amazonaws.com/api/venues'

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