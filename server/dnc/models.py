from dnc import app, db
from flask_httpauth import HTTPBasicAuth

from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    email = db.Column(db.String(32), index=True)
    hashed_password = db.Column(db.String(128))

    def hash_password(self, password):
        self.hashed_password = generate_password_hash(password)

class Venue(db.Model):
    __tablename__ = 'venues'
    placeId = db.Column(db.String(45), primary_key=True)
    name = db.Column(db.String(100), index=True)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)

    def get_all_venues():
        results = Venue.query.all()
        venues = []
        for result in results:
            venueObject = { "placeId": result.placeId, "name": result.name, "lat": result.lat, "lng": result.lng}
            venues.append(venueObject)
        return venues

    def get_venue_by_placeid(id):
        result = Venue.query.filter_by(placeId=id).first()
        if not result == None:
            venue = { "placeId": result.placeId, "name": result.name, "lat": result.lat, "lng": result.lng}
            return venue
        return None

