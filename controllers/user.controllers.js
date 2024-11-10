const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

require("dotenv").config();

const pool = require("../db");

/** Регистрация пользователя */
const registration = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILURE', errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const candidate = await pool.query(
      "SELECT email FROM users WHERE email=$1",
      [email]
    );

    if (candidate.rows[0]) {
      return res.status(400).json({
        status: 'FAILURE',
        message: "Такой email уже зарегистрирован"
      });
    }

    const passwordHash = await bcrypt.hash(password, 7);

    const user = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, passwordHash]
    );

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Пользователь зарегистрирован",
      status: 'SUCCESS',
      data: {
        userId: user.rows[0].id,
        token
      }
    });
  } catch (err) {
    res.status(400).json({
      message: "Что-то пошло не так при регистрации пользователя",
      status: 'FAILURE',
      error: err.message
    });
  }
};

/** Авторизация пользователя */
const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'FAILURE', errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (!user.rows[0]) {
      return res.status(400).json({
        status: 'FAILURE',
        message: "Неверный логин или пароль"
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!isMatchPassword) {
      return res.status(403).json({ status: 'FAILURE', message: "Неверный логин или пароль" });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Вход выполнен успешно",
      status: 'SUCCESS',
      data: {
        userId: user.rows[0].id,
        token
      }
    });
  } catch (err) {
    res.status(400).json({
      message: "Что-то пошло не так при авторизации пользователя",
      status: 'FAILURE',
      error: err.message
    });
  }
};

module.exports = {
  registration,
  login
};
