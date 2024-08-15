// routes/referral.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Referral = require("../models/Referral");

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/resumes');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Render the "Get a Referral" form
router.get("/referral", (req, res) => {
    res.render("referral");
});

// Handle form submission for "Get a Referral"
router.post("/referral", upload.single('resume'), async (req, res) => {
    const { candidate_name, email, mobile_no, job_id, company, domain, other_company } = req.body;
    const resume = req.file.filename;
    if(company === "others"){
        company = other_company;
    }
    try {
        const newReferral = new Referral({
            candidate_name,
            email,
            mobile_no,
            job_id,
            company,
            domain,
            resume
        });

        await newReferral.save();
        res.send("Referral submitted successfully!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
