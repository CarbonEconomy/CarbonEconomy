const axios = require("axios");
const HttpError = require("../errors/HttpError");

// Emissions in g CO2/km
const localDeliveryEmissions = {
  CAR: 200,
  HYBRID_CAR: 175,
  ELECTRIC_CAR: 150,
  BIKE: 175,
  E_SCOOTER: 50,
  BICYCLE: 0,
  WALKER: 0,
};

const ORS_KEY = "5b3ce3597851110001cf624800c459b3b7a941b6a526cdf50abe85bd";
const ORS_DRIVING_DISTANCE =
  "https://api.openrouteservice.org/v2/directions/driving-car";

// returns lat long in format recognised by ORS.
const getCoordinatesString = (point) => {
  const { lat, lng } = point || {};

  const isLatitude = (num) => isFinite(num) && Math.abs(num) <= 90;
  const isLongitude = (num) => isFinite(num) && Math.abs(num) <= 180;

  try {
    isLatitude(lat);
    isLongitude(lng);
  } catch (error) {
    throw new HttpError("Start and End points not valid", 400);
  }

  return `${lng}, ${lat}`;
};

// returns driving dist in m.
const getDrivingDistance = async (start, end) => {
  try {
    const params = {
      api_key: ORS_KEY,
      start: getCoordinatesString(start),
      end: getCoordinatesString(end),
    };

    const response = await axios.get(ORS_DRIVING_DISTANCE, { params: params });

    const result = response.data?.features?.[0]?.properties?.summary?.distance;

    return result;
  } catch (error) {
    throw new HttpError("ORS Service error", 500);
  }
};

const emissionsToCredits = (emissions) => {
  return Math.floor(emissions);
};

const getLocalDeliveryEmissions = (routes, distance) => {
  const emissions = [];
  let max = 0;

  if (distance) {
    distance = distance / 1000;
  }

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (!(route in localDeliveryEmissions)) {
      throw new HttpError(
        `Invalid Route for Local Delivery Type: ${route}`,
        400
      );
    }

    const carbonEmissions = localDeliveryEmissions[route] * distance;

    max = Math.max(carbonEmissions, max);

    emissions.push({
      route: route,
      carbonEmissions: carbonEmissions,
    });
  }

  emissions.forEach((x) => {
    const carbonEmissionsSaved = max - x.carbonEmissions;
    x.carbonEmissionsSaved = carbonEmissionsSaved;
    x.credits = emissionsToCredits(carbonEmissionsSaved);
  });

  return emissions;
};

// Main function
const getEmissions = async (body) => {
  const defaultBody = {
    type: "LOCAL_DELIVERY",
    routes: [
      "CAR",
      "HYBRID_CAR",
      "ELECTRIC_CAR",
      "BIKE",
      "E_SCOOTER",
      "BICYCLE",
      "WALKER",
    ],
  };
  body = { ...defaultBody, ...body };
  const { start, end, routes, type } = body;

  // Check for undefined start and end points
  if (!start || !end) {
    throw new HttpError("Start and End points not defined", 400);
  }

  // Get distance between start and end points
  let distance = await getDrivingDistance(start, end);

  try {
    distance = parseFloat(distance);
  } catch (error) {
    throw new HttpError(
      "Could not get driving distance from points provided",
      400
    );
  }

  // Calculate emissions and return
  let emissions = undefined;

  switch (type) {
    case "LOCAL_DELIVERY":
      emissions = getLocalDeliveryEmissions(routes, distance);
      break;
    default:
      throw new HttpError("Invalid type.", 400);
  }

  if (!emissions) {
    throw new HttpError("Error calculating emissions", 500);
  }

  return emissions;
};

module.exports = {
  getEmissions,
};
