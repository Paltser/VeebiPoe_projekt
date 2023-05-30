import express from "express";
import Arve from "../models/arve";
import mongoose from "mongoose";
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

// GET route to retrieve all unpaid invoices for all clients
router.get("/arve/maksmata", async (req, res) => {
    try {
        const unpaidInvoices = await Arve.find({ kogusumma: { $gt: 0 } });
        res.json(unpaidInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve all unpaid overdue invoices for all clients
router.get("/arve/maksmata/uletahtaeg", async (req, res) => {
    try {
        const currentDate = new Date();
        const overdueInvoices = await Arve.find({
            kogusumma: { $gt: 0 },
            kuupaev: { $lt: currentDate },
        });
        res.json(overdueInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve all unpaid invoices for a specific client
router.get("/arve/maksmata/klient/:id", async (req, res) => {
    try {
        const unpaidInvoices = await Arve.find({
            klient_fk: req.params.id,
            kogusumma: { $gt: 0 },
        });
        res.json(unpaidInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve all unpaid overdue invoices for a specific client
router.get("/arve/maksmata/uletahtaeg/klient/:id", async (req, res) => {
    try {
        const currentDate = new Date();
        const overdueInvoices = await Arve.find({
            klient_fk: req.params.id,
            kogusumma: { $gt: 0 },
            kuupaev: { $lt: currentDate },
        });
        res.json(overdueInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve all invoices for a specific client
router.get("/arve/klient/:id", async (req, res) => {
    try {
        const clientInvoices = await Arve.find({ klient_fk: req.params.id });
        res.json(clientInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to calculate the total sum of all invoices for a specific client
router.get("/arve/kogusumma/klient/:id", async (req, res) => {
    try {
        const totalInvoiceSum = await Arve.aggregate([
            {
                $match: { klient_fk: new mongoose.Types.ObjectId(req.params.id) },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$kogusumma" },
                },
            },
        ]);
        res.json(totalInvoiceSum);
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