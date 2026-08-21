require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// CORS
app.use(cors({
    origin: "https://expense-tracker-theta-jade-1atlbpmv1t.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGODB)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/expenses", expenseRoutes);

app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

app.get("/tasks", (req, res) => {
    res.json([]);
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});