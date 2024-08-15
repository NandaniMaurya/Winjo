// models/Candidate.js
const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    employee_name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    work_experience: { type: String, required: true },
    Experience_level: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
