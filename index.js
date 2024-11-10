const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/user.routes"));
app.use("/api/todos", require("./routes/todo.routes"));

const PORT = process.env.PORT || 5000;

function start() {
  try {
    app.listen(PORT, () => {
      console.log("Server has been started on PORT " + PORT);
    });
  } catch (err) {
    console.log("Server didn\'t start! ", err);
    process.exit(1);
  }
}

start();
