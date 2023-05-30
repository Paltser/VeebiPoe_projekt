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

router.post("/toode", async (req, res) => {
    try {
        const { vananemis_aeg, Hind } = req.body;

        // Kontroll vananemisaeg lisatakse minevikus
        if (vananemis_aeg < Date.now()) {
            return res.status(400).json({ error: "Vananemisaeg ei saa olla minevikus" });
        }

        // Kontroll hind on miinuses või 0
        if (Hind <= 0) {
            return res.status(400).json({ error: "Hind ei saa olla miinuses või 0" });
        }

        const newToode = await Toode.create(req.body);
        res.status(201).json(newToode);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve all expired products (expiration date in the past)
router.get("/toode/aegunud", async (req, res) => {
    try {
        const currentDate = new Date();
        const expiredProducts = await Toode.find({ vananemis_aeg: { $lt: currentDate } });
        res.json(expiredProducts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to calculate the total cost of all products
router.get("/toode/maksumus", async (req, res) => {
    try {
        const totalProductCost = await Toode.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$Hind" },
                },
            },
        ]);
        res.json(totalProductCost);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to calculate the total cost of all expired products
router.get("/toode/maksumus/aegunud", async (req, res) => {
    try {
        const currentDate = new Date();
        const totalExpiredProductCost = await Toode.aggregate([
            {
                $match: { vananemis_aeg: { $lt: currentDate } },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$Hind" },
                },
            },
        ]);
        res.json(totalExpiredProductCost);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve all inactive products
router.get("/toode/mitteaktiivne", async (req, res) => {
    try {
        const inactiveProducts = await Toode.find({ aktiivne: false });
        res.json(inactiveProducts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// GET route to retrieve all active products
router.get("/toode/aktiivne", async (req, res) => {
    try {
        const activeProducts = await Toode.find({ aktiivne: true });
        res.json(activeProducts);
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