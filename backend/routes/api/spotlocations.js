const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { SpotLocation } = require('../../db/models')


const router = express.Router();


router.post(
    '/create',
    requireAuth,
    asyncHandler(async (req, res) => {
        const { location, coordinates, spotId } = req.body;
        const spotLocation = await SpotLocation.createSpotLocation({ location, coordinates, spotId });

        return res.json({
            spotLocation,
        });
    }),
);

router.get('/:spotId(\\d+)', asyncHandler(async (req, res) => {
    //grab id from the url
    const spotId = parseInt(req.params.spotId, 10);
    //grab the spot location from the database
    const loc = await SpotLocation.findOne({
        where: {
            spotId: spotId,
        }
    });
    if (loc) {
        const result = res.json(loc);
        return result
    } else {
        return res.json({ message: 'Page not Found! Redirecting back to Home.' })
    }

}))

router.put(
    '/:spotId(\\d+)/update',
    requireAuth,
    asyncHandler(async (req, res) => {
        const { location, coordinates, spotId } = req.body;
        //grab the spot location from the database
        const loc = await SpotLocation.findOne({
            where: {
                spotId: spotId,
            },
            order: [['createdAt', 'DESC']]
        });

        if (loc && loc.spotId === spotId) {
            const updatedLoc = await SpotLocation.updateSpotLocation({ loc, location, coordinates });
            
            return res.json({
                updatedLoc,
            });

        } else {
            return res.json({ message: 'Resource not Found! Redirecting back to Home.' })
        }
    }),
);

module.exports = router;