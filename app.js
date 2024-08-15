require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');


// Import routes
const authRoutes = require('./routes/auth');
const referralRoutes = require('./routes/referral');
const candidateRoutes = require('./routes/candidate');

const app = express();

// Connect to MongoDB
// app.js
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set EJS as templating engine
app.set('view engine', 'ejs');


// Serve static files (CSS, images, etc.) from the root directory
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/Images', express.static(path.join(__dirname, 'Images')));
// Use routes
app.use('/', authRoutes);
app.use('/', referralRoutes);
app.use('/', candidateRoutes);

// Serve the homepage (index.html)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other HTML pages
app.get("/internship_tips1", (req, res) => {
    res.sendFile(path.join(__dirname, 'internship_tips1.html'));
});

app.get("/networking_tips", (req, res) => {
    res.sendFile(path.join(__dirname, 'networking_tips.html'));
});

app.get("/resume_tips1", (req, res) => {
    res.sendFile(path.join(__dirname, 'resume_tips1.html'));
});

app.get("/resume_tips2", (req, res) => {
    res.sendFile(path.join(__dirname, 'resume_tips2.html'));
});

// Authentication routes
app.use('/', authRoutes);

// Protected Route
app.get('/dashboard', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        res.render('dashboard');
    } catch (err) {
        res.clearCookie('token');
        res.redirect('/login');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
