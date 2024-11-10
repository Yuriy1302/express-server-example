### Версия 1.0

# Образец простого сервера на основе ExpressJS

Применяю при необходимости разработки Front-end приложения, взаимодействующего с сервером, как основу будущего сервера.

Не самый удобный вариант, так как требуется база данных.

В примере используется PostgreSQL и библиотека pg (node-postgres).

## В образце есть примеры обработки запросов:
- на регистрацию пользователя
- на авторизацию пользователя
- на получение всех записей по id пользователя (например, задач)
- на создание записи
- на обновление записи
- на удаление записи

### Необходимы переменные окружения
PORT=...<br>
DB_USER=...<br>
DB_HOST=...<br>
DB_NAME=...<br>
DB_PASSWORD=...<br>
DB_PORT=...<br>
JWT_SECRET=secret

<hr>
<b>P.S.</b>: Не является готовым сервером. Требует доработки.
