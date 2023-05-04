import express from "express";
import { index, store, show, update, destroy, } from "../../controllers/workout.controller.js";

// Define API routes
const router = express.Router();

// Index
router.get("/index", index);
// Store
router.post("/store", store);
// Show
router.get("/show/:id", show);
// Update
router.patch("/update/:id", update);
// destroy
router.delete("/destroy/:id", destroy);

export default router;