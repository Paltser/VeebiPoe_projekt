
import express from "express";
import Kategooria from "../models/Kategooria"; // Import the Kategooria model

const router = express.Router();

// GET route to retrieve all Kategooria documents
router.get("/kategooria", async (req, res) => {
    try {
        const kategooriaList = await Kategooria.find();
        res.json(kategooriaList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve a specific Kategooria document by ID
router.get("/kategooria/:id", async (req, res) => {
    try {
        const kategooria = await Kategooria.findById(req.params.id);
        if (!kategooria) {
            return res.status(404).json({ error: "Kategooria not found" });
        }
        res.json(kategooria);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new Kategooria document
router.post("/kategooria", async (req, res) => {
    try {
        const newKategooria = await Kategooria.create(req.body);
        res.status(201).json(newKategooria);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE route to delete a specific Kategooria document by ID
router.delete("/kategooria/:id", async (req, res) => {
    try {
        const deletedKategooria = await Kategooria.findByIdAndDelete(req.params.id);
        if (!deletedKategooria) {
            return res.status(404).json({ error: "Kategooria not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a specific Kategooria document by ID
router.put("/kategooria/:id", async (req, res) => {
    try {
        const updatedKategooria = await Kategooria.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedKategooria) {
            return res.status(404).json({ error: "Kategooria not found" });
        }
        res.json(updatedKategooria);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
