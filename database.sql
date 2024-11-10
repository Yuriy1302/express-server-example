
-- Создать базу данных
CREATE DATABASE todoapp;

-- Удалить базу данных
DROP DATABASE todoapp;

-- Создать таблицу пользователей
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

-- Создать таблицу задач
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Удалить таблицу пользователей
DROP TABLE users;

-- Удалить таблицу задач
DROP TABLE todos;

-- Добавить пользователя и вернуть все поля
INSERT INTO users (email, password) values ('test_email@email.domen', 'hash_password') RETURNING *;

-- Добавить задачу и вернуть все поля
INSERT INTO todos (title, completed, user_id) values ('Title 1', false, 1) RETURNING *;

-- Выбрать список задач по id пользователя
SELECT * FROM todos WHERE user_id=1;

-- Обновить задачу
UPDATE todos SET title = 'New Title of Task' where id = 1;

-- Удалить задачу
DELETE FROM todos WHERE id=1;
