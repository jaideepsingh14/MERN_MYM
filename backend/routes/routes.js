const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const imageController = require("../controllers/imageController");

// Auth routes
router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.post("/auth", userController.authenticate);
router.post("/logout", userController.logout);

// Image routes
router.get("/", imageController.getTodayImage);

module.exports = router;
