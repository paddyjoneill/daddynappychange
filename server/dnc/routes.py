from flask import Flask, jsonify, request, make_response, abort

from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

from dnc import app
from dnc import db

from dnc import models

@app.route('/')
def index():
    return '<h1>Daddy Nappy Change<h2><p>Welcome to the back-end...</p><p><a href="https://daddynappychange.herokuapp.com/api/venues">Link to venues json</a></p>'


# venue routes

@app.route('/api/venues', methods=['POST', 'GET'])
def db_venues():
    if request.method == 'POST':
        newVenue = request.get_json()
        models.Venue.add_venue(newVenue)
        return jsonify(models.Venue.get_all_venues())
    return jsonify(models.Venue.get_all_venues())

@app.route('/api/venues/<string:id>/reviews')
def getVenueReviews(id):
    reviews = models.Review.get_reviews_by_placeid(id)
    json_reviews = []
    for review in reviews:
        json_review = { "text":review.text, "title":review.title}
        json_reviews.append(json_review)
    return jsonify(json_reviews)

@app.route('/api/venues/<id>')
def getVenue(id):
    venue = models.Venue.get_venue_by_placeid(id)
    print(venue)
    if venue == None:
        abort(404)
    return jsonify(venue)



# review routes

@app.route('/api/reviews', methods=['POST'])
def addReview():
    newReviewDetails = request.get_json()
    newReview = models.Review.add_review(newReviewDetails)
    return {"id": newReview.id}


@app.route('/api/reviews/<id>')
def getReview(id):
    review = models.Review.get_review_by_reviewid(id)
    if review == None:
        abort(404)
    return jsonify(review)

# user signup and authentication routes

@app.route('/api/signup', methods=['POST'])
def signup():
    new_user = request.get_json()
    # check username and email aren't already in use
    # return error if so
    user = models.User.add_user(new_user)
    return jsonify({"id": user.id})

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    # error for user doesn't exist
    # error for wrong password
    can_log_in = models.User.verify_user_by_username(username, password)
    if can_log_in:
        user = models.User.query.filter_by(username=username).first()
        token = user.generate_auth_token()
    return jsonify({"jwt": token.decode('utf-8')  })

@app.route('/api/token', methods=['POST'])
@auth.login_required
def get_token():
    username = request.authorization.username
    password = request.authorization.password
    user = models.User.query.filter_by(username=username).first()
    token = user.generate_auth_token()
    return token

@app.route('/api/test', methods=['POST'])
@auth.login_required
def test_token():
    return jsonify({"message": "You are verified, the token worked!!!"})


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@auth.verify_password
def verify_password(username_or_token, password):
    print(username_or_token)
    print(password)
    # try and get verified with auth token
    user = models.User.verify_auth_token(username_or_token)
    # if not token tries to verify by username and password
    if not user:
        return models.User.verify_user_by_username(username_or_token, password)
    return user