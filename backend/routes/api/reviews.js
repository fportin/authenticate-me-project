const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { Review, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
    check('reviewBody')
        .exists({ checkFalsy: true })
        .withMessage('A review could not be empty.')
        .custom((value) => {
            if (!value.trim().length) {
                return Promise.reject('Please enter a valid value for your review.')
            }
            return true;
        }),
    handleValidationErrors,
];

router.post(
    '/create',
    requireAuth,
    validateReview,
    asyncHandler(async (req, res) => {
        const { reviewBody, userId, spotId } = req.body;
        console.log('backend API value', req.body)
        const review = await Review.createReview({ reviewBody, userId, spotId });
        // await setTokenCookie(res, user);
        return res.json({
            review,
        });
    }),
);

router.get('/:spotId(\\d+)', asyncHandler(async (req, res) => {
    //grab id from the url
    const spotId = parseInt(req.params.spotId, 10);
    //grab the story from the database
    console.log('I happened')
    const reviews = await Review.findAll({
        where: {
            spotId: spotId,
        },
        include: User
    });
    if (reviews) {

        return res.json(reviews);
    } else {
        return res.json({ message: 'Page not Found! Redirecting back to Home.' })
    }

}))

// router.put(
//     '/:spotId(\\d+)/edit',
//     requireAuth,
//     validateVacationSpot,
//     asyncHandler(async (req, res) => {
//         //grab id from the url
//         const spotId = parseInt(req.params.spotId, 10);
//         //grab the story from the database
//         const targetSpot = await VacationSpot.findByPk(spotId);
//         const { spotName, activities, location, pictureURL, sessionUser } = req.body;

//         if (targetSpot && targetSpot.userId === sessionUser.id) {
//             const spot = await VacationSpot.updateSpot({ targetSpot, spotName, activities, location, pictureURL });
//             // await setTokenCookie(res, user);
//             return res.json({
//                 spot,
//             });

//         } else {
//             return res.json({ message: 'Page not Found! Redirecting back to Home.' })
//         }
//     }),
// );

// router.delete(
//     '/:spotId(\\d+)/delete',
//     requireAuth,
//     asyncHandler(async (req, res) => {
//         //grab id from the url
//         const spotId = parseInt(req.params.spotId, 10);
//         //grab the story from the database
//         const targetSpot = await VacationSpot.findByPk(spotId);
//         const { sessionUser } = req.body;

//         if (targetSpot && targetSpot.userId === sessionUser.id) {
//             await targetSpot.destroy();
//             return res.json({ message: 'The Page has been deleted.' })

//         } else {
//             return res.json({ message: 'Page not Found! Redirecting back to Home.' })
//         }
//     }),
// );

module.exports = router;