import express from "express";
import Toode from "../models/Toode"; // Import the Toode model

const router = express.Router();

// GET route to retrieve all Toode documents
router.get("/toode", async (req, res) => {
    try {
        const toodeList = await Toode.find();
        res.json(toodeList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve a specific Toode document by ID
router.get("/toode/:id", async (req, res) => {
    try {
        const toode = await Toode.findById(req.params.id);
        if (!toode) {
            return res.status(404).json({ error: "Toode not found" });
        }
        res.json(toode);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new Toode document
router.post("/toode", async (req, res) => {
    try {
        const newToode = await Toode.create(req.body);
        res.status(201).json(newToode);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE route to delete a specific Toode document by ID
router.delete("/toode/:id", async (req, res) => {
    try {
        const deletedToode = await Toode.findByIdAndDelete(req.params.id);
        if (!deletedToode) {
            return res.status(404).json({ error: "Toode not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a specific Toode document by ID
router.put("/toode/:id", async (req, res) => {
    try {
        const updatedToode = await Toode.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedToode) {
            return res.status(404).json({ error: "Toode not found" });
        }
        res.json(updatedToode);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;