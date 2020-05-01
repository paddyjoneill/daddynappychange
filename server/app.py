from flask import Flask, request, jsonify

app = Flask(__name__)

venuesData = [
        {
            "name": "National Museum of Scotland",
            "lat": 55.9469809,
            "lng": -3.1905524,
            "placeId" : "ChIJIeS60YTHh0gRw7W-8gMnzIg"
        },
        {
            "name": "National Gallery of Scotland",
            "lat": 55.950902,
            "lng": -3.1956862,
            "placeId": "ChIJ68bm6kjGh0gRkyF0XlT5Rww"
        }
    ]

@app.route('/')
def index():
    return '<h1>Daddy Nappy Change<h2><p>Welcome to the back-end...</p>'

@app.route('/venues')
def venues():
    return jsonify(venuesData)


if __name__ == '__main__':
    app.run()