from flask_mail import Mail, Message

from dnc import app

mail = Mail(app)

def send_signup_mail( recipient ):
    msg = Message('welcome', sender='daddynappychange@gmail.com', recipients=[recipient])
    msg.body = "welcome to daddy nappy change"
    mail.send(msg)

def reset_password_mail():
    pass