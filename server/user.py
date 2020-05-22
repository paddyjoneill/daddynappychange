from passlib.context import CryptContext
from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)

pwd_context = CryptContext(schemes=["pbkdf2_sha256", "des_crypt"], deprecated="auto")


class User:
    def __init__(self, username, email):
        self.id = ''
        self.username = username
        self.email = email
        self.hashed_password = ''

    def set_id(self, id):
        self.id = id

    def hash_password(self, password):
        self.hashed_password = pwd_context.hash(password)

    def set_hashed_password(self, hashed_password):
        self.hashed_password = hashed_password

    def verify_password(self, password):
        return pwd_context.verify(password, self.hashed_password)

    # def generate_auth_token(self, expiration = 1800):
    #     s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
    #     return s.dumps({ 'id': self.id})

    # @staticmethod
    # def verify_auth_token(token):
    #     s = Serializer('the quick brown fox')
    #     try:
    #         data = s.loads(token)
    #     except SignatureExpired:
    #         return None
    #     except BadSignature:
    #         return None
        