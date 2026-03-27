const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
    const { vehicleId, seatNumber } = req.body;

    // Atomic check and update
    // We try to find the vehicle and push the seatNumber to bookedSeats 
    // ONLY IF the seatNumber is NOT already in bookedSeats.
    const vehicle = await Vehicle.findOneAndUpdate(
        { _id: vehicleId, bookedSeats: { $ne: seatNumber } },
        { $push: { bookedSeats: seatNumber } },
        { new: true } // return updated doc
    );

    if (!vehicle) {
        res.status(400);
        throw new Error('Seat already booked or vehicle not found');
    }

    // If successful, create the Booking record
    const booking = await Booking.create({
        user: req.user._id,
        vehicle: vehicleId,
        seatNumber,
    });

    if (booking) {
        res.status(201).json(booking);
    } else {
        // Rollback bookedSeats if booking creation fails?
        // Unlikely, but good practice.
        await Vehicle.findByIdAndUpdate(vehicleId, { $pull: { bookedSeats: seatNumber } });
        res.status(400);
        throw new Error('Invalid booking data');
    }
});

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
    console.log('Fetching bookings for user:', req.user?._id);
    const bookings = await Booking.find({ user: req.user._id }).populate('vehicle');
    console.log('Found bookings:', bookings.length);
    res.json(bookings);
});

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({}).populate('user', 'id name email').populate('vehicle');
    res.json(bookings);
});

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('vehicle');

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    // Check user ownership
    if (booking.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized to cancel this booking');
    }

    const vehicle = booking.vehicle;
    if (!vehicle) {
        res.status(404);
        throw new Error('Associated vehicle missing');
    }

    // Calculate exact departure date/time
    const departureDate = new Date(vehicle.date);
    if (vehicle.departureTime) {
        const [hours, minutes] = vehicle.departureTime.split(':');
        departureDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
    }
    
    const timeDiffMs = departureDate.getTime() - Date.now();
    const hoursLeft = timeDiffMs / (1000 * 60 * 60);

    if (hoursLeft < 24) {
        res.status(400);
        throw new Error('Cannot cancel booking within 24 hours of departure');
    }

    // Step 1: Remove seat from vehicle's bookedSeats
    await Vehicle.findByIdAndUpdate(vehicle._id, {
        $pull: { bookedSeats: booking.seatNumber }
    });

    // Step 2: Delete the booking
    await Booking.findByIdAndDelete(booking._id);

    res.json({ message: 'Booking successfully cancelled' });
});

module.exports = {
    createBooking,
    getMyBookings,
    getBookings,
    cancelBooking,
};
