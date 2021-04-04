const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { VacationSpot } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateVacationSpot = [
    check('spotName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide the name of the place.')
        .custom((value) => {
            if (!value.trim().length) {
                return Promise.reject('Please enter a valid value for the name.')
            }
            return true;
        }),
    check('location')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide the address of the place.')
        .custom((value) => {
            if (!value.trim().length) {
                return Promise.reject('Please enter a valid value for the location.')
            }
            return true;
        }),
    handleValidationErrors,
];

router.post(
    '/create',
    requireAuth,
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
    console.log('I happened')
    const spot = await VacationSpot.findByPk(spotId);
    if (spot) {

        return res.json(spot);
    } else {
        return res.json({ message: 'Page not Found! Redirecting back to Home.' })
    }

}))

router.put(
    '/:spotId(\\d+)/edit',
    requireAuth,
    validateVacationSpot,
    asyncHandler(async (req, res) => {
        //grab id from the url
        const spotId = parseInt(req.params.spotId, 10);
        //grab the story from the database
        const targetSpot = await VacationSpot.findByPk(spotId);
        const { spotName, activities, location, pictureURL, sessionUser } = req.body;

        if (targetSpot && targetSpot.userId === sessionUser.id) {
            const spot = await VacationSpot.updateSpot({ targetSpot, spotName, activities, location, pictureURL });
            // await setTokenCookie(res, user);
            return res.json({
                spot,
            });

        } else {
            return res.json({ message: 'Page not Found! Redirecting back to Home.' })
        }
    }),
);

router.delete(
    '/:spotId(\\d+)/delete',
    requireAuth,
    asyncHandler(async (req, res) => {
        //grab id from the url
        const spotId = parseInt(req.params.spotId, 10);
        //grab the story from the database
        const targetSpot = await VacationSpot.findByPk(spotId);
        const { sessionUser } = req.body;

        if (targetSpot && targetSpot.userId === sessionUser.id) {
            await targetSpot.destroy();
            return res.json({ message: 'The Page has been deleted.' })

        } else {
            return res.json({ message: 'Page not Found! Redirecting back to Home.' })
        }
    }),
);

module.exports = router;