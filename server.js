const mongoose = require("mongoose");
require("dotenv").config();
const connectToDb = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");

connectToDb();

const express = require("express");
const app = express();

const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3535;

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", require("./routes/routes"));

// establish database connection before starting the server
mongoose.connection.once("open", () => {
  console.log("Connected to the database");
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
