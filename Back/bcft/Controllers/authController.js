const pool = require("../db/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const queries = require("../db/setup.js");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка существования пользователя
    const userExists = await pool.query(queries.checkUserExists, [
      username,
      email,
    ]);
    if (userExists.rows[0].exists) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 12);

    // Создание пользователя
    const newUser = await pool.query(queries.createUser, [
      username,
      email,
      hashedPassword,
    ]);

    // Генерация токена
    const token = generateToken(newUser.rows[0].id);

    res.status(201).json({
      user: newUser.rows[0],
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Поиск пользователя
    const user = await pool.query(queries.findUserByUsername, [username]);
    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Проверка пароля
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Генерация токена
    const token = generateToken(user.rows[0].id);

    // Удаление пароля из ответа
    const userData = { ...user.rows[0] };
    delete userData.password;

    res.status(200).json({
      user: userData,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await pool.query(queries.findUserById, [req.user.id]);
    res.status(200).json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
