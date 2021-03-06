let base64 = require('base-64');


  // const baseURL = 'https://daddynappychange.herokuapp.com/api/'
  const baseURL = 'https://daddynappychange.co.uk/api/'
  // const baseURL = 'http://daddynappychange:5000/api/'


export default {

    login(user){
        console.log("log in")

        return fetch(baseURL + 'login', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + base64.encode(user['username'] + ":" + user['password'])
            }
          })
            .then(res => res.json())
    },

    postUser(newUser){
        return fetch(baseURL + 'signup', {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
    },

    testLogin(jwt){
      console.log(jwt)
      return fetch(baseURL + 'test', {
        method: "POST",
        body: JSON.stringify({jwt: jwt}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64.encode(jwt + ":dummy")
        }
      })
        .then(res => res.json())

    }


}