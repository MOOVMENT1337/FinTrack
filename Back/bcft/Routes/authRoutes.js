const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Регистрация
router.post("/register", authController.register);

// Логин
router.post("/login", authController.login);

// Получение данных пользователя (защищенный роут)
router.get("/me", authMiddleware, authController.getMe);

module.exports = router;
