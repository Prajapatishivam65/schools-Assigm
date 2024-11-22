const express = require('express');
const router = express.Router();
const db = require('../db');

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Early validation - return -1 for invalid inputs instead of null
    if (!lat1 || !lon1 || !lat2 || !lon2 ||
        isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2) ||
        lat1 < -90 || lat1 > 90 || lat2 < -90 || lat2 > 90 ||
        lon1 < -180 || lon1 > 180 || lon2 < -180 || lon2 > 180) {
        return -1;
    }

    try {
        const toRadians = angle => angle * (Math.PI / 180);

        const R = 6371;
        const lat1Rad = toRadians(lat1);
        const lon1Rad = toRadians(lon1);
        const lat2Rad = toRadians(lat2);
        const lon2Rad = toRadians(lon2);

        // Calculate differences
        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        // If distance calculation results in NaN or Infinity, return -1
        if (isNaN(distance) || !isFinite(distance)) {
            return -1;
        }
        return Math.round(distance * 100) / 100;
    } catch (error) {
        return -1;
    }
}
router.get('/', (req, res) => {
    const { latitude, longitude } = req.query;

    if (typeof parseFloat(latitude) !== 'number' || typeof parseFloat(longitude) !== 'number') {
        return res.status(400).json({ error: "Invalid coordinates" });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const query = "SELECT * FROM schools";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch schools" });
        }

        const sortedSchools = results.map(school => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
        })).sort((a, b) => (a.distance - b.distance));

        res.status(200).json(sortedSchools);
    });
});

module.exports = router;
