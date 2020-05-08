from flask import Flask, request, jsonify
from flask_cors import CORS

from user import User
import db

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return '<h1>Daddy Nappy Change<h2><p>Welcome to the back-end...</p><p><a href="https://daddynappychange.herokuapp.com/api/venues">Link to venues json</a></p>'

@app.route('/api/venues', methods=['POST', 'GET'])
def db_venues():
    if request.method == 'POST':
        newVenue = request.get_json()
        db.add_venue(newVenue)
        return jsonify(db.get_all_venues())
    return jsonify(db.get_all_venues())

@app.route('/api/venues/<id>')
def getVenue(id):
    print(id)
    return jsonify(db.get_venue_by_placeid(id))

@app.route('/api/login', methods=['POST'])
def login():
    login_details = request.get_json()
    user_details = db.get_user_by_username(login_details['username'])
    user = User(user_details['username'], user_details['email'])
    user.set_hashed_password(user_details['hashed_password'])
    can_log_in = user.verify_password(login_details['password'])
    return jsonify({"canlogin": can_log_in})

@app.route('/api/signup', methods=['POST'])
def signup():
    new_user = request.get_json()
    user = User(new_user['username'], new_user['email'])
    user.hash_password(new_user['password'])
    db.add_user(user)
    return "got to end"

@app.route('/api/users')
def get_users():
    return jsonify( db.get_all_users() )

if __name__ == '__main__':
    app.run()