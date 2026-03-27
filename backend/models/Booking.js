const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    seatNumber: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now }
}, { timestamps: true });

// Compound index to prevent duplicate seat bookings
bookingSchema.index({ vehicle: 1, seatNumber: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
