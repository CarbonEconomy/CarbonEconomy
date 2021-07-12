from flask import Flask
from flask_restful import Resource, Api, request
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
api = Api(app)
ors_key = os.environ.get('ORS_KEY')
CORS(app)

rewards = { 5: 20, 6: 30, 7: 45 }

def get_location_from_postcode(postcode):
    payload = {'searchVal': postcode, 'returnGeom': 'Y', 'getAddrDetails':'N'}
    r = requests.get('https://developers.onemap.sg/commonapi/search', params=payload)
    r.raise_for_status()

    json = r.json()
    results = json['results'][0]
    return "{0}, {1}".format(results['LONGITUDE'], results['LATITUDE'])

# Get distance from postcodes
# TODO handle cases where no routes found
def get_distance(start, end):
    if (start == end):
        return 0

    payload = {'api_key': ors_key, 'start': start, 'end': end}
    r = requests.get('https://api.openrouteservice.org/v2/directions/driving-car', params=payload)
    r.raise_for_status()

    distance = r.json()['features'][0]['properties']['summary']['distance']
    return distance

class Location(Resource):
    def get(self):
        args = request.args
        location = args['location']
        return get_location_from_postcode(location)

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

class Rewards(Resource):
    def get(self, user_id):
        return { user_id: rewards[user_id] }

    def put(self, user_id):
        args = request.args
        to_add = args['to_add']
        rewards[user_id] += int(to_add)
        return rewards

class RewardList(Resource):
    def get(self):
        return rewards

    def post(self):
        args = request.args
        user_id = int(max(rewards.keys())) + 1
        rewards[user_id] = int(args['init_val'])
        return rewards


api.add_resource(Distance, '/api/distance')
api.add_resource(Emissions, '/api/emissions')
api.add_resource(Location, '/api/location')
api.add_resource(RewardList, '/api/rewards')
api.add_resource(Rewards, '/api/rewards/<int:user_id>')

if __name__ == '__main__':
    app.run(debug=True)
