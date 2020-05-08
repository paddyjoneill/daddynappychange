from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["pbkdf2_sha256", "des_crypt"], deprecated="auto")


class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email
        self.hashed_password = ''

    def hash_password(self, password):
        self.hashed_password = pwd_context.hash(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.hashed_password)


user = User('paddy', 'paddyjoneill@hotmail.com')
user.hash_password('testing')
print(user.verify_password('testing'))
print(user.verify_password('password'))