const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

// Submit a travel request
router.post('/', requestController.submitRequest);

// Get latest request for a user (used in frontend)
// Frontend sends email as query param: /api/requests/latest?email=user@example.com
router.get('/latest', requestController.getLatestRequest);

// Check match status (POST) — expects JSON body with email, toLocation, date
router.post('/match-status', requestController.checkMatchStatus);

module.exports = router;
