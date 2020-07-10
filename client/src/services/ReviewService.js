// const baseURL = 'https://daddynappychange.herokuapp.com/api/'
const baseURL = 'http://daddynappychange.co.uk:5000/api/'
// const baseURL = 'http://daddynappychange:5000/api/'

export default {

    addReview(review){
        return fetch(baseURL + 'reviews', {
            method: "POST",
            body: JSON.stringify(review),
            headers: {
              'Content-Type': 'application/json',
            //   'Authorization': 'Basic ' + base64.encode(user['username'] + ":" + user['password'])
            }
          })
            .then(res => res.json()
            )
    },

    getReviewsByVenue(placeId) {
      return fetch(baseURL + 'venues/' + placeId + '/reviews')
      .then(response => response.json())
  }

}