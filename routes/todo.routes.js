const { Router } = require("express");

const todoControllers = require("../controllers/todo.controllers");
const checkAuth = require("../middlewares/auth.middleware");

const router =  Router();

router.get("/", checkAuth, todoControllers.getTodos);
router.post("/", checkAuth, todoControllers.createTodo);
router.put("/:id", checkAuth, todoControllers.updateTodo);
router.delete("/:id", checkAuth, todoControllers.deleteTodo);

module.exports = router;
