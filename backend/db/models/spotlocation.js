'use strict';
module.exports = (sequelize, DataTypes) => {
  const SpotLocation = sequelize.define('SpotLocation', {
    location: {
      allowNull: false,
      type: DataTypes.STRING
    },
    coordinates: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.DECIMAL)
    },
    spotId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'VacationSpots' },
      onDelete: "CASCADE",
    }
  }, {});
  SpotLocation.associate = function(models) {
    // associations can be defined here
    SpotLocation.belongsTo(models.VacationSpot, { foreignKey: 'spotId' })
  };
  SpotLocation.createSpotLocation = async function ({ location, coordinates, spotId }) {

    const loc = await SpotLocation.create({
      location,
      coordinates,
      spotId
    });

    return loc;
  };
  SpotLocation.updateSpotLocation = async function ({ loc, location, coordinates }) {
    
    const updatedLoc = await loc.update({
      location,
      coordinates
    });
    return updatedLoc;
  };

  return SpotLocation;
};