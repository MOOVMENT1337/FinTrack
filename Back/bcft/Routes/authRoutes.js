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

router.use(authMiddleware);

router.get('/me', authController.getMe);
router.patch('/change-password', authController.changePassword);

router.use(authMiddleware);

router.get('/me', authController.getMe);
router.patch('/change-username', authController.changeUsername);
router.patch('/change-password', authController.changePassword);
router.delete('/delete-account', authController.deleteAccount); // Новый роут


module.exports = router;
