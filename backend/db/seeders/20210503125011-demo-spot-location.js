'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('SpotLocations', [
      {
        location: 'Hong Kong',
        coordinates: [22.325988507246905, 114.17918808435013],
        spotId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Borobudur Temple, Indonesia',
        coordinates: [-7.607629203382667, 110.20376202620058],
        spotId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Shenzhen, China',
        coordinates: [22.54622162701762, 114.05730212963854],
        spotId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Tumon Bay, Guam',
        coordinates: [13.514488494943324, 144.8000112327693],
        spotId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Riyadh, Saudi Arabia',
        coordinates: [24.690878670915595, 46.68503262444894],
        spotId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Disneyland, Anaheim, CA USA',
        coordinates: [33.812296807863, -117.91902784654927],
        spotId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Barcelona, Spain',
        coordinates: [41.41407236166603, 2.1527159554788313],
        spotId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Oahu, Hawaii',
        coordinates: [21.456219008815605, -158.00094392408084],
        spotId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Stonehenge, England',
        coordinates: [51.17902994718557, -1.8262579172476545],
        spotId: 9,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Bagan, Myanmar',
        coordinates: [21.172066428820187, 94.85849975960015],
        spotId: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Lisbon, Portugal',
        coordinates: [38.72541028715351, -9.139947745089634],
        spotId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Maya Bay, Thailand',
        coordinates: [7.677608244253432, 98.76597188236224],
        spotId: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Tokyo, Japan',
        coordinates: [35.81201862157382, 139.76924601813397],
        spotId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Paris, France',
        coordinates: [48.861548201010955, 2.2962462956790786],
        spotId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Grand Canyon, Arizona, USA',
        coordinates: [36.062489592051186, -112.10934297320388],
        spotId: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Taj Mahal, India',
        coordinates: [27.17538339598555, 78.04216365517024],
        spotId: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'London, England',
        coordinates: [51.51958660963749, -0.12907140972704817],
        spotId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Machu Picchu, Peru',
        coordinates: [-13.162838229215119, -72.54498436024151],
        spotId: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Dubai, United Arab Emirates',
        coordinates: [25.214318661935675, 55.278519381767204],
        spotId: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Rome, Italy',
        coordinates: [41.899254123379635, 12.470758413024368],
        spotId: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Milos Island, Greece',
        coordinates: [36.69829817170234, 24.39265747536186],
        spotId: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Coron, Palawan, Philippines',
        coordinates: [11.972262476896217, 120.21733864429225],
        spotId: 22,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'San Francisco, California, USA',
        coordinates: [37.7790262, -122.419906],
        spotId: 23,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        location: 'Seattle, Washington, USA',
        coordinates: [47.6038321, -122.3300624],
        spotId: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('SpotLocations', null, {});
  }
};
