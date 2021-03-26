const express = require("express");
const app = express();
require("./config/env/config");

const bookRouter = require("./routes/book_routes");
const docsRoutes = require('./routes/swagger');

//  Settings
app.set("PORT", process.env.PORT);
app.use(express.json());

app.use("/api/docs", docsRoutes);
app.use("/api/book", bookRouter);

app.get("*", (req, res) => {
  res.status(404).send({ error: "Route not found" });
});

app.listen(app.get("PORT"), () => {
  console.log("server listening on port: " + app.get("PORT"));
});
