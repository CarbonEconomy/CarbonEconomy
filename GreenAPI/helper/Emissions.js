const axios = require("axios");
const HttpError = require("../errors/HttpError");
const haversine = require("haversine");

// Estimated emissions in g CO2/km
// Sources:
// https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2020
// https://www.bikeradar.com/features/long-reads/cycling-environmental-impact/
const localDeliveryEmissions = {
  CAR: 185.92,
  DIESEL_CAR: 164.53,
  HYBRID_CAR: 105.67,
  ELECTRIC_CAR: 50.77,
  TRUCK: 500,
  VAN: 240.17,
  BIKE: 98.16,
  E_SCOOTER: 75,
  BICYCLE: 21,
  WALKER: 56,
};

const globalDeliveryEmissions = {
  SHIP: 50,
  AIR: 251,
};

const ORS_KEY = "5b3ce3597851110001cf624800c459b3b7a941b6a526cdf50abe85bd";
const ORS_DRIVING_DISTANCE =
  "https://api.openrouteservice.org/v2/directions/driving-car";
const ORS_REVERSE_GEOCODE = "https://api.openrouteservice.org/geocode/reverse";

const getAddress = async (lat, lng) => {
  if (!lat || !lng) {
    return undefined;
  }

  const params = {
    api_key: ORS_KEY,
    "point.lon": lng,
    "point.lat": lat,
  };

  try {
    const response = await axios.get(ORS_REVERSE_GEOCODE, { params: params });
    const result = response.data?.features?.[0]?.properties?.label;
    return result;
  } catch (error) {
    return undefined;
  }
};

const checkValidLatLong = (lat, lng) => {
  const isLatitude = (num) => isFinite(num) && Math.abs(num) <= 90;
  const isLongitude = (num) => isFinite(num) && Math.abs(num) <= 180;

  if (!(isLatitude(lat) && isLongitude(lng))) {
    throw new HttpError("Start and End points not valid", 400);
  }
};

// returns lat long in format recognised by ORS.
const getCoordinatesString = (point) => {
  const { lat, lng } = point || {};

  checkValidLatLong(lat, lng);

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

const getHaversineDistance = (start, end) => {
  start = {
    latitude: start.lat,
    longitude: start.lng,
  };

  end = {
    latitude: end.lat,
    longitude: end.lng,
  };

  checkValidLatLong(start.latitude, start.longitude);
  checkValidLatLong(end.latitude, end.longitude);

  return haversine(start, end, { unit: "meter" });
};

const emissionsToCredits = (emissions) => {
  return Math.floor(emissions / 15);
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

const getGlobalDeliveryEmissions = (routes, distance) => {
  const emissions = [];
  let max = 0;

  if (distance) {
    distance = distance / 1000;
  }

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    if (!(route in globalDeliveryEmissions)) {
      throw new HttpError(
        `Invalid Route for Global Delivery Type: ${route}`,
        400
      );
    }

    const carbonEmissions = globalDeliveryEmissions[route] * distance;

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

  // Calculate emissions and return
  let emissions = undefined;
  let distance = undefined;

  switch (type) {
    case "LOCAL_DELIVERY":
      distance = await getDrivingDistance(start, end);
      try {
        distance = parseFloat(distance);
      } catch (error) {
        throw new HttpError(
          "Could not get driving distance from points provided",
          400
        );
      }
      emissions = getLocalDeliveryEmissions(routes, distance);
      break;
    case "GLOBAL_DELIVERY":
      distance = getHaversineDistance(start, end);
      emissions = getGlobalDeliveryEmissions(routes, distance);
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
  getAddress,
};
