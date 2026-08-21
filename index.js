const express = require("express");
const cors = require("cors");
const mongoose= require("mongoose");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

mongoose.connect('mongodb+srv://adhirajpratapsingh079_db_user:wHoGHcd4qfWeamBU@cluster0.vnrp8jl.mongodb.net/')
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

app.listen(2500, () => {
  console.log("connected to server");
});