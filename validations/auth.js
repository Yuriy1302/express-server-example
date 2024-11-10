const { body } = require("express-validator");

const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть минимум 5 символов").isLength({ min: 5 })
];

module.exports = registerValidation;
