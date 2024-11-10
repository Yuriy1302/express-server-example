const { Router } = require("express");

const registerValidation = require("../validations/auth");
const userControllers = require("../controllers/user.controllers");

const router = Router();

router.post("/register", registerValidation, userControllers.registration);
router.post("/login", registerValidation, userControllers.login);

module.exports = router;
