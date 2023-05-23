import express from "express";
import Arve from "../models/arve";
const router = express.Router();

// GET route to retrieve all arve documents
router.get("/arve", async (req, res) => {
    try {
        const arveList = await Arve.find();
        res.json(arveList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve a specific arve document by ID
router.get("/arve/:id", async (req, res) => {
    try {
        const arve = await Arve.findById(req.params.id);
        if (!arve) {
            return res.status(404).json({ error: "Arve not found" });
        }
        res.json(arve);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new arve document
router.post("/arve", async (req, res) => {
    try {
        const newArve = await Arve.create(req.body);
        res.status(201).json(newArve);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE route to delete a specific arve document by ID
router.delete("/arve/:id", async (req, res) => {
    try {
        const deletedArve = await Arve.findByIdAndDelete(req.params.id);
        if (!deletedArve) {
            return res.status(404).json({ error: "Arve not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a specific arve document by ID
router.put("/arve/:id", async (req, res) => {
    try {
        const updatedArve = await Arve.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedArve) {
            return res.status(404).json({ error: "Arve not found" });
        }
        res.json(updatedArve);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;