const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Import 'node-fetch' for making HTTP requests

const ml= express.Router();
const userSchema = require('../model/userSchema');




// Middleware for parsing JSON data


// Route to handle prediction request
ml.post('/predict', async (req, res) => {
    try {
        const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall } = req.body;

        // Prepare the request data
        const requestData = {
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            ph,
            rainfall
        };

        // Send a POST request to the Flask server using 'fetch'
        const flaskResponse = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        // Parse the response from Flask server
        const flaskData = await flaskResponse.json();

        // Send the Flask server response back to the React frontend
        res.json(flaskData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = ml ;