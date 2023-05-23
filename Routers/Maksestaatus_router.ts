import express from "express";
import Maksestaatus from "../models/maksestaatus"; // Import the Maksestaatus model

const router = express.Router();

// GET route to retrieve all Maksestaatus documents
router.get("/maksestaatus", async (req, res) => {
    try {
        const maksestaatusList = await Maksestaatus.find();
        res.json(maksestaatusList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve a specific Maksestaatus document by ID
router.get("/maksestaatus/:id", async (req, res) => {
    try {
        const maksestaatus = await Maksestaatus.findById(req.params.id);
        if (!maksestaatus) {
            return res.status(404).json({ error: "Maksestaatus not found" });
        }
        res.json(maksestaatus);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new Maksestaatus document
router.post("/maksestaatus", async (req, res) => {
    try {
        const newMaksestaatus = await Maksestaatus.create(req.body);
        res.status(201).json(newMaksestaatus);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE route to delete a specific Maksestaatus document by ID
router.delete("/maksestaatus/:id", async (req, res) => {
    try {
        const deletedMaksestaatus = await Maksestaatus.findByIdAndDelete(req.params.id);
        if (!deletedMaksestaatus) {
            return res.status(404).json({ error: "Maksestaatus not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a specific Maksestaatus document by ID
router.put("/maksestaatus/:id", async (req, res) => {
    try {
        const updatedMaksestaatus = await Maksestaatus.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedMaksestaatus) {
            return res.status(404).json({ error: "Maksestaatus not found" });
        }
        res.json(updatedMaksestaatus);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;