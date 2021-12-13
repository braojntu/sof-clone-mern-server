const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

//Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// cors middleware
app.use(cors());

// import routes
const Routes = require("./routes/Routes");

// import and connect to db
const db = require("./config/config");
mongoose
  .connect(db.mongodbURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log("Unknown Server Error - " + err));

// Routes
app.use("/api", Routes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
