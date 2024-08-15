// models/Referral.js
const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
    candidate_name: { type: String, required: true },
    email: { type: String, required: true },
    mobile_no: { type: String, required: true },
    job_id: { type: String, required: true },
    company: { type: String, required: true },
    domain: { type: String, required: true },
    resume: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Referral', ReferralSchema);
