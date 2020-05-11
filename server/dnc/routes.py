from flask import Flask, jsonify, request, make_response, abort

from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

from dnc import app
from dnc import db

from dnc import models

@app.route('/')
def index():
    return '<h1>Daddy Nappy Change<h2><p>Welcome to the back-end...</p><p><a href="https://daddynappychange.herokuapp.com/api/venues">Link to venues json</a></p>'

@app.route('/api/venues', methods=['POST', 'GET'])
def db_venues():
    if request.method == 'POST':
        newVenue = request.get_json()
        models.Venue.add_venue(newVenue)
        return jsonify(models.Venue.get_all_venues())
    return jsonify(models.Venue.get_all_venues())

@app.route('/api/venues/<id>')
def getVenue(id):
    venue = models.Venue.get_venue_by_placeid(id)
    print(venue)
    if venue == None:
        abort(404)
    return jsonify(venue)

@app.route('/api/signup', methods=['POST'])
def signup():
    new_user = request.get_json()
    user = models.User.add_user(new_user)
    return jsonify({"id": user.id})

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    print(username)
    print(password)
    can_log_in = models.User.verify_user_by_username(username, password)
    return jsonify({"loggedin": can_log_in})


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
