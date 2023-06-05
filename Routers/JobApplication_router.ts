import express from "express";
import JobApplication from "../models/JobApplication";

const router = express.Router();

// GET route to retrieve all job applications
router.get("/admin1", async (req, res) => {
    try {
        const jobApplications = await JobApplication.find();
        res.json(jobApplications);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve a specific job application by ID
router.get("/admin1/:id", async (req, res) => {
    try {
        const jobApplication = await JobApplication.findById(req.params.id);
        if (!jobApplication) {
            return res.status(404).json({ error: "Job application not found" });
        }
        res.json(jobApplication);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new job application
router.post("/admin1", async (req, res) => {
    try {
        const newJobApplication = await JobApplication.create(req.body);
        res.status(201).json(newJobApplication);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE route to delete a specific job application by ID
router.delete("/admin1/:id", async (req, res) => {
    try {
        const deletedJobApplication = await JobApplication.findByIdAndDelete(req.params.id);
        if (!deletedJobApplication) {
            return res.status(404).json({ error: "Job application not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a specific job application by ID
router.put("/admin1/:id", async (req, res) => {
    try {
        const updatedJobApplication = await JobApplication.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedJobApplication) {
            return res.status(404).json({ error: "Job application not found" });
        }
        res.json(updatedJobApplication);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
