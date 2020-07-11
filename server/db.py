import pymysql.cursors
import os
from user import User

connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

def get_all_venues():

    connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `venues`"
               cursor.execute(sql)
            result = cursor.fetchall()
            return result
        connection.commit()
    finally:
        connection.close()

def get_venue_by_placeid(placeId):

    connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM `venues` WHERE `placeId` = %s"
            cursor.execute(sql, (placeId))
            result = cursor.fetchone()
            return result
        connection.commit()
    finally:
        connection.close()

def add_venue(newVenue):

    connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO `venues` (`name`, `lat`, `lng`, `placeId`) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (newVenue['name'], newVenue['lat'], newVenue['lng'], newVenue['placeId'] ))
        connection.commit()
    
    finally:
        connection.close()

def create_user_table():

    connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    sql = "CREATE TABLE `users` (`id` int(11) NOT NULL AUTO_INCREMENT, `username` varchar(255) COLLATE utf8_bin NOT NULL, `email` varchar(255) COLLATE utf8_bin NOT NULL, `hashed_password` varchar(255) COLLATE utf8_bin NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;"
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql)
        connection.commit()
    
    finally:
        connection.close()

# create_user_table()

def add_user(user):

    connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO `users` (`username`, `email`, `hashed_password`) VALUES (%s, %s, %s)"
            cursor.execute(sql, ( user.username, user.email, user.hashed_password ))
        connection.commit()
    
    finally:
        # connection.close()
        print("ok")

def get_all_users():

    connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
        # Read all records
            sql = "SELECT * FROM `users`"
            cursor.execute(sql)
            result = cursor.fetchall()
            return result
        connection.commit()
    finally:
        connection.close()

def get_user_by_username(username):
    connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
        # Read all records
            sql = "SELECT * FROM `users` WHERE `username` = %s"
            cursor.execute(sql, (username))
            result = cursor.fetchone()
            print(result)
            return result
        connection.commit()
    finally:
        connection.close()

def get_user_by_username_or_email(username, email):
    connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

    try:
        with connection.cursor() as cursor:
        # Read all records
            sql = "SELECT * FROM `users` WHERE `username` = %s OR `email` = %s"
            cursor.execute(sql, (username, email))
            result = cursor.fetchone()
            print(result)
            return result
        connection.commit()
    finally:
        connection.close()