const jwt = require("jsonwebtoken");
const pool = require("../db/db.js");

module.exports = async (req, res, next) => {
  try {
    // Проверка наличия токена
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Поиск пользователя
    const user = await pool.query("SELECT id FROM users WHERE id = $1", [
      decoded.id,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
