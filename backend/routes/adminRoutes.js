const express = require('express');
const router = express.Router();
const { authAdmin, registerAdmin } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerAdmin);
// Ideally registerAdmin should be protected or removed in prod.
// router.post('/', protect, admin, registerAdmin); 
router.post('/login', authAdmin);

module.exports = router;
