import express from "express";
import Klient from "../models/klient"; // Import the Klient model

const router = express.Router();

// GET route to retrieve all Klient documents
router.get("/klient", async (req, res) => {
    try {
        const klientList = await Klient.find();
        res.json(klientList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve a specific Klient document by ID
router.get("/klient/:id", async (req, res) => {
    try {
        const klient = await Klient.findById(req.params.id);
        if (!klient) {
            return res.status(404).json({ error: "Klient not found" });
        }
        res.json(klient);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new Klient document
router.post("/klient", async (req, res) => {
    try {
        const newKlient = await Klient.create(req.body);
        res.status(201).json(newKlient);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE route to delete a specific Klient document by ID
router.delete("/klient/:id", async (req, res) => {
    try {
        const deletedKlient = await Klient.findByIdAndDelete(req.params.id);
        if (!deletedKlient) {
            return res.status(404).json({ error: "Klient not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a specific Klient document by ID
router.put("/klient/:id", async (req, res) => {
    try {
        const updatedKlient = await Klient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedKlient) {
            return res.status(404).json({ error: "Klient not found" });
        }
        res.json(updatedKlient);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;