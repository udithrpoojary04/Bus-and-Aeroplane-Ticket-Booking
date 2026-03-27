const express = require('express');
const router = express.Router();
const {
    addVehicle,
    getVehicles,
    getVehicleById,
} = require('../controllers/vehicleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getVehicles)
    .post(protect, admin, addVehicle); // Only admin can add

router.route('/:id').get(getVehicleById);

module.exports = router;
