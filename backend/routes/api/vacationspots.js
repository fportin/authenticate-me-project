const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { VacationSpot } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateVacationSpot = [
    check('spotName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the name of the place.'),
    check('location')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide the address of the place.'),
    handleValidationErrors,
];

router.post(
    '/create',
    // requireAuth,
    validateVacationSpot,
    asyncHandler(async (req, res) => {
        const { spotName, activities, location, pictureURL, sessionUser } = req.body;
        const spot = await VacationSpot.createSpot({ spotName, activities, location, pictureURL, sessionUser });

        // await setTokenCookie(res, user);
        return res.json({
            spot,
        });
    }),
);

router.get('/:spotId(\\d+)', asyncHandler(async (req, res) => {
    //grab id from the url
    const spotId = parseInt(req.params.spotId, 10);
    //grab the story from the database
    const spot = await VacationSpot.findByPk(spotId);
    if (spot) {
        
       return res.json(spot);
    } else {
        return res.json({ message: 'Page not Found! Will redirect back to Home.' })
    }

}))


module.exports = router;