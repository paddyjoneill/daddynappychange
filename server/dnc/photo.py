import urllib.request
import json
import os
from random import randint

def get_photo(place_id):
    base_url = 'https://maps.googleapis.com/maps/api/place/details/json?'
    api_key = os.environ.get('GOOGLE_API_KEY')
    places_url = base_url + 'key=' + api_key + '&place_id=' + place_id
    request = urllib.request.urlopen(places_url)
    data = json.load(request)
     # to have random picture rather than first one
    number_of_photos = len(data['result']['photos'])
    selected_photo = randint(0, number_of_photos - 1)
    # would put selected photo instead of 0 below
    photo_reference = data['result']['photos'][0]['photo_reference']
    photo_base_url = 'https://maps.googleapis.com/maps/api/place/photo?'
    photo_url = photo_base_url + 'key=' + api_key + '&photoreference=' + photo_reference + '&maxwidth=300'
    request = urllib.request.urlopen(photo_url)
    print(request.geturl())
    return {"photo_url": request.geturl()}