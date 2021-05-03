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


module.exports = router;