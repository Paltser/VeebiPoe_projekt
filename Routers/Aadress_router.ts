import express from "express";
import Aadress from "../models/aadress"; // Import the Aadress model

const router = express.Router();

// GET route to retrieve all Aadress documents
router.get("/aadress", async (req, res) => {
    try {
        const aadressList = await Aadress.find();
        res.json(aadressList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve a specific Aadress document by ID
router.get("/aadress/:id", async (req, res) => {
    try {
        const aadress = await Aadress.findById(req.params.id);
        if (!aadress) {
            return res.status(404).json({ error: "Aadress not found" });
        }
        res.json(aadress);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST route to create a new Aadress document
router.post("/aadress", async (req, res) => {
    try {
        const newAadress = await Aadress.create(req.body);
        res.status(201).json(newAadress);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE route to delete a specific Aadress document by ID
router.delete("/aadress/:id", async (req, res) => {
    try {
        const deletedAadress = await Aadress.findByIdAndDelete(req.params.id);
        if (!deletedAadress) {
            return res.status(404).json({ error: "Aadress not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT route to update a specific Aadress document by ID
router.put("/aadress/:id", async (req, res) => {
    try {
        const updatedAadress = await Aadress.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedAadress) {
            return res.status(404).json({ error: "Aadress not found" });
        }
        res.json(updatedAadress);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;