const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // ✅ fixed env name
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,   // ✅ fixed typo
                lng: location.lng
            };
        } else {
            console.error("Google Maps Geocode Error:", response.data);
            throw new Error(response.data.error_message || 'Unable to fetch coordinates');
        }
    } catch (error) {
        console.error("Google Maps Geocode Exception:", error.response?.data || error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[0].elements[0];
        } else {
            console.error("Google Maps Distance Error:", response.data);
            throw new Error(response.data.error_message || 'Unable to fetch distance and time');
        }
    } catch (err) {
        console.error("Google Maps Distance Exception:", err.response?.data || err.message);
        throw err;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions
                .map(prediction => prediction.description)
                .filter(value => value);
        } else {
            console.error("Google Maps Autocomplete Error:", response.data);
            throw new Error(response.data.error_message || 'Unable to fetch suggestions');
        }
    } catch (err) {
        console.error("Google Maps Autocomplete Exception:", err.response?.data || err.message);
        throw err;
    }
};

module.exports.getCaptainsInTheRadius = async (lat, lng, radius) => {
    // radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lat, lng], radius / 6371]
            }
        }
    });

    return captains;
};
