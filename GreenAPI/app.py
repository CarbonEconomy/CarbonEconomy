from flask import Flask
from flask_restful import Resource, Api, request
from flask_cors import CORS
import requests
from requests.api import post
import os

app = Flask(__name__)
api = Api(app)
ors_key = os.environ.get('ORS_KEY')
CORS(app)

def get_location_from_postcode(postcode):
    payload = {'searchVal': postcode, 'returnGeom': 'Y', 'getAddrDetails':'N'}
    r = requests.get('https://developers.onemap.sg/commonapi/search', params=payload)
    r.raise_for_status()

    json = r.json()
    results = json['results'][0]
    return "{0}, {1}".format(results['LONGITUDE'], results['LATITUDE'])

# Get distance from postcodes
def get_distance(start, end):
    start_coord = get_location_from_postcode(start)
    end_coord = get_location_from_postcode(end)
    payload = {'api_key': ors_key, 'start': start_coord, 'end': end_coord}
    r = requests.get('https://api.openrouteservice.org/v2/directions/driving-car', params=payload)
    r.raise_for_status()

    distance = r.json()['features'][0]['properties']['summary']['distance']
    return distance

class Distance(Resource):
    def get(self):
        args = request.args
        start = args['start']
        end = args['end']
        return {'distance': get_distance(start, end)}

class Emissions(Resource):
    def get(self):
        args = request.args
        start = args['start']
        end = args['end']
        type = args['type']
        distance = get_distance(start, end)
        emissions = 5 * distance
        return { 'distance': distance, 'emissions': emissions }

api.add_resource(Distance, '/api/distance')
api.add_resource(Emissions, '/api/emissions')

if __name__ == '__main__':
    app.run(debug=True)
