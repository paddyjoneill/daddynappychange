from flask import Flask, jsonify, request, make_response, abort, send_from_directory, redirect

from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

from dnc import app
from dnc import db

from dnc import models
from dnc import mail
from dnc import photo

@app.route('/')
def index():
    return '<h1>Daddy Nappy Change<h2><p>Welcome to the back-end...</p><p><a href="https://daddynappychange.herokuapp.com/api/venues">Link to venues json</a></p>'


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
    return jsonify(models.Review.get_venue_reviews(id))

@app.route('/api/venues/<id>')
def get_venue(id):
    venue = models.Venue.get_venue_by_placeid(id)
    if venue == None:
        abort(404)
    return venue

# review routes

@app.route('/api/reviews', methods=['POST'])
def add_review():
    new_review_details = request.get_json()
    new_review = models.Review.add_review(new_review_details)
    return {"id": new_review.id}


@app.route('/api/reviews/<id>')
def get_review(id):
    review = models.Review.get_review_by_reviewid(id)
    if review == None:
        abort(404)
    return review 

# photo ref route
@app.route('/api/photo/<string:place_id>')
def get_photo_url(place_id):
    # return jsonify(photo.get_photo(place_id))
    url = photo.get_photo(place_id)
    return redirect(url['photo_url'])

# user signup and authentication routes

@app.route('/api/signup', methods=['POST'])
def signup():
    new_user = request.get_json()
    # mail.send_signup_mail.delay(new_user['email'])
    return models.User.signup(new_user)

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    return models.User.login(username, password)

@app.route('/api/token', methods=['POST'])
@auth.login_required
def get_token():
    username = request.authorization.username
    user = models.User.query.filter_by(username=username).first()
    token = user.generate_auth_token()
    return token

@app.route('/api/test', methods=['POST'])
@auth.login_required
def test_token():
    return {"message": "You are verified, the token worked!!!"}


@app.errorhandler(404)
def not_found(error):
    return make_response({'error': 'Not found'}, 404)

@auth.verify_password
def verify_password(username_or_token, password):
    user = models.User.verify_auth_token(username_or_token)
    if not user:
        return models.User.verify_user_by_username(username_or_token, password)
    return user