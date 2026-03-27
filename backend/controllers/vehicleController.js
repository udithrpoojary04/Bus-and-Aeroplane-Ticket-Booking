const asyncHandler = require('express-async-handler');
const Vehicle = require('../models/Vehicle');

// @desc    Add a vehicle (Bus/Plane)
// @route   POST /api/vehicles
// @access  Private/Admin
const addVehicle = asyncHandler(async (req, res) => {
    const { name, type, busNumber, aeroplaneId, from, to, date, departureTime, price, totalSeats } = req.body;

    const vehicle = await Vehicle.create({
        name,
        type,
        busNumber,
        aeroplaneId,
        from,
        to,
        date,
        departureTime,
        price,
        totalSeats,
        bookedSeats: []
    });

    if (vehicle) {
        res.status(201).json(vehicle);
    } else {
        res.status(400);
        throw new Error('Invalid vehicle data');
    }
});

// @desc    Get all vehicles (with filters)
// @route   GET /api/vehicles
// @access  Public
const getVehicles = asyncHandler(async (req, res) => {
    const { from, to, date, type } = req.query;
    let query = {};

    if (from) query.from = { $regex: from, $options: 'i' };
    if (to) query.to = { $regex: to, $options: 'i' };
    if (type) query.type = type;

    if (date) {
        // If user searches a specific date, show that date only (must still be future)
        query.date = date;
    } else {
        // By default, only show vehicles departing AFTER today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        query.date = { $gt: today };
    }

    const vehicles = await Vehicle.find(query).sort({ date: 1 });
    res.json(vehicles);
});

// @desc    Get vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = asyncHandler(async (req, res) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (vehicle) {
        res.json(vehicle);
    } else {
        res.status(404);
        throw new Error('Vehicle not found');
    }
});

module.exports = {
    addVehicle,
    getVehicles,
    getVehicleById,
};
