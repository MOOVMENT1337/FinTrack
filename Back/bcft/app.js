require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db/db.js");
const authRoutes = require("./Routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Создание таблицы при запуске
pool
  .query(require("./db/setup.js").createTable)
  .then(() => console.log("Users table ready"))
  .catch((err) => console.error("Table creation error:", err));

// Роуты
app.use("/api/auth", authRoutes); // http://localhost:5001/api/auth/register

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.get('/', (req, res) => {
  res.send('nike pro')
})

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
