// routes/candidate.js
const express = require("express");
const router = express.Router();
const Candidate = require("../models/Candidate");

// Render the "Refer a Candidate" form
router.get("/refer", (req, res) => {
    res.render("refer");
});

// Handle form submission for "Refer a Candidate"
router.post("/refer", async (req, res) => {
    const { employee_name, email, company, work_experience, Experience_level } = req.body;

    try {
        const newCandidate = new Candidate({
            employee_name,
            email,
            company,
            work_experience,
            Experience_level,
        });

        await newCandidate.save();
        res.send("Candidate referred successfully!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
