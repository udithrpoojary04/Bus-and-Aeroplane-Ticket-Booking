const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            email: admin.email,
            token: generateToken(admin._id, 'admin'),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new admin
// @route   POST /api/admin
// @access  Public (Should be private or seeded)
const registerAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists');
    }

    const admin = await Admin.create({
        email,
        password,
    });

    if (admin) {
        res.status(201).json({
            _id: admin._id,
            email: admin.email,
            token: generateToken(admin._id, 'admin'),
        });
    } else {
        res.status(400);
        throw new Error('Invalid admin data');
    }
});

module.exports = {
    authAdmin,
    registerAdmin,
};
