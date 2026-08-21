require('dotenv').config()
const express = require("express");
const cors = require("cors");
const mongoose= require("mongoose");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

mongoose.connect(process.env.MONGODB)
  .then(() => console.log('connected'));

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

app.get("/tasks", (req, res) => {
  res.json([]);
});

app.listen(process.env.PORT, () => {
  console.log("connected to server");
});