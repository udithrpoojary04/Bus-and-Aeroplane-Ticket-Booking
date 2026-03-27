const express = require('express');
const router = express.Router();
const {
    createBooking,
    getMyBookings,
    getBookings,
    cancelBooking,
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createBooking)
    .get(protect, admin, getBookings); // Admin can view all

router.route('/mybookings').get(protect, getMyBookings);

router.route('/:id').delete(protect, cancelBooking);

module.exports = router;
