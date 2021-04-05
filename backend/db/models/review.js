'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: 'userId' })
    Review.belongsTo(models.VacationSpot, { foreignKey: 'spotId' })
  };
  Review.createReview = async function ({ reviewBody, userId, spotId }) {
    console.log('models value', reviewBody)
    const body = reviewBody
    const review = await Review.create({
      body, 
      userId, 
      spotId
    });

    return review;
    // return await User.scope('currentUser').findByPk(user.id);
  };
  Review.updateReview = async function ({ targetReview, reviewBody }) {
    const body = reviewBody
    console.log('updateREv', body)
    const spot = await targetReview.update({
      body,
    });
    return spot;
    // return await User.scope('currentUser').findByPk(user.id);
  };

  return Review;
};