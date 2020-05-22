from dnc import app, db
from flask_httpauth import HTTPBasicAuth

from itsdangerous import (TimedJSONWebSignatureSerializer
                          as Serializer, BadSignature, SignatureExpired)

from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True)
    email = db.Column(db.String(32), index=True)
    hashed_password = db.Column(db.String(128))

    def hash_password(self, password):
        self.hashed_password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.hashed_password, password)

    @staticmethod
    def add_user(new_user):
        username = new_user.get('username')
        email = new_user.get('email')
        password = new_user.get('password')
        
        user = User(username=username, email=email)
        user.hash_password(password)

        db.session.add(user)
        db.session.commit()

        return user

    @staticmethod
    def verify_user_by_username(username, password):
        user = User.query.filter_by(username=username).first()
        if not user or not user.verify_password(password):
            return False
        return True

    def generate_auth_token(self, expiration = 600):
        s = Serializer(app.config['SECRET_KEY'], expires_in=expiration)
        return s.dumps({'id': self.id})

    @staticmethod
    def verify_auth_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None
        except BadSignature:
            return None
        user = User.query.get(data['id'])
        return user
    
    @staticmethod
    def signup(new_user):
        user_exists = User.query.filter_by(username=new_user['username']).first()
        if user_exists != None:
            return {"message": "username already in use"}
        user_exists = User.query.filter_by(email=new_user['email']).first()
        if user_exists != None:
            return {"message": "email already in use"}
        user = User.add_user(new_user)
        return {"id": user.id}

    @staticmethod
    def login(username, password):
        user = User.query.filter_by(username=username).first()
        if user == None:
            return {"message": "username doesn't exist"}
        # error for wrong password
        can_log_in = User.verify_user_by_username(username, password)
        if can_log_in:
            token = user.generate_auth_token()
            return {"jwt": token.decode('utf-8')  }
        return {"message": "wrong password"}

    def to_json(self):
            # write code to make object into json
            return None


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
            venue_json = result.to_json()
            venues.append(venue_json)
        return venues

    def get_venue_by_placeid(id):
        result = Venue.query.filter_by(placeId=id).first()
        if not result == None:
            venue = result.to_json()
            return venue
        return None

    def add_venue(new_venue):
        venue = Venue(placeId=new_venue['placeId'], name=new_venue['name'], lat=new_venue['lat'], lng=new_venue['lng'])
        db.session.add(venue)
        db.session.commit()
        return {"message": "added to db"}

    def to_json(self):
        venue = { "placeId": self.placeId, "name": self.name, "lat": self.lat, "lng": self.lng}
        return venue



class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    venue_id = db.Column(db.String(45), db.ForeignKey('venues.placeId'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(100))
    text = db.Column(db.Text)
    image_link = db.Column(db.String(50))
    rating = db.Column(db.Integer, index=True)

    def get_reviews_by_placeid(id):
        return Review.query.filter_by(venue_id=id).all()

    def get_review_by_reviewid(review_id):
        review = Review.query.filter_by(id=review_id).first()
        if review == None:
            abort(404)
        review_json = review.to_json()
        return review_json

    def add_review(review):
        user = User.query.first()
        new_review = Review(venue_id=review['placeId'], title=review['title'], text=review['text'], user_id=user.id)
        db.session.add(new_review)
        db.session.commit()
        return new_review

    def delete_review_by_reviewid(review_id):
        review = Review.query.filter_by(id=review_id)
        return {}

    def to_json(self):
        json_review = { "text": self.text, "title": self.title }
        return json_review

    @staticmethod
    def get_venue_reviews(id):
        reviews = Review.get_reviews_by_placeid(id)
        json_reviews = []
        for review in reviews:
            json_review = review.to_json()
            json_reviews.append(json_review)
        return json_reviews
