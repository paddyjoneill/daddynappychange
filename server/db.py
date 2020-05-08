import pymysql.cursors
import os

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
        # Read all records
            sql = "SELECT * FROM `venues`"
            cursor.execute(sql)
            result = cursor.fetchall()
            # print(result)
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
        # Read all records
            sql = "SELECT * FROM `venues` WHERE `placeId` = %s"
            cursor.execute(sql, (placeId))
            result = cursor.fetchone()
            # print(result)
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
    sql = "CREATE TABLE `users` (`id` int(11) NOT NULL AUTO_INCREMENT, `email` varchar(255) COLLATE utf8_bin NOT NULL, `password` varchar(255) COLLATE utf8_bin NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=1 ;"

    connection = pymysql.connect(host=os.environ['DB_URL'],
                             user=os.environ['DB_USER'],
                             password=os.environ['DB_PASSWORD'],
                             db='innodb',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql)
        connection.commit()
    
    finally:
        connection.close()

# create_user_table()

def add_user(user):
    try:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO `users` (`username`, `email`, `password`) VALUES (%s, %s, %s)"
            cursor.execute(sql, ( user.name, user.email, user,hashed_password ))
        connection.commit()
    
    finally:
        connection.close()
