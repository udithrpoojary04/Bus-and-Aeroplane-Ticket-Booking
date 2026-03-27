const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Bus', 'Aeroplane'], required: true },
    busNumber: { type: String },
    aeroplaneId: { type: String },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { 
        type: Date, 
        required: true,
        validate: {
            validator: function(value) {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const valueDate = new Date(value);
                valueDate.setHours(0, 0, 0, 0);
                return valueDate > today;
            },
            message: 'Date must be tomorrow or later'
        }
    },
    departureTime: { type: String, required: true },
    price: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    bookedSeats: { type: [Number], default: [] }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
