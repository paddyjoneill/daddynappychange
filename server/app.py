from flask import Flask, request, jsonify
from flask_cors import CORS
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
    # for venue in venuesData:
    #     print(venue['placeId'])
    #     if venue['placeId'] == id:
    #         return jsonify(venue)
    # return {}

if __name__ == '__main__':
    app.run()