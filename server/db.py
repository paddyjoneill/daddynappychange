import pymysql.cursors
import os

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