const baseURL = 'https://daddynappychange.herokuapp.com/api/'

export default {

    login(user){
        console.log("log in")

        return fetch(baseURL + 'login', {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json'
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
    }


}