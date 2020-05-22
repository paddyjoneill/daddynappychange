from flask import Flask, jsonify, request, make_response, abort

from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

from dnc import app
from dnc import db

from dnc import models

@app.route('/')
def index():
    return '<h1>Daddy Nappy Change<h2><p>Welcome to the back-end...</p><p><a href="https://daddynappychange.herokuapp.com/api/venues">Link to venues json</a></p>'

#try serving front end from static folder
@app.route('/frontend')
def frontend():
    return

# venue routes

@app.route('/api/venues', methods=['POST', 'GET'])
def db_venues():
    if request.method == 'POST':
        new_venue = request.get_json()
        models.Venue.add_venue(new_venue)
        return jsonify(models.Venue.get_all_venues())
    return jsonify(models.Venue.get_all_venues())

@app.route('/api/venues/<string:id>/reviews')
def get_venue_reviews(id):
    reviews = models.Review.get_reviews_by_placeid(id)
    # move this to models section?
    json_reviews = []
    for review in reviews:
        json_review = { "text":review.text, "title":review.title }
        json_reviews.append(json_review)
    return jsonify(json_reviews)

@app.route('/api/venues/<id>')
def get_venue(id):
    venue = models.Venue.get_venue_by_placeid(id)
    print(venue)
    if venue == None:
        abort(404)
    return jsonify(venue)



# review routes

@app.route('/api/reviews', methods=['POST'])
def add_review():
    new_review_details = request.get_json()
    new_review = models.Review.add_review(new_review_details)
    return {"id": new_review.id}


@app.route('/api/reviews/<id>')
def get_review(id):
    review = models.Review.get_review_by_reviewid(id)
    return review

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
    user = models.User.verify_auth_token(username_or_token)
    if not user:
        return models.User.verify_user_by_username(username_or_token, password)
    return user