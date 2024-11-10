
const db = require("../db");

/** Получить все задачи пользователя */
const getTodos = async (req, res) => {
  const { userId } = req;

  try {
    const todos = await db.query(
      "SELECT * FROM todos WHERE user_id=$1",
      [userId]
    );

    if (todos.rows.length === 0) {
      return res.json({
        status: "SUCCESS",
        todos: [],
        message: "У вас нет запланированных задач"
      });
    }

    const modifyTodos = todos.rows.map((item) => ({
      id: item.id,
      title: item.title,
      completed: item.completed
    }));

    res.json({
      status: "SUCCESS",
      todos: modifyTodos
    });
  } catch (err) {
    res.status(400).json({
      status: 'FAILURE',
      message: "Что-то пошло не так при получении списка задач."
    });
  }
};

/** Создать задачу */
const createTodo = async (req, res) => {
  const { userId } = req;
  const { title } = req.body;

  try {
    const newTodo = await db.query(
      "INSERT INTO todos (title, completed, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, false, userId]
    );

    res.json({
      status: "SUCCESS",
      todo: newTodo.rows[0],
      message: "Задача создана"
    });
  } catch (err) {
    res.status(400).json({
      status: 'FAILURE',
      message: "Что-то пошло не так при создании задач."
    });
  }
};

/** Обновить задачу */
const updateTodo = async (req, res) => {
  const { id, title, completed } = req.body;

  try {
    const result = await db.query(
      "UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING id, title, completed",
      [title, completed, id]
    );

    res.json({
      status: "SUCCESS",
      todo: result.rows[0]
    });
  } catch (err) {
    res.status(400).json({
      status: 'FAILURE',
      message: "Что-то пошло не так при обновлении задачи."
    });
  }
};

/** Удалить задачу */
const deleteTodo = async (req, res) => {
  const { userId } = req;
  const { id } = req.params;

  try {
    await db.query(
      "DELETE FROM todos WHERE id=$1 AND user_id=$2",
      [id, userId]
    );

    res.json({
      status: "SUCCESS",
      message: "Задача удалена"
    });
  } catch (err) {    
    res.status(400).json({
      status: 'FAILURE',
      message: "Что-то пошло не так при удалении задачи."
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
};
