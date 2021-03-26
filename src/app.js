const express = require("express");
const app = express();
const morgan = require("morgan");
require("./config/env/config");
const { mongoose } = require("./config/database");

const bookRouter = require("./routes/book_routes");
const docsRoutes = require('./routes/swagger');

//  Settings
app.set("PORT", process.env.PORT);
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/docs", docsRoutes);
app.use("/api/book", bookRouter);

app.get("*", (req, res) => {
  res.status(404).send({ error: "Route not found" });
});

module.exports = app;
