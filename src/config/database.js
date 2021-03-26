const mongoose = require("mongoose");
// const URI       =   'mongodb://localhost/library';
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@arcluster.lq5zy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
