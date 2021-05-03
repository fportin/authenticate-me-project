const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const vacationSpotsRouter = require('./vacationspots.js');
const reviewsRouter = require('./reviews.js');
const spotLocationsRouter = require('./spotlocations');


router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', vacationSpotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/spot-locations', spotLocationsRouter);




module.exports = router;
