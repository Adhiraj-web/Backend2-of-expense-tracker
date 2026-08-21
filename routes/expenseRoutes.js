const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getAnalytics,
  getStatistics
} = require("../Controllers/expenseControllers");

// Add Expense
router.post("/", addExpense);

// Analytics (ye /:id se PEHLE hona zaroori hai)
router.get("/analytics/summary", getAnalytics);

// Statistics (ye bhi /:id se PEHLE hona zaroori hai)
router.get("/stats/summary", getStatistics);

// Get All Expenses
router.get("/", getExpenses);

// Get One Expense
router.get("/:id", getExpenseById);

// Update Expense
router.put("/:id", updateExpense);

// Delete Expense
router.delete("/:id", deleteExpense);

module.exports = router;