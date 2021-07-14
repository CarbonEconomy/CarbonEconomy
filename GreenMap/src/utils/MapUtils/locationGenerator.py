#!/usr/bin/env python3

import pycristoforo as pyc
import csv
import random

COUNTRY = "Singapore"
NUM_POINTS = 1000
MIN_COUNT = 10
MAX_COUNT = 60

def writeToCSV(coordinates):
    with open('SingaporeLocations_smaller.csv', 'w', newline='') as csvfile:
        fieldnames = ['lng', 'lat']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for coordinate in coordinates:
            [lng,lat] = coordinate
            writer.writerow({'lng':lng, 'lat':lat})
    return


def addDuplicateCounts(points):
    newPoints = []
    for point in points:
        randomCount = random.randint(MIN_COUNT, MAX_COUNT)
        for count in range(randomCount):
            newPoints.append(point)
    return newPoints

def getPoints():
    country = pyc.get_shape(COUNTRY)
    points = pyc.geoloc_generation(country, NUM_POINTS, COUNTRY)
    return points

def getCoordinates(point):
    return point['geometry']['coordinates']

def main():
    points = getPoints()
    duplicatedPoints = addDuplicateCounts(points)
    coordinates = list(map(getCoordinates, duplicatedPoints))
    print(coordinates)
    writeToCSV(coordinates)
    print("done writing!")
    return

if __name__ == '__main__':
    main()


