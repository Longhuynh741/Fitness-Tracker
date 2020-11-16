const express = require("express");
const mongoose = require("mongoose");
const app = express();


const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));



mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Long-MongoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

//require our routes for our server to access
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  