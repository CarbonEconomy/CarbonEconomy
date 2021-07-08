from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

class Emissions(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(Emissions, '/api/emissions')

if __name__ == '__main__':
    app.run(debug=True)
