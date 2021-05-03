'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('VacationSpots', [
      {
        spotName: 'Hong Kong',
        activities: 'Gastro-Tourism, Shopping, etc...',
        location: 'Hong Kong',
        pictureURL: 'https://www.fodors.com/assets/destinations/54468/boat-harbor-hong-kong-china-1_980x650.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Borobudur Temple',
        activities: 'Sight-seeing etc...',
        location: 'Borobudur Temple, Indonesia',
        pictureURL: 'https://www.planetware.com/photos-large/PER/indonesia-borobudur-world-heritage.jpg',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Shenzhen',
        activities: 'Gastro-Tourism, Shopping, etc...',
        location: 'Shenzhen, China',
        pictureURL: 'https://wallpaperaccess.com/full/348583.jpg',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Tumon Bay',
        activities: 'Beach, Shopping, Sight-seeing, etc...',
        location: 'Tumon Bay, Guam',
        pictureURL: 'https://wallpaperaccess.com/full/3419340.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Riyadh',
        activities: 'Shopping, Sight-seeing, etc...',
        location: 'Riyadh, Saudi Arabia',
        pictureURL: 'https://wallpaperaccess.com/full/1623898.jpg',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Disneyland',
        activities: 'Amusement Park, etc...',
        location: 'Disneyland, Anaheim, CA USA',
        pictureURL: 'https://wallpaperaccess.com/full/2089173.jpg',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Barcelona',
        activities: 'Gastro-Tourism, Shopping, Sight-seeing, etc...',
        location: 'Barcelona, Spain',
        pictureURL: 'https://wallpaperaccess.com/full/1127205.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Oahu',
        activities: 'Beach, Sight-seeing, etc...',
        location: 'Oahu, Hawaii',
        pictureURL: 'https://wallpaperaccess.com/full/436952.jpg',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Stonehenge',
        activities: 'Sight-seeing, etc...',
        location: 'Stonehenge, England',
        pictureURL: 'https://images.alphacoders.com/102/1027379.jpg',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Old Bagan',
        activities: 'Sight-seeing, Gastro-Tourism, etc...',
        location: 'Bagan, Myanmar',
        pictureURL: 'https://pixelz.cc/wp-content/uploads/2018/08/buddhist-temples-bagan-myanmar-uhd-4k-wallpaper.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Lisbon',
        activities: 'Sight-seeing, Gastro-Tourism, etc...',
        location: 'Lisbon, Portugal',
        pictureURL: 'https://wallpaperaccess.com/full/1423589.jpg',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Maya Bay',
        activities: 'Beach, Sight-seeing, etc...',
        location: 'Maya Bay, Thailand',
        pictureURL: 'https://thethaiger.com/wp-content/uploads/2020/02/Screen-Shot-2020-02-17-at-13.49.42.png',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Tokyo',
        activities: 'Gastro-Tourism, Sight-seeing, Shopping etc...',
        location: 'Tokyo, Japan',
        pictureURL: 'https://wallpaperaccess.com/full/19067.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Paris',
        activities: 'Gastro-Tourism, Sight-seeing, Shopping etc...',
        location: 'Paris, France',
        pictureURL: 'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Grand Canyon',
        activities: 'Sight-seeing, etc...',
        location: 'Grand Canyon, Arizona, USA',
        pictureURL: 'https://wallpaperaccess.com/full/703897.jpg',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Taj Mahal',
        activities: 'Sight-seeing, etc...',
        location: 'Taj Mahal, India',
        pictureURL: 'https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-taj-mahal.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'London',
        activities: 'Sight-seeing, Shopping, etc...',
        location: 'London, England',
        pictureURL: 'https://i.imgur.com/sasYjHE.gif',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Machu Picchu',
        activities: 'Sight-seeing, etc...',
        location: 'Machu Picchu, Peru',
        pictureURL: 'https://wallpapercave.com/wp/wp2301762.jpg',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Dubai',
        activities: 'Gastro-Tourism, Sight-seeing, Shopping etc...',
        location: 'Dubai, United Arab Emirates',
        pictureURL: 'https://wallpaperaccess.com/full/1735114.jpg',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Rome',
        activities: 'Gastro-Tourism, Sight-seeing, Shopping etc...',
        location: 'Rome, Italy',
        pictureURL: 'https://wallpaperaccess.com/full/129557.jpg',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Milos Island',
        activities: 'Beach, Sight-seeing, etc...',
        location: 'Milos Island, Greece',
        pictureURL: 'https://www.travelling-greece.com/wp-content/uploads/2017/07/Kleftiko-at-Milos-island.jpg',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotName: 'Coron',
        activities: 'Beach, Sight-seeing, etc...',
        location: 'Coron, Palawan, Philippines',
        pictureURL: 'https://media.cntraveler.com/photos/5668630dc3c9e01555a4d421/master/pass/palawan-philippines-coron-cr-alamy.jpg',
        userId: 1,
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
    return queryInterface.bulkDelete('VacationSpots', null, {});
  }
};
