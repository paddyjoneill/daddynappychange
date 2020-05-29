from flask_mail import Mail, Message


from dnc import app
from dnc import celery

mail = Mail(app)

@celery.task()
def send_signup_mail( recipient ):
    # msg = Message('welcome', sender='daddynappychange@gmail.com', recipients=['paddyjoneill@hotmail.com'])
    msg = Message('welcome', sender='daddynappychange@gmail.com', recipients=[recipient['email']])
  
    msg.body = "welcome to daddy nappy change"
    with app.app_context():
        mail.send(msg)

def reset_password_mail():
    pass