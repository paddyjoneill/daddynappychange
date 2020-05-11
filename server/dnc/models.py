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

    def add_user(new_user):
        username = new_user.get('username')
        email = new_user.get('email')
        password = new_user.get('password')
        
        user = User(username=username, email=email)
        user.hash_password(password)

        db.session.add(user)
        db.session.commit()

        return user


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

    def add_venue(new_venue):
        venue = Venue(placeId=new_venue['placeId'], name=new_venue['name'], lat=new_venue['lat'], lng=new_venue['lng'])
        # check venue doesn't exist
        db.session.add(venue)
        db.session.commit()
        return {"message": "added to db"}

