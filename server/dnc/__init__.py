from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from celery import Celery

from dotenv import load_dotenv
from pathlib import Path  # python3 only
env_path = Path('.') / '.flaskenv'
load_dotenv(dotenv_path=env_path)

import os

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'

# database settings
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://" + os.environ['DB_USER'] + ":" + os.environ['DB_PASSWORD'] + "@" + os.environ['DB_URL'] + ":3306/innodb"
# app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = ['Content-Type', 'Authorization']

# email settings
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')

# celery redis server
app.config['REDIS_URL'] = os.environ.get('REDIS_URL')

db = SQLAlchemy(app)

celery = Celery( app.name, backend=app.config['REDIS_URL'], broker=app.config['REDIS_URL'])
celery.conf.update(app.config)


from dnc import models
from dnc import routes

# db.create_all() # uncomment to add new table