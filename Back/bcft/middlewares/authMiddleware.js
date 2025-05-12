const jwt = require("jsonwebtoken");
const pool = require("../db/db.js");

module.exports = async (req, res, next) => {
  try {
    // 1. Проверка наличия токена
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // 2. Проверка в черном списке (для logout)
    const isBlacklisted = await pool.query(
      "SELECT 1 FROM token_blacklist WHERE token = $1",
      [token]
    );
    
    if (isBlacklisted.rows.length > 0) {
      return res.status(401).json({ error: "Token revoked. Please log in again." });
    }

    // 3. Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Поиск пользователя
    const user = await pool.query(
      "SELECT id FROM users WHERE id = $1", 
      [decoded.id]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    // 5. Добавляем пользователя в запрос
    req.user = { id: decoded.id };
    next();
    
  } catch (err) {
    // Отдельная обработка истекшего токена
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    }
    res.status(401).json({ error: "Invalid token" });
  }
};