
import express from "express";
import Kontaktandmed from "../models/kontaktandmed"; // Import the Kontaktandmed model

const router = express.Router();

// GET route to retrieve all Kontaktandmed documents
router.get("/kontaktandmed", async (req, res) => {
    try {
        const kontaktandmedList = await Kontaktandmed.find();
        res.json(kontaktandmedList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve a specific Kontaktandmed document by ID
router.get("/kontaktandmed/:id", async (req, res) => {
    try {
        const kontaktandmed = await Kontaktandmed.findById(req.params.id);
        if (!kontaktandmed) {
            return res.status(404).json({ error: "Kontaktandmed not found" });
        }
        res.json(kontaktandmed);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new Kontaktandmed document
router.post("/kontaktandmed", async (req, res) => {
    try {
        const newKontaktandmed = await Kontaktandmed.create(req.body);
        res.status(201).json(newKontaktandmed);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE route to delete a specific Kontaktandmed document by ID
router.delete("/kontaktandmed/:id", async (req, res) => {
    try {
        const deletedKontaktandmed = await Kontaktandmed.findByIdAndDelete(req.params.id);
        if (!deletedKontaktandmed) {
            return res.status(404).json({ error: "Kontaktandmed not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a specific Kontaktandmed document by ID
router.put("/kontaktandmed/:id", async (req, res) => {
    try {
        const updatedKontaktandmed = await Kontaktandmed.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedKontaktandmed) {
            return res.status(404).json({ error: "Kontaktandmed not found" });
        }
        res.json(updatedKontaktandmed);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
