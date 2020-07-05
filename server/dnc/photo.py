import urllib.request
import json
import os
from random import randint

def get_photo(place_id):
    base_url = 'https://maps.googleapis.com/maps/api/place/details/json?'
    api_key = os.environ.get('GOOGLE_API_KEY')
    # place_id = 'ChIJ68bm6kjGh0gRkyF0XlT5Rww'
    places_url = base_url + 'key=' + api_key + '&place_id=' + place_id
    request = urllib.request.urlopen(places_url)
    data = json.load(request)
    number_of_photos = len(data['result']['photos'])
    selected_photo = randint(0, number_of_photos - 1)
    photo_reference = data['result']['photos'][selected_photo]['photo_reference']
    photo_base_url = 'https://maps.googleapis.com/maps/api/place/photo?'
    photo_url = photo_base_url + 'key=' + api_key + '&photoreference=' + photo_reference + '&maxwidth=300'
    urllib.request.urlretrieve(photo_url, "static/01.jpg")
    return {"photo_url": photo_url}