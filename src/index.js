const app = require("./app");
//Starting server
app.listen(app.get("PORT"), () => {
  console.log("server listening on port: " + app.get("PORT"));
});
