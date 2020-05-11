from flask import Flask, request, jsonify, make_response, abort, g
from flask_cors import CORS

from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()

from user import User
import db

app = Flask(__name__)
CORS(app)

# @auth.verify_password
# def verify_password(username_or_token, password):
#     user = User.verify_auth_token(username_or_token)

#     if not user:
#         user_details = db.get_user_by_username(username_or_token)
#         if user_details:
#             user = User(user_details['username'], user_details['email'])
        
#             user.set_id = user_details['id']
#             user.set_hashed_password = user_details['password']
    
#         if not user or not user.verify_password(password):
#             return False
#     g.user = user
#     return True
    

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
    venue = db.get_venue_by_placeid(id)
    print(venue)
    if venue == None:
        abort(404)
    return jsonify()

@app.route('/api/login', methods=['POST'])
def login():
    login_username = request.json.get('username')
    login_password = request.json.get('password')
    user_details = db.get_user_by_username(login_username)
    # if no user found return that
    if user_details == None:
        abort(400)
    # have db method return user object?
    user = User(user_details['username'], user_details['email'])
    user.set_hashed_password(user_details['hashed_password'])
    can_log_in = user.verify_password(login_password)
    return jsonify({"canlogin": can_log_in})

@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    # find out if user name or email exists
    if not db.get_user_by_username_or_email(username, email) == None:
        #aborts out and won't create new user
        abort(400)
    #create new User and add to db
    user = User(username, email)
    user.hash_password(password)
    db.add_user(user)
    return jsonify(db.get_user_by_username(user.username))

@app.route('/api/users')
def get_users():
    return jsonify( db.get_all_users() )

# @app.route('/api/token')
# @auth.login_required
# def get_auth_token():
#     token = g.user.generate_auth_token()
#     return jsonify({ 'token': token.decode('ascii') })

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
    app.run()