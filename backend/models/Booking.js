const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    seatNumber: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Optimistic Concurrency Control could be used, or just relying on the Vehicle.bookedSeats atomic update.
// We'll trust the controller logic to handle the atomic check on Vehicle first.

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
