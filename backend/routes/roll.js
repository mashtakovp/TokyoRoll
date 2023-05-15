const express = require('express')
const router = express.Router()

const { 
    getRolls, 
    newRoll, 
    getSingleRoll, 
    updateRoll, 
    deleteRoll,
    createRollReview,
    getRollReviews,
    deleteReview


} = require('../controllers/rollController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')
router.route('/rolls').get(getRolls);
router.route('/roll/:id').get(getSingleRoll);
router.route('/admin/roll/new').post(isAuthenticatedUser, authorizeRoles('admin'), newRoll);
router.route('/admin/roll/:id')
                .put(isAuthenticatedUser, authorizeRoles('admin'), updateRoll)
                .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteRoll);

router.route('/review').put(isAuthenticatedUser, createRollReview);
router.route('/reviews').get(isAuthenticatedUser, getRollReviews);
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)
module.exports = router;