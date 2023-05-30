import express from "express";
import Arverida from "../models/arverida"; // Import the Arverida model

const router = express.Router();

// GET route to retrieve all Arverida documents
router.get("/arverida", async (req, res) => {
    try {
        const arveridaList = await Arverida.find();
        res.json(arveridaList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve a specific Arverida document by ID
router.get("/arverida/:id", async (req, res) => {
    try {
        const arverida = await Arverida.findById(req.params.id);
        if (!arverida) {
            return res.status(404).json({ error: "Arverida not found" });
        }
        res.json(arverida);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new Arverida document
router.post("/arverida", async (req, res) => {
    try {
        const newArverida = await Arverida.create(req.body);
        res.status(201).json(newArverida);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE route to delete a specific Arverida document by ID
router.delete("/arverida/:id", async (req, res) => {
    try {
        const deletedArverida = await Arverida.findByIdAndDelete(req.params.id);
        if (!deletedArverida) {
            return res.status(404).json({ error: "Arverida not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a specific Arverida document by ID
router.put("/arverida/:id", async (req, res) => {
    try {
        const updatedArverida = await Arverida.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedArverida) {
            return res.status(404).json({ error: "Arverida not found" });
        }
        res.json(updatedArverida);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
