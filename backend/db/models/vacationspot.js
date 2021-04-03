'use strict';
module.exports = (sequelize, DataTypes) => {
  const VacationSpot = sequelize.define('VacationSpot', {
    spotName: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    activities: { 
      type: DataTypes.TEXT
    },
    location: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    pictureURL: { 
      type: DataTypes.STRING
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  VacationSpot.associate = function(models) {
    // associations can be defined here
  };
  VacationSpot.createSpot = async function ({ spotName, activities, location, pictureURL, sessionUser }) {
    const userId = sessionUser.id;

    const spot = await VacationSpot.create({ 
      spotName, 
      activities, 
      location, 
      pictureURL,
      userId 
    });

    return spot;
    // return await User.scope('currentUser').findByPk(user.id);
  };

  return VacationSpot;
};