const express = require("express");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes.js");
const database = require("./db");
const app = express();

app.use(express.static(path.join(__dirname, "./../public")));
app.use(express.json());
app.use(routes);
app.use(morgan("dev"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}...`);
});
