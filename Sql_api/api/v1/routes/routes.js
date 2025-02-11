const express = require("express");

const { getAllRoutes, getSingleRoute, createRoute, updateRoute, deleteRoute } = require("../controllers/routeController");

const router = express.Router();

// Define routes
router.get("/", getAllRoutes);
router.get("/:name", getSingleRoute);
router.post("/", createRoute);
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);

module.exports = router;