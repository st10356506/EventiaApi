// server.js (backend folder)
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // built-in JSON parser, no need for body-parser

// In-memory store for events
let events = [];

// Test root route
app.get('/', (req, res) => {
    res.send('Eventia API backend is running!');
});

// GET all events
app.get('/events', (req, res) => {
    res.json(events);
});

// POST create a new event
app.post('/events', (req, res) => {
    console.log('Received body:', req.body); // debug log

    const { title, type, startDate, endDate } = req.body;

    // Validate input
    if (!title || !type || !startDate || !endDate) {
        return res.status(400).json({
            message: "Missing required fields",
            received: req.body
        });
    }

    const newEvent = { title, type, startDate, endDate };
    events.push(newEvent);

    res.status(201).json({
        message: "Event created successfully",
        event: newEvent
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
